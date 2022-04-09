import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { doGet } from '../utils/request';

export default function CitySelect({handleChange}) {
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
    <Select defaultValue={null} onChange={handleChange} placeholder="Select City" style={{ width:"100%" }}> 
        <Select.Option value={null} >Select City</Select.Option>
        {
        cities.map(cities=>(
            <Select.Option value={cities.id} key={Math.random()}> {cities.name} </Select.Option>
        ))
    }
    </Select>
  )
}
