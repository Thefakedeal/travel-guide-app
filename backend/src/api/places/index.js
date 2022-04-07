const router  = require('express').Router();
const {body, check,validationResult} = require('express-validator')
const db = require('../../client')
const upload = require('../../utils/multer')
const nameRequired = body('name').notEmpty().trim();

const cityRequired = body('cityId').notEmpty().custom(async (value) =>{
    if(!value)  return Promise.reject("City Doesn't exist");
    const city = await db.city.findUnique({
        where: {
          id: value,
        },
      });
      if (!city) {
        return Promise.reject("City Doesn't exist");
      }
      return true;
})

const experiencesExists = body('experiences').isArray().custom(async (value)=>{
    if(!Array.isArray(value))  return Promise.reject("Experience Doesn't exist");
    
      for (const item of value) {
        const experience = await db.experience.findUnique({
            where: {
              id: item,
            },
          });
          if (!experience) {
            return Promise.reject("Experience Doesn't exist");
          }
      }
         
      return true;
})

const featured = body('featured').isBoolean().optional({nullable: true})

router.get('/', async (req,res,next)=>{
    try{
        const experienceFilter={};
        if(req.query.experienceId != null && req.query.experienceId != null){
            experienceFilter.some = {
                id: (req.query.experienceId != null && req.query.experienceId != null) ? Number(req.query.experienceId): undefined
            }
        }
        const places = await db.place.findMany({
            where: {
                cityId: req.query.cityId != null ?Number(req.query.cityId):undefined,
                experience:experienceFilter
            },
            include:{
                experience: true
            } 
        })
        return res.json({"data": places})
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const place = await db.place.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if(!place) {
            res.status(404)
            next(new Error("Place not found"))
        }
        return res.json({data: place})
    }catch(err){
        next(err)
    }
})


router.post('/',nameRequired , cityRequired,featured, async (req,res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: errors.array() });
    }

    try{
        const place = await db.place.create({
            data:{
                name: req.body.name,
                cityId: req.body.cityId,
                featured: req.body.featured,
            }
        })

        return res.json({data: place, message: "Place Created"})

    }catch(err){
        next(err)
    }
})


router.put('/:id',nameRequired,cityRequired, featured,async (req,res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: errors.array() });
    }

    try{
        const place = await db.place.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                name: req.body.name,
                cityId: req.body.cityId,
                featured: req.body.featured,
            }
        })

        return res.json({data: place, message: "Place Updated"})

    }catch(err){
        next(err)
    }
})


router.delete('/:id', async (req,res, next)=>{
    try{
        const place = await db.place.delete({
            where:{
                id: Number(req.params.id)
            },
        })

        return res.json({data: place, message: "Place deleted"})

    }catch(err){
        next(err)
    }
})

router.post('/:id/experiences', experiencesExists, async(req, res, next)=>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ message: "Validation Error", errors: errors.array() });
        }
        
        const { experiences } = req.body;

        const experiencesObj = experiences.map(experience=>{
            return {
                id: Number(experience)
            }
        })
       
        const place = await db.place.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                experience:{
                    connect: experiencesObj
                }
            },
            include:{
                experience: true
            }
        })

        res.json({message: "Experiences connected", data: place})
    }catch(err){
        next(err)
    }
})

router.delete('/:id/experiences', experiencesExists,async(req, res, next)=>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ message: "Validation Error", errors: errors.array() });
        }

        const { experiences } = req.body;

        const experiencesObj = experiences.map(experience=>{
            return {
                id: Number(experience)
            }
        })

        const place = await db.place.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                experience:{
                    disconnect: experiencesObj
                }
            },
            include:{
                experience: true
            }
        })

        res.json({message: "Experiences removed", data: place})
    }catch(err){
        next(err)
    }
})

const photoUpload = upload.array("images", 10);

const filesRequired = check("images")
  .custom((value, { req }) => {
    if (req.files.length > 0) return true;
    return false;
  })
  .withMessage("Images are required");

router.post('/:id/images',photoUpload, filesRequired, async(req,res, next)=>{
    try{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ message: "Validation Error", errors: errors.array() });
        }

        const uploadedImages = req.files;

        const place = await db.place.update({
            where:{
                id:  Number(req.params.id)
            },
            data:{
                Image: {
                    create: uploadedImages.map(img=>{
                        return {
                            src: `/images/${img.filename}`,
                        }
                    })
                }
            }, 
            include:{
                Image: true
            }
        })

        return res.json({message:"Photos Uploaded", data: place})
    }catch(err){
        next(err)
    }
})


module.exports = router;