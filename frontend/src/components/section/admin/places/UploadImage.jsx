import React from "react";
import {  Form, Formik } from "formik";
import { useState } from "react";
import { doPost, doPostForm } from "../../../../utils/request";
import useToken from "../../../../hooks/useToken";
import { Button, notification, Skeleton } from "antd";
import useFetch from "../../../../hooks/useFetch";
import styles from '../../../../styles/admin/place/section/UploadImage.module.scss'
import {GoTrashcan} from 'react-icons/go'
export default function UploadImage({ id }) {
  const [files, setFiles] = useState([]);
  const [token] = useToken();
  
  

  const { data, error, loading, refresh } = useFetch(`places/${id}/images`);

  const  handleDelete = async (id) =>{
    if(!window.confirm("Are You Sure")) return;

    const response =await doPost({method:'DELETE',path:`places/images/${id}`})
    if(response.ok){
      notification.success({
        message:"Image Deleted"
      })
      return refresh()
    }
    notification.error({
      message:"Failed To Delete"
    })
  }
  if(loading) return <Skeleton />
  if(error) return <span className="text-danger">{error}</span>
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Images</div>
        <div className="card-body">
          <div className="container p-4">
            <Formik
              initialValues={{}}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const form = new FormData();

                  for (const image of files) {
                    form.append("images", image);
                  }

                  const response = await doPostForm({
                    method: "POST",
                    body: form,
                    token: token,
                    path: `places/${id}/images`,
                  });

                  if (response.ok) {
                    return notification.success({
                      message: "Images added Successfully",
                    });
                    refresh()
                  }
                  const body = await response.json();
                  notification.error({
                    message: body.message,
                  });

                  const errorList = {};

                  body.errors.forEach((err) => {
                    if (errorList[err.param]) {
                      errorList[err.param] += err.msg;
                      return;
                    }
                    errorList[err.param] = err.msg;
                  });

                  setErrors(errorList);
                } catch (err) {
                  notification.error({
                    message: err.message,
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, handleSubmit, errors }) => (
                <Form>
                  <div className="row my-1">
                    <input
                      type="file"
                      name="images"
                      id="img"
                      onChange={(e) => {
                        e.preventDefault()
                        setFiles(e.target.files);
                      }}
                      multiple
                    />
                  </div>

                  <div className="row my-1">
                    {errors.images && (
                      <span className="text-danger">{errors.images}</span>
                    )}
                  </div>
                  <div className="row my-1">
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Upload
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="container p-4">
            <div className="row text-center gx-4 gy-4">
            {
              data.data.map(img=>(
                <ImageShow img={img} key={Math.random()} handleDelete={handleDelete}/>
              ))
              
            }
            </div>
          </div>            
        </div>
      </div>
    </div>
  );
}


function ImageShow({img, handleDelete}){
  const [hover, setHover] = useState(false)
  const open = ()=>setHover(true)
  const close = ()=>setHover(false)
  return(
    <div 
    onMouseEnter={open}
    onMouseLeave={close}
    style={{ backgroundImage: `url(${img.src})` }} className={`col-md-4 ${styles.imgContent}`} >
    {
      hover && (
        <div onClick={(e)=>handleDelete(img.id)} className={styles.deleteContainer}>
        <GoTrashcan className="text-white fs-1"/>
        <span className="text-white fs-1">Delete</span>
      </div>
      )
    }
   </div>
  )
}