import styles from "../styles/Hero.module.scss";
import CitySelect from "./CitySelect";
import ExperienceSelect from "./ExperienceSelect";
export default function Hero() {
  return (
    <section className={styles.container}>
      <h1 className="text-white bg-dark px-2">Find Your Destination</h1>
      <div className={`${styles.item} p-4 card shadow rounded`}>
        <div className="row g-4">
          {/* City Select */}
          <div className="col-md-3">
            <CitySelect onChange={()=>{}}/>
          </div>

          {/* Experience Select */}
          <div className="col-md-3">
           <ExperienceSelect onChange={()=>{}}/>
          </div>

          <div className="col-md-4">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Destination Name"
            />
          </div>
        </div>
         
          <div className="col-md-2">
              <div className="btn btn-block w-100 btn-primary">
                  Search
              </div>
          </div>



        </div>

    
      </div>
    </section>
  );
}
