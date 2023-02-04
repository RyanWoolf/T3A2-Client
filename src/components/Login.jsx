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
      <Link name="login-button" onClick={logIn}><h3 className="btn login-btn">LOGIN</h3></Link>
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
    evt.preventDefault()
    if (!form.email || !form.password) {
      return alert('Please enter your email and password')
    }
    try {
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
            firstName: response.firstName,
            tk: response.token
            })
          alert(response.message)
          return nav('/my_account')
        }
        alert("Failed to login. Please try again")
          setForm({
            email: '',
            password: ''
          })
      })
    } catch {
      console.log(`Failed to login`)
      alert("Failed to login. Please try again")
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