import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import my_detail from '../assets/icons/icon_mydetail.png'
import { fetchURL } from './config'
import { useUserContext } from './UserContext'
import add_button from '../assets/icons/add_button.png'



const MyAccount = () => {
  const { user, setUser } = useUserContext()
  const [ bookings, setBookings ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const nav = useNavigate()
  

  async function getBookings() {
    console.log("Start fetching bookings...")
    const bookings = await fetch(`${fetchURL}/bookings/my_bookings/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: user.tk
      },
      body: JSON.stringify({
        _id: user._id
      })
    }).catch((err) => {
      console.log("Error fetching bookings", err.error)
      setLoading(true)
    })
    const data = await bookings.json()
    .then((res) => {
      console.log("Bookings found")
      setBookings(res)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }




  useEffect(() => {
    setLoading(true)
    console.log("My account page renders")
    try {
      if (user == undefined) {
        nav('/login')}
      getBookings()
    } catch (err) {
      console.log(err.message)
      nav('/404')
    }
    }
  , [])


const BookingCard = ({ booking, date, pkg, time, price }) => {

  const nthNumber = (str) => {
    let i = Number(str)
    let j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  const addBookingToUserContext = () => {
    setUser({
      ...user,
      booking: booking
    })
    console.log(booking, user, "Booking to modify added on user")
  }

  const deleteBooking = async () => {
    const confirmation = confirm("Do you wish to delete this booking?")
    const doubleConfirmation = confirm("Are you sure?")
    if ( confirmation && doubleConfirmation ) {
      const bookingToDelete = await fetch(`${fetchURL}/bookings/${booking._id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: user.tk
        }})
      const data = await bookingToDelete.json()
        .then((res) => {
          alert(res.msg)})
        .catch(e => {console.log(e.message)
        })
      getBookings()
    } else {
      return true
    }
  }

  return (
    <>
      <div className="booking-card flex a-i-center shadow-btm">
        <div className="booking-date flex column a-i-center">
          <h2>{nthNumber(date.date)}</h2>
          <h2>{date.month}</h2>
        </div> 
        <div className="booking-detail">
          <h3>{pkg}</h3>
          <p className='heading-description'>{time}0 up to 1 hour</p>
          <div className="modify-booking-box">
            <h3>$ {price}</h3>
            <Link className="" to={`/bookings/update`} onClick={addBookingToUserContext}>Modify</Link>
            <span className="" > | </span>
            <Link className="" to="" onClick={deleteBooking}  onMouseEnter={()=>console.log(date)}>Cancel</Link>
          </div>
        </div>
      </div>
    </>
  )
}


const BookingNowCard = () => {
  return (
    <div className="booking-card flex a-i-center shadow-btm">
      <div id="book-now-card" className="booking-date flex column a-i-center">
        <Link className="" to={`/bookings/`}> 
          <img src={add_button}/>
          <h3>New booking</h3>
          </Link>
      </div>
    </div>
  )
}





const BookingCardContainer = () => {
  if (loading) {
    return <><br/><h3>Loading...</h3></>
  }
  return (
    <div id="booking-cards-container" className="cards-container flex column a-i-center j-c-center">
          {
            bookings.map((el, idx) => {
              const today = new Date
              const bookingDate = new Date(`${el.date.year}-${el.date.month}-${el.date.date}`)
              // If the booking is past, not rendering.
              if (today.getTime() > bookingDate.getTime()) {
                return
              }
              return (
                <BookingCard 
                  key={idx}
                  booking={el}
                  date={{date: el.date.date, month: el.date.month, year: el.date.year}}
                  pkg={el.pkg.name}
                  time={el.date.time}
                  price={el.pkg.price}
                />)
            }) }
            <BookingNowCard />
        </div>
  )
}


  return (
  <main id="my-account-page">
    <article className="page-header flex column j-c-center a-i-center">
      <div id="my-account" className="main-bg-container"/>
      <div className="heading-container text-shadow">
        <h2 className="heading ">Welcome back, <br/>{ user != undefined ? user.firstName : "Visitor"} </h2>
        <p className="heading-description">
          Please check the below options for more information.
        </p>
      </div>
    </article>
    <section className="context-container flex column a-i-left">
      <div className="flex" id="my-detail-container">
        <h2 className="heading" id="my-detail">My detail</h2>
        <Link id="update-my-detail" to="/my_account/update" className='sub-menu flex'>
          <img src={my_detail} width="25px"/>Update my detail</Link>
      </div>
      <h2 className="heading">My bookings</h2>
        <BookingCardContainer/>
    </section>
  </main>
  )
}

export default MyAccount