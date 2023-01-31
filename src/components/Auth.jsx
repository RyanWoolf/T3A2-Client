import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'

const users = [
  { email: "kim@test.com", password: "123", name: "Kim" },
  { email: "lee@test.com", password: "456", name: "Lee" },
  { email: "park@test.com", password: "789", name: "Park" },
]
const signIn = ({ email, password }) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) throw new Error();
  return user;
}
export default signIn

// function AuthRoute({ authenticated, component: Component, render, ...rest }) {
//   const { state } = useLocation()
//   return (
//     <Route
//       {...rest}
//       element={(props) =>
//         authenticated ? (
//             <Component {...props} />
//           ) : (
//             <Navigate replace to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// }

// export default AuthRoute

// element={<Navigate replace to={from} />}