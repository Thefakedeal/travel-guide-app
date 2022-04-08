import React, { useEffect, useState } from 'react'
import { doGet } from '../utils/request';

export default function ExperienceSelect({onChange}) {
   const [experiences, setExperiences]=  useState([]);

 

   useEffect(()=>{
    const fetchExperiences = async ()=>{
        try{
            const response = await doGet({path:'experiences'});
            const data = await response.json();
            
            setExperiences(data.data)
            
        }catch(err){
            setExperiences([])
        }
    }
        fetchExperiences()
   },[])

  return (
    <select onChange={onChange} defaultValue={null} className="form-select" aria-label="Select Experience">
        <option value={null} >Select Experience</option>
        {
            experiences.map(experience=>(
                <option value={experience.id} key={Math.random()}> {experience.type} </option>
            ))
        }
    </select>
  )
}
