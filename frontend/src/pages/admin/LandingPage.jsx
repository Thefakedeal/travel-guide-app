import {MdPlace} from 'react-icons/md'
import styles from '../../styles/admin/Home.module.scss'
import {useNavigate} from 'react-router-dom'
const links = [
    {
        title: "Places",
        url: "/admin/places",
        logo: <MdPlace  className={styles.hugeIcon} />
    }
]

export default function LandingPage() {
  return (
    <div>
        <h5 className="text-center my-2">Admin Dashboard</h5>

        <div className=" px-4 row g-4 w-100">
            {
                links.map(link=>(
                    <div key={link.title}  className="col-md-3 col-lg-2 col-6">
                        <AdminLink url={link.url} logo={link.logo} title={link.title}/>
                    </div>
                    ))
            }
        </div>
    </div>
  )
}

function AdminLink({url, logo, title}){
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(url)} className={`${styles.card} card shadow`}>
            {logo}
            <h3>{title}</h3>
        </div>
    )
}
