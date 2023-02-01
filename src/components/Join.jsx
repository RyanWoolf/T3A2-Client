import React, { useEffect, useState } from 'react'
import { useUserContext } from './UserContext'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import dog from '../assets/dog_login.png'



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

  const titles = [
    "Mr",
    "Mrs",
    "Ms",
    "Miss",
    "Mx"
  ]

  useEffect(() => {
    async function fetchUsersList () {
      const res = await fetch('http://localhost:4717/users').catch(e => console.log(e.message)) //user list .. leaks risk?
      const data = await res.json()
      setUsersList(data)
    }
    fetchUsersList()
  }, [])

  const addUserDetail = async ( email, title, first_name, last_name, phone_number, password ) => {
    // const id = usersList.length

    const newUser = {
      email: email,
      title: title,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      password: password // Double check on DB server
    }
    
    // Post new user to API

    const returnedUser = await fetch('http://localhost:4717/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const data = await returnedUser.json()
    console.log(data)
    setUser(data)
  }


  const isThisEmailOk = (e) => {
    console.log(usersList)
    const found = usersList.find( (el) => {
      if (el.email === e.target.value) {
        alert('This email is already in use. Please try another email.')
        setForm({
          ...form,
          email: ''
        })
        return false}
    })
  }



  const submit = async (evt) => {
    console.log("Checking the form valid")
    if (!form.email || !form.password || !form.first_name || !form.last_name) {
      return alert('Please enter the required fields')
    } else {
      console.log("Creating new user", form)
      evt.preventDefault()
      await addUserDetail( 
        form.email, 
        form.title, 
        form.first_name, 
        form.last_name, 
        form.phone_number, 
        form.password )
      nav(`../my_account`)
    }
  }


  return (
    <>
      <h2 className='heading' id="login-heading">Create my account</h2>
      <Link to="/login" className='sub-desc'>Already have an account? Login here</Link>
      <input value={email} onInput={handleForm} onBlur={isThisEmailOk} required className="login-input" 
        type="email" name="email" placeholder='Email *' 
        pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"/>
      <select defaultValue="DEFAULT" onChange={handleForm} className="login-input" name="title">
        <option value="DEFAULT" disabled hidden>Title</option>
        {titles.map((el,idx) => {
          return <option key={idx} value={el}>{el}</option>
        })}
      </select>
      <input value={first_name} onChange={handleForm} 
        required className="login-input" type="text" 
        name="first_name" placeholder='First name *'/>
      <input value={last_name} onChange={handleForm} 
        required className="login-input" type="text" 
        name="last_name" placeholder='Last name *'/>
      <input value={phone_number} onChange={handleForm} 
        pattern="[0-9]{10}" className="login-input" 
        type="tel" name="phone_number" placeholder='Phone number'/>
      <input value={password} onChange={handleForm} required id="password" 
      className="login-input" name="password" type="password" placeholder="Password *" />
      <input id="submit-btn" onClick={submit} type="submit" value="Create my account" />
      <span className="agreement">By creating an account,<br/> you agree to our Terms & conditions and Privacy notice on how we manage your personal information.</span>
    </>
  )
}


// const Update = () => {

//   return (
//     <>
//       <h2 className='heading' id="login-heading">Update my detail</h2>
//       <input className="login-input" type="text" name="first_name" placeholder='New first name *'/>
//       <input className="login-input" type="text" name="last_name" placeholder='New last name *'/>
//       <input className="login-input" type="tel" name="contact" placeholder='New contact *'/>
//       <input id="password" className="login-input" type="password" placeholder="Current password *" /> 
//       <Link to="/my_account"><h3 className="btn login-btn">Create my account</h3></Link>
//     </>
//   )
// }




const JoinController = () => {
  

  return (
    <section id="login-bg" className='flex j-c-center a-i-center'>
      <div id="login-container" className='flex column a-i-center shadow-btm'>
        <img id='login-dog' src={dog} />
        <form id='login-form' className='flex column j-c-center a-i-center' > 
          <Join />
          {/* <Update /> */}
        </form>
      </div>
    </section>
  )
}

export default JoinController