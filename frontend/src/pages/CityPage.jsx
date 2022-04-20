import { Button, Skeleton } from 'antd'
import React from 'react'
import {useParams} from 'react-router-dom'
import PlaceCard from '../components/PlaceCard'
import useFetch from '../hooks/useFetch'

export default function CityPage() {
  const {id} = useParams()
  const {data: cityData,loading: cityLoading, error:cityError} = useFetch(`cities/${id}`)
  const {data: placesData,loading: placesLoading, error:placesError} = useFetch(`places`,{featured:true,cityId:id});
  if(cityLoading || placesLoading) return <Skeleton />
  if(cityError) return <span className="text-danger">{cityError.message}</span>
  if(placesError) return <span className="text-danger">{placesError.message}</span>
  return (
    <div className="container py-4">
        <div className="d-flex justify-content-between">
        <h2>{cityData.data.name}</h2>
        <Button type='primary'>Book Travel</Button>
        </div>
        <h3>Featured Places</h3>
        <div className="row gx-4 gy-4">
            {
                placesData.data.map(place=>(
                  <div className="col-md-4" key={place.id}>
                        <PlaceCard id={place.id} name={place.name} experience={place.experience}
                        featured={place.featured} image={place.image} 
                    />
                  </div>
                ))
            }
        </div>
    </div>
  )
}
