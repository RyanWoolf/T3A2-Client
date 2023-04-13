import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import menuIcon from '../assets/icons/icon_hamburger.png'
import closeIcon from '../assets/icons/icon_close.png'
import login from '../assets/icons/icon_login.png'
import logout from '../assets/icons/icon_logout.png'
import join from '../assets/icons/icon_join.png'
import facebook from '../assets/icons/facebook.png'
import insta from '../assets/icons/instagram.png'
import { useUserContext } from './UserContext'
import { menuItems } from './config'



//  Use Context for faster performance between states and functions globally
const MenuControllerContext = React.createContext()


// Parent component to control the menu
const MenuController = () => {
    const { user, setUser } = useUserContext()
    const nav = useNavigate()

    useEffect(() => console.log(user), [])
    

    // State to watch that the menu is opened or closed
    const [ isOpen, setOpen ] = useState(null)

    // State to give html class sub-class 'true' or 'false'
    const [ isVisible, setVisible ] = useState(() => {
        return isOpen ? true : false
    })


    // Handler to change states when the button is clicked
    const toggleState = (evt) => {
        setOpen(!isOpen)
        setVisible(!isOpen)
        evt.preventDefault()
    }
    
    const toggleStateForMenu = () => {
        setOpen(!isOpen)
        setVisible(!isOpen)
    }

    const clickOutOfMenu = (e) => {
        setOpen(false)
        setVisible(false)
    }

    const handleLogoutClick = (evt) => {
        evt.preventDefault()
        alert(`Successfully logged out. \n See you again, ${user.firstName}`)
        setUser(undefined)
        setOpen(!isOpen)
        setVisible(!isOpen)
        nav("/login")
    }
    

    return (
        <MenuControllerContext.Provider value = {{toggleState, toggleStateForMenu, handleLogoutClick, clickOutOfMenu, isOpen, isVisible, user}}>
            <Link to="/" target="_blank" aria-label="openMenu" onClick={toggleState}
                    aria-haspopup={!isOpen} id="btnOpenMenu">
                <img src={menuIcon} width="40px" height="40px" />
            </Link>
            <MenuBox></MenuBox>
        </MenuControllerContext.Provider>
    )
}


// MenuBox component
const MenuBox = () => {
    const {toggleState, toggleStateForMenu, handleLogoutClick, clickOutOfMenu, isOpen, isVisible, user} = useContext(MenuControllerContext);

    // Custom Link component
    const LinkTo = (props) => {
        return (
            <Link to={props.to} onClick={props.onClick}>
                <img src={props.src} />
                <span> {props?.title}</span>
            </Link>
        )
    }

    return (
        <>
        <div id="menu-wrapper" className={"shadow-btm isOpen " + isVisible}>
            <div id="login-signup-box" className="flex a-i-center j-c-sb">
                {user == undefined ? (
                <>
                    <LinkTo onClick={toggleStateForMenu} to="/login" src={login} title="Login" />
                    <LinkTo onClick={toggleStateForMenu} to="/join" src={join} title="Join" />
                </>    ) : (
                <>
                    <LinkTo onClick={handleLogoutClick} src={logout} title="Logout" />
                    <LinkTo onClick={toggleStateForMenu} to="/my_account" src={join} title="My Account" />
                </>
                    )}
                <Link aria-label="closeMenu" onClick={toggleState} id="btnOpenMenu">
                    <img src={closeIcon} width="40px" height="40px" />
                </Link>
            </div>
            <nav aria-label="menu" id="menu-container">
                <ul id='menu-box' name="menu-box">
                    {menuItems.map((el,idx) => { // menu items rendering
                        return <li key={idx} >
                            <Link to={el.to} name={el.title} onClick={toggleStateForMenu}>{el.title}</Link>
                            </li>
                    })}
                </ul>
            </nav>
            <div id="social-menu" className="flex a-i-center">
                <a href="http://instagram.com/" target="_blank">
                    <img src={insta}/>
                </a>
                <a href="http://facebook.com" target="_blank">
                    <img src={facebook}/>
                </a>
            </div>
        </div>
        {isVisible ? <div id="menu-background" onClick={clickOutOfMenu}></div> : ''}
    </>
    )    
}
export default MenuController;