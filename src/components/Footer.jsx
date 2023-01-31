import React from 'react'
import email from '../assets/icons/icon_mail.png'
import insta from '../assets/icons/instagram.svg'
import facebook from '../assets/icons/facebook.svg'


const Social = (props) => {
  return (
    <a className= "social-footer" href={props.href} target="_blank">
      <img width="30px" src={props.src}>
      </img>
    </a>
  )
}


const currentYear = () => new Date().getFullYear()


const Footer = () => {
  return (
    <footer className="shadow-top flex column a-i-center j-c-center">
      <div className="socialIcon-container">
        <Social href={'http://facebook.com'} src={facebook} />
        <Social href={'http://instagram.com'} src={insta} />
        <Social href={'mailto:clidelee@gmail.com'} src={email} />
      </div>
      <span>Copyright &copy; {currentYear()} PAWFUL All Rights Reserved</span>
    </footer>
  )
}


export default Footer