import { Button, Input } from "antd";
import { useState } from "react";
import CitySelect from "./CitySelect";
import ExperienceSelect from "./ExperienceSelect";
import {useNavigate, useSearchParams} from 'react-router-dom'

export default function PlaceSearch({className}) {
  const [search,setSearch] = useSearchParams()
 
  const [city, setCity] = useState(search.get('city')||null) 
  const [experience, setExperience] = useState(search.get('experience')||null) 
  const [destination, setDestination] = useState(search.get('destination')||'') 

  const navigate = useNavigate()

  const handleClick = ()=>{
    const query = {
      city,
      experience,
      destination
    }
    Object.keys(query).forEach(key => {
      if (query[key] === null || query[key] === '') {
        delete query[key];
      }
    });
    
    const searchParams = new URLSearchParams(query).toString()
    navigate(`/places?${searchParams}`)
  }

  return (
    <div className={`container  ${className} p-4 card shadow rounded`}>
    <div className="row g-4">
      <div className="col-md-3">
        <CitySelect value={city} handleChange={(value)=>{
          setCity(value)
        }}/>
      </div>

  
      <div className="col-md-3">
       <ExperienceSelect value={experience} handleChange={(value)=>{
         setExperience(value)
       }}/>
      </div>

      <div className="col-md-4">
        <Input placeholder="Destination" value={destination}  onChange={e=> setDestination(e.target.value)}/>
    </div>
     
      <div className="col-md-2">
         <Button type="primary" onClick={handleClick} className="w-100">Search</Button>
      </div>

    </div>


  </div>
  )
}
