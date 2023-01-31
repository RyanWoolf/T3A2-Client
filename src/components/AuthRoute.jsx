import React, { useEffect, useState } from 'react'
import { Route, Navigate, Outlet } from "react-router-dom"
import MyAccount from './MyAccount'

const AuthRoute = () => {
  const [ Authorized, setAuthorized ] = useState('false')
  const token = localStorage.getItem("isAuthenticated")
  // setAuthorized(sessionStorage.getItem("isAuthenticated"))
  // useEffect(()=>{
  //   console.log(isAuthenticated)
  // }, [isAuthenticated])
  useEffect(()=>{
    setAuthorized(token)
    console.log(Authorized)
  }, [Authorized])




  if ( Authorized == false ) {
    return <Navigate replace to="/login" />
  }
  return <MyAccount />
  // return <Navigate to="/my_account" />
}

export default AuthRoute


// const AuthLayout = () => {
//   if (user !== null) {
//     return authenticated ? <Outlet /> : null; // or loading indicator, etc...
//   }
//   return <Navigate to={"/login"} replace />;
// };

// export default AuthLayout