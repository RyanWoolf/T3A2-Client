import React from 'react'
import { ourPackages } from './config.js'
import { Link } from 'react-router-dom'

const OurServices = () => {
    
  const Card = (props) => {
    return (
      <div className="package-card shadow-btm flex column a-i-center j-c-sb">
        <h3>{props.name}</h3>
        <p className="heading-description">{props.desc}</p>
        <h3>From</h3>
        <h2>$ {props.price}</h2>
        <span className="division-line"></span>
        <Link to={'/bookings'}  state={{pkg_name: props.name, pkg_price: props.price}} ><h3 className="btn" name="Book-Now">Book now</h3></Link>
      </div>
    )
  }

  return (
  <main id="page-container">
    <article className="page-header flex column j-c-center a-i-center">
      <div id="our-services" className="main-bg-container"/>
      <div className="heading-container">
        <h2 className="heading text-shadow">Our services </h2>
        <p className="heading-description text-shadow">
        Let us pamper your furry friend at<br/>
        our professional dog grooming service! 
        </p>
        <Link to={"/send_inquiry"}><h3 className="btn">Send inquiry</h3></Link>
      </div>
    </article>
    <section className="context-container flex column a-i-left">
      <h2 className="heading">Grooming package<p className="heading-description">
          We're a group of dog enthusiastic that our skills to look after many kinds of dogs!
        </p></h2>
        <div id="packages-container" className="cards-container flex column a-i-center j-c-center">
          {ourPackages.map((el, idx) => {
            return (
              <Card 
                key={idx}
                name={el.pkg_name}
                desc={el.pkg_description}
                price={el.pkg_price}
              />
            )
            })
          }
        </div>
      </section>
    </main>
  )
}

export default OurServices