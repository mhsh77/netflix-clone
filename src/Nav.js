import React ,{useEffect,useState} from 'react'
import './Nav.css'
function Nav() {
    const [show,setShow] = useState(false)
    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
           setShow(false);
        }
      })
    
      
    }, [])
    
  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" 
        alt="Netflix" className="nav__logo" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" 
        alt="NetflixSmile" className="nav__avatar" />
    </div>
  )
}

export default Nav