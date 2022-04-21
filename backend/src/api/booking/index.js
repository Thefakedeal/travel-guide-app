const router = require('express').Router();
const db = require("../../client");
const axios = require('axios').default
const {userAuth} = require('../../middlewares')

router.post("/",userAuth, async(req,res,next)=>{
    try{
        const {token, bookingPlanId, date, cityId} = req.body;
        const bookingPlan = await db.bookingPlan.findFirst({
            where: {
                id: bookingPlanId
            }
        })
        const data = {
            token: token,
            amount: bookingPlan.price * 100
        }

        const config = {
            headers: {'Authorization': `Key ${process.env.KHALTI_KEY}`}
        };
        const response = await axios.post("https://khalti.com/api/v2/payment/verify/",
            data,
            config
        )
        if(response.status>=200 && response.status<300){
            const booking = await db.booking.create({
                data:{
                    cityId: Number(cityId),
                    bookingPlanId: bookingPlanId,
                    date: new Date(date),
                    userId: req.user.id,
                    khalti_token: response.data.idx, 
                    mobile: response.data.user.mobile
                }
            })
            return res.json({message: "Booking Was Successful"})
        }
        res.status(response.status)
        res.json({message: response.data.token})
    }catch(err){
        next(err)
    }
})


module.exports = router