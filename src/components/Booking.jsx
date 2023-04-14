import React, { useEffect, useState } from "react"
import DatePicker from 'react-datepicker'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import "react-datepicker/dist/react-datepicker.css"
import { useUserContext } from "./UserContext"
import { ourPackages, fetchURL } from "./config"



const Booking = () => {
  const { state } = useLocation()
  const { user } = useUserContext()
  const nav = useNavigate()
  const [ form, setForm ] = useState({
    _id: '',
    date: '',
    pkg_name: state ? state.pkg_name : '',
    pkg_price: state ? state.pkg_price : '',
    dog_name: '',
    dog_gender: '',
    dog_age: '',
    dog_breed: ''
  })

  useEffect(() => {
      if (user == undefined) {
        nav('/login')
      }
    }, [])

  const Calendar = () => {
    const [startDate, setStartDate] = useState(form.date)
    const filterPassedTime = (time) => {
      const currentDate = new Date()
      const selectedDate = new Date(time)
      return currentDate.getTime() < selectedDate.getTime()
    }
  
    return (
      <DatePicker 
        selected={startDate}
        onChange={(date) => {
          setStartDate(date)
          form.date = date
          }}
        name="date"
        showTimeSelect
        required={true}
        minTime={setHours(setMinutes(new Date(), 0), 9)}
        maxTime={setHours(setMinutes(new Date(), 0), 17)}
        filterTime={filterPassedTime}
        dateFormat="yyyy-MM-dd"
        inline
        />
    )
  }

  const matchPrice = (name) => {
    for (const i of ourPackages) {
      if (name == i.pkg_name) {
        return i.pkg_price
      }
    }
  }

  const handleForm = (e) => {
    const { value, name } = e.target
    if ( name === "pkg_name") {
      form.pkg_price = matchPrice(value)
    }
    setForm({
      ...form,
      [name]: value
    })
    console.log( form )
  }

  const addBooking = async ( date, pkg_name, pkg_price, dog_name, dog_gender, dog_age, dog_breed ) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data_date = new Date(date)
    const newBooking = {
      user: user._id,
      pkg: {
        name: pkg_name,
        price: pkg_price},
      date: {
        year: String(data_date.getFullYear()),
        month: String(months[data_date.getMonth()]),
        date: String(data_date.getDate()),
        time: String(data_date.getHours() + ":" + data_date.getMinutes())
      },
      dog: {
        name: dog_name,
        gender: dog_gender,
        breed: dog_breed,
        age: dog_age
      }
    }
    // Post new booking to API
    const returnedBooking = await fetch(fetchURL+'/bookings/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: user.tk
      },
      body: JSON.stringify(newBooking)
    })
    const data = await returnedBooking.json()
    .then((res) => {
      console.log(res)
      if (res) {
        console.log("New booking successfully added")
        return nav(`../my_account`)
      }
    }).catch(e => {
      console.log(e.message)})
  }

  const emptyValueCheck = () => {
    if (!form.date || !form.pkg_name || !form.dog_name || !form.dog_gender) {
      return false
    } else {
      return true
    }
  }

  const submit = async (evt) => {
    console.log(form, "before submit")
    if (emptyValueCheck()) {
      evt.preventDefault()
      await addBooking(
        form.date,
        form.pkg_name,
        form.pkg_price,
        form.dog_name,
        form.dog_gender,
        form.dog_age,
        form.dog_breed
      )
    } else {
      alert('Please provide the required information.')
      return
    }
  }
  
  return (
  <main id="page-container">
    <article className="page-header flex column j-c-center a-i-center">
      <div id="my-account" className="main-bg-container"/>
      <div className="heading-container text-shadow">
        <h2 className="heading">Book your<br/>appointment</h2>
        <p className="heading-description">
          Please check the below options for more information. Backup file
        </p>
      </div>
    </article>
    <section id="booking-container" className="context-container flex column a-i-center j-c-center">
      <Calendar id="calendar" cb={handleForm} />
      <div id="booking-input-container" className="cards-container flex column a-i-center j-c-center">
        <select 
          defaultValue={state?.pkg_name ? state.pkg_name : "DEFAULT"}
          onChange={handleForm} 
          id="packages-dropbox" 
          required 
          name="pkg_name">
            <option value="DEFAULT" disabled >Select a package *</option>
              {ourPackages.map((el, idx) => {
                return <option key={idx} value={el.pkg_name}>{el.pkg_name}</option>
            })}
        </select>
        <input 
          onChange={handleForm} 
          value={form.dog_name} 
          type="text" 
          className="booking-input" 
          name="dog_name" 
          required 
          placeholder={"Dog name *"}/>
        <select 
          defaultValue="DEFAULT_gender"
          onChange={handleForm} 
          id="packages-dropbox" 
          required 
          name="dog_gender">
            <option value="DEFAULT_gender" disabled>Dog gender *</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <input 
          onChange={handleForm} 
          value={form.dog_age} 
          type="number" 
          className="booking-input" 
          name="dog_age" 
          placeholder={"Dog age"}/>
        <input 
          onChange={handleForm} 
          value={form.dog_breed} 
          type="text" 
          className="booking-input" 
          name="dog_breed" 
          placeholder={"Dog breed"}/>
        <Link onClick={submit} ><h3 className="btn login-btn">Save</h3></Link>
      </div>
      <p id="booking-agreement" className="agreement">
      By creating an account, <br/>
      you agree to our Terms & conditions and Privacy notice on how we manage your personal information.
      </p>
    </section>
  </main>
  ) 
} 

export default Booking