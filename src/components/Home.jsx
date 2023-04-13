import React from 'react'
import { Link } from 'react-router-dom'
import urbanlist from '../assets/logos/Urban-List_Logo.png'
import weekend from '../assets/logos/Weekend-Edition_Logo.png'
import mustdo from '../assets/logos/Must-Do-Brisbane_Logo.png'



const Home = () => {

  const Card = (props) => {
    return (
      <div className="seenby-card shadow-btm flex column a-i-center j-c-center">
        <img src={props.src} width='170px'></img>
      </div>
    )
  }

  return (
  <main id="page-container">
    <article id="home" className="flex j-c-center">
      <div className="home-heading-container white flex column j-c-center">
        <h2 className="heading text-shadow">Welcome to PAWFUL</h2>
        <p className="heading-description text-shadow">
          Let us pamper your furry friend 
          at our professional dog grooming service!
        </p>
        <div className="btns-container flex column">
          <Link to={"/bookings"}><h3 className="btn">Book now</h3></Link>
          <Link to={"/send_inquiry"}><h3 className="btn">Send inquiry</h3></Link>
        </div>
      </div>
    </article>
    <section id="home-bg" className="home-context-container flex column a-i-center j-c-center white">
      <span>Proudly introduced by</span>
      <div className="home-cards-container flex column a-i-center">
        <Card src={urbanlist}/>
        <Card src={mustdo}/>
        <Card src={weekend}/>
      </div>
      <div className="homeEnd">
        <h4>Need recent news?</h4>
        <span>Please find us on Instagram and Facebook!</span>
      </div>
    </section>
  </main>
  )
}

export default Home