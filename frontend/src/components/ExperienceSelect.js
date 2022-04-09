import React, { useEffect, useState } from 'react'
import { doGet } from '../utils/request';
import { Select } from 'antd'
export default function ExperienceSelect({handleChange}) {
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
      <Select defaultValue={null} onChange={handleChange} placeholder="Select Experience" style={{ width:"100%" }}> 
          <Select.Option value={null} >Select Experience</Select.Option>
          {
            experiences.map(experience=>(
                <Select.Option value={experience.id} key={Math.random()}> {experience.type} </Select.Option>
            ))
        }
      </Select>
  )
}
