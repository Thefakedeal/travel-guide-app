import src from '../img/no-img.jpg'
export default function PlaceCard({
    name,experience=[], featured=false, image=[], className,...props
}) {

  const img = image.length===0?src:image[0].src;

  return (
    <div className={`${className} card h-100`} {...props} >
        <img className="card-img-top" src={img} alt="Image"/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {
                experience.map(exp=>(
                    <span className="badge badge-primary bg-primary mx-1" key={Math.random()}>{exp.type}</span>
                ))
            }
        </div>
    </div>
  )
}
