import React, {useContext, createContext, useState} from 'react'

const UserContext = createContext(null)

export function UserContextProvider({children}) {
  const [ user, setUser ] = useState(undefined)
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  return (
    <UserContext.Provider
      children={children}
      value={{
        user,
        setUser,
        // isLoggedIn,
        // setIsLoggedIn,
      }}
    />
  )
}

export function useUserContext() {
  const userContext = useContext(UserContext)
  if ( !userContext ) {
    throw new Error('UserContext.Provider is not found')
  }
  return userContext;
}