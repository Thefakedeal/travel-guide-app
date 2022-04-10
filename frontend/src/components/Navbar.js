import { useState } from 'react'
import { Link } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import styles from '../styles/Nav.module.scss'
import Navscreen from './Navscreen'

const links = [
  {
    label: "Home",
    path: '/'
  },
  {
    label: "Places",
    path: '/places'
  },
  {
    label: "Login",
    path: '/login'
  }
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const open = ()=>setVisible(true)
  const close = ()=>setVisible(false)
  return (
    <header className={styles.container}>
        <div className={`${styles.navlinks}  ms-auto d-none d-lg-flex me-4`}>
          { 
          links.map(link=>(
            
                <Link className='mx-2' key={link.label} to={link.path}>{link.label}</Link>
           
          )) 
          }
        </div>
        <GiHamburgerMenu onClick={open}  className='fs-1 ms-auto me-4 text-white d-lg-none'/>
       {visible &&  <Navscreen links={links} handleClose={close}/>}
    </header>
  )
}
