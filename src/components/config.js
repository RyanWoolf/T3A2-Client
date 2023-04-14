import daycare from '../assets/icons/icon_daycare.png'
import grooming from '../assets/icons/icon_grooming.png'
import bath from '../assets/icons/icon_bath.png'
import checkup from '../assets/icons/icon_checkup.png'


// export const fetchURL = `http://localhost:4717`
export const fetchURL = `https://t3a2-b-server-production-542a.up.railway.app`


export const menuItems=[
  {
    title: "Home", 
    to: "/"
  },{
    title: "About us", 
    to: "/about_us"
  },{
    title: "Our services", 
    to: "/our_services"
  },{
    title: "Send inquiry", 
    to: "/send_inquiry"
  }        
]

export const titles = [
  "Mr",
  "Mrs",
  "Ms",
  "Miss",
  "Mx"
]


export const aboutUs = [
  {
    title: 'Daycare',
    src: daycare,
    desc: 'Simply your dog can wait in our playground! Meet friends and play games. After any service, your dog can wait in the playground until you come back!'
  },{
    title: 'Grooming',
    src: grooming,
    desc: 'Simply your dog can wait in our playground! Meet friends and play games. After any service, your dog can wait in the playground until you come back!'
  },{
    title: 'Bath',
    src: bath,
    desc: 'Simply your dog can wait in our playground! Meet friends and play games. After any service, your dog can wait in the playground until you come back!'
  },{
    title: 'Check up',
    src: checkup,
    desc: 'Simply your dog can wait in our playground! Meet friends and play games. After any service, your dog can wait in the playground until you come back!'
  }
]



export const ourPackages = [
  {
    pkg_name: "Grooming",
    pkg_price: 50,
    pkg_description: "Our friendly, professional staff provide you with the services to maintain the individual needs of your pet."
  },{
    pkg_name: "Bath & Grooming",
    pkg_price: 65,
    pkg_description: "Do you need bath and grooming both? Don't worry! You can have best services here."
  },{
    pkg_name: "Pawful training",
    pkg_price: 110,
    pkg_description: "Do you want a well behaved and happy dog? We offer Brisbane\'s most effective dog behaviour training and dog training ."
  },{
    pkg_name: "Wet & Wild",
    pkg_price: 30,
    pkg_description: "Everyone deserves fun! Even your dogs! Let them have fun in our special swimming pool"
  },
]


