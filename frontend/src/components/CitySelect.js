import React, { useEffect, useState } from 'react'
import { doGet } from '../utils/request';

export default function CitySelect({onChange}) {
   const [cities, setCities]=  useState([]);

 

   useEffect(()=>{
    const fetchCities = async ()=>{
        try{
            const response = await doGet({path:'cities'});
            const data = await response.json();
            
            setCities(data.data)
            
        }catch(err){
            setCities([])
        }
    }
        fetchCities()
   },[])

  return (
    <select onChange={onChange} defaultValue={null} className="form-select" aria-label="Select City">
        <option value={null} >Select City</option>
        {
            cities.map(city=>(
                <option value={city.id} key={Math.random()}> {city.name} </option>
            ))
        }
    </select>
  )
}
