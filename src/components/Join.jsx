import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dog from '../assets/dog_login.png'


const Join = () => {

  const [ password, setPassword ] = useState('')

  function handlePassInput(e) {
    console.log(e.target)
    if (e.target) {
      const password = e.target.value
      setPassword(password)
      if (password.length === 0) {
        addClass(e)
      } else if (password.length < 4) {
        addClass(e, "weak")
      } else if (password.length < 7) {
        addClass(e, "average")
      } else {
        addClass(e, "strong")
      }
    }
  }

  function addClass(e, name) {
      e.target.className = "login-input"
      if (name) {
        e.target.className += " " + name
      }
  }

  return (
    <>
      <h2 className='heading' id="login-heading">Create my account</h2>
      <Link to="/login" className='sub-desc'>Already have an account? Login here</Link>
      <input className="login-input" type="text" name="email" placeholder='Email *'/>
      <input className="login-input" type="text" name="first_name" placeholder='First name *'/>
      <input className="login-input" type="text" name="last_name" placeholder='Last name *'/>
      <input className="login-input" type="tel" name="contact" placeholder='Contact *'/>
      <input id="password" className="login-input" type="password" placeholder="Password *" value={password} onInput={handlePassInput}/>
      <Link to="/" className="btn shadow-btm login-btn">CREATE MY ACCOUNT</Link>
      <span className="agreement">By creating an account,<br/> you agree to our Terms & conditions and Privacy notice on how we manage your personal information.</span>
    </>
  )
}




const JoinController = () => {

  return (
    <section id="login-bg" className='flex j-c-center a-i-center'>
      <div id="login-container" className='flex column a-i-center shadow-btm'>
        <img id='login-dog' src={dog} />
        <form id='login-form' className='flex column j-c-center a-i-center' > 
          {/* <Login /> */}
          <Join />

        </form>
      </div>
    </section>
  )
}

export default JoinController