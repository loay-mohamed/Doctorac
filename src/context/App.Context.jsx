import { createContext } from "react";
import { doctors } from "../assets/assets";
export const AppContext=createContext(null)

export default function AppProvider({children}) {

 const salary='$'
 const  value={
    doctors,
    salary

 }   

 return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
 )
}