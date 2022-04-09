import { Button, Input } from "antd";
import CitySelect from "./CitySelect";
import ExperienceSelect from "./ExperienceSelect";


export default function PlaceSearch() {
  return (
    <div className={`container  p-4 card shadow rounded`}>
    <div className="row g-4">
      {/* City Select */}
      <div className="col-md-3">
        <CitySelect handleChange={()=>{}}/>
      </div>

      {/* Experience Select */}
      <div className="col-md-3">
       <ExperienceSelect handleChange={()=>{}}/>
      </div>

      <div className="col-md-4">
        <Input placeholder="Destination"/>
    </div>
     
      <div className="col-md-2">
         <Button type="primary"  className="w-100">Search</Button>
      </div>



    </div>


  </div>
  )
}
