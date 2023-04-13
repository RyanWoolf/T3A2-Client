import React, { useEffect, useState } from 'react'
import { useUserContext } from './UserContext'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import UserBoxController from './UserBoxController'
import { fetchURL, titles } from './config'


const JoinController = () => {
  const Join = () => {
    const nav = useNavigate()
    const { user,setUser } = useUserContext()
    const [ usersList, setUsersList ] = useState([])
    const [ form, setForm ] = useState({
      email: '',
      title: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      password: ''
    })
    const { email, title, first_name, last_name, phone_number, password } = form

    const handleForm = (e) => {
      const { value, name } = e.target
      setForm({
        ...form,
        [name]: value
      })
    }

    useEffect(() => {
      console.log("Join page renders")
    }, [])

    const addUserDetail = async ( email, title, first_name, last_name, phone_number, password ) => {
      const newUser = {
        email: email,
        title: title,
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone_number,
        password: password 
      }
      
      try { 
        const returnedUser = await fetch(fetchURL + '/users/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        })
        
        const data = await returnedUser.json()
        .then((res) => {
          console.log(res)
          console.log("Attempting to register in DB")
          if (res.code == 201) {
            setUser({
              _id: res.user_id,
              firstName: res.firstName,
              tk: res.token
              })
            alert("Thanks for registering!")
            return nav('/my_account')
          } else if (res.code == 406) {
            setUser(null)
            alert(`${res.message}. Please try again with another email.`)
          }
        })
        .catch(err => {
          setUser(null)
          alert(`We're experiencing server fail. Please try again later.`)
        })
      } catch (err) {
          setUser(null)
          alert(`We're experiencing server fail. Please try again later.`)
          return
      }}

    const submit = async (evt) => {
      evt.preventDefault()
      console.log("Checking the form valid")
      if (!form.email || !form.password || !form.first_name || !form.last_name) {
        return alert('Please enter the required fields')
      } else {
        console.log("Creating new user", form)
        await addUserDetail( 
          form.email, 
          form.title, 
          form.first_name, 
          form.last_name, 
          form.phone_number, 
          form.password )
      }
    }


    return (
      <>
        <h2 className='heading' id="login-heading">Create an account</h2>
        <Link to="/login" className='sub-desc'>Already have an account? Login here</Link>
        <input value={email} onInput={handleForm} required className="login-input" 
          type="email" name="email" placeholder='Email *' autocomplete='off'
          pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"/>
        <select defaultValue="DEFAULT" onChange={handleForm} className="login-input" name="title">
          <option value="DEFAULT" disabled hidden>Title</option>
          {titles.map((el,idx) => {
            return <option key={idx} value={el}>{el}</option>
          })}
        </select>
        <input value={first_name} onChange={handleForm} 
          required className="login-input" type="text" autocomplete='off'
          name="first_name" placeholder='First name *'/>
        <input value={last_name} onChange={handleForm} 
          required className="login-input" type="text" autocomplete='off'
          name="last_name" placeholder='Last name *'/>
        <input value={phone_number} onChange={handleForm} 
          pattern="[0-9]{10}" className="login-input" autocomplete='off'
          type="tel" name="phone_number" placeholder='Phone number'/>
        <input value={password} onChange={handleForm} required id="password" autocomplete='off'
        className="login-input" name="password" type="password" placeholder="Password *" />
        <input id="submit-btn" onClick={submit} type="submit" value="Create my account" />
        <span className="agreement">By creating an account,<br/> you agree to our Terms & conditions and Privacy notice on how we manage your personal information.</span>
      </>
    )
  }


  return (
    <UserBoxController 
      children={
        <form id='login-form' className='flex column j-c-center a-i-center' > 
          <Join />
        </form>
      } 
    />
  )
}

export default JoinController