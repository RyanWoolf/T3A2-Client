import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchURL } from './config'
import UserBoxController from './UserBoxController'
import { useUserContext } from './UserContext'


const Login = ({ email, password, handle, logIn }) => {
  return (
    <>
      <h2 className='heading' id="login-heading">Login</h2>
      <Link to="/join" className='sub-desc'>New to PAWFUL? Join here</Link>
      <input 
          id="loginInput"
          key="1"
          value={email} 
          className="login-input" 
          type="email" 
          name="email" 
          placeholder='Email'
          required
          onChange={handle}
      />
      <input 
          id="passwordInput"
          key="2"
          value={password} 
          className="login-input" 
          type="password" 
          placeholder="Password"
          required
          name="password"
          onChange={handle}
      />
      <div style={{ height: '92px' }}>
        <div className="loader-container login-btn" style={{ display: 'none' }}>
          <span className="loader"></span>
        </div>
        <Link name="login-button" onClick={logIn}>
          <div className="btn login-btn">
            <p>Login</p>
          </div>
        </Link>
      </div>
      <Link name="forgot-password" to="/send_inquiry" className='sub-desc'>Forgot password?</Link>
    </>
  )
}



const LoginController = () => {

  const { user, setUser } = useUserContext()
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  })

  const nav = useNavigate()

  useEffect(() => {
    if (user) {
      nav('/my_account')}
    try {
      console.log("Login page renders")
    } catch (error) {
      console.log(error.message)}
  }, [])

  const logIn = async (evt) => {
    const loginBtn = document.querySelector('.login-btn p')
    const loader = document.querySelector('.loader-container')
    evt.preventDefault()
    if (!form.email || !form.password) {
      return alert('Please enter your email and password')
    }
    try {
      loginBtn.style.display = 'none'
      loader.style.display = 'block'
      const returnedUser = await fetch(fetchURL + '/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const data = await returnedUser.json()
      .then((response) => {
        console.log("response", response)
        if (response.code == 200) {
          setUser({
            _id: response.user_id,
            email: response.email,
            firstName: response.firstName,
            tk: response.token
            })
          alert(response.message)
          loginBtn.style.display = 'block'
          loader.style.display = 'none'
          return nav('/my_account')
        }
        alert("Failed to login. Please try again")
        loginBtn.style.display = 'block'
        loader.style.display = 'none'
        setUser(undefined)
        setForm({
          email: '',
          password: ''
        })
      })
    } catch {
      loginBtn.style.display = 'block'
      loader.style.display = 'none'
      alert("Failed to login. Please try again")
      setUser(undefined)
      setForm({
        email: '',
        password: ''
      })
    }
  }

  const handleForm = (e) => {
    const { value, name } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  



  return (
    <UserBoxController 
      children={
        <form id='login-form' className='flex column j-c-center a-i-center' >
          <Login 
            email={form.email} password={form.password} handle={handleForm} logIn={logIn}/>
        </form>
      } 
    />
  )
}

export default LoginController