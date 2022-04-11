import { useState } from 'react'
import { Link } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import styles from '../styles/Nav.module.scss'
import Navscreen from './Navscreen'
import useUser from '../hooks/useUser'

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
    path: '/login',
    guest: true
  }
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const open = ()=>setVisible(true)
  const close = ()=>setVisible(false)
  const {user} = useUser()
  return (
    <header className={styles.container}>
        <div className={`${styles.navlinks}  ms-auto d-none d-lg-flex me-4`}>
          { 
          links.filter(link=>{
            if(link.guest && user) return false;
            return true;
          })
          .map(link=>(
            
                <Link className='mx-2' key={link.label} to={link.path}>{link.label}</Link>
           
          )) 
          }
        </div>
        <GiHamburgerMenu onClick={open}  className='fs-1 ms-auto me-4 text-white d-lg-none'/>
       {visible &&  <Navscreen links={links} handleClose={close}/>}
    </header>
  )
}
