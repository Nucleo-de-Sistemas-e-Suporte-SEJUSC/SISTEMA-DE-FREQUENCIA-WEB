import React, { createContext, useContext } from 'react'

const RoleContext = createContext();

export function RoleProvider({ children }) {
    const [role, setRole] = useState("viewer");

  return (
    <RoleContext.Provider value={role}>
        {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
    return useContext(RoleContext);
}
