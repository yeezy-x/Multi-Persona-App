import {createContext,useContext,useState} from "react"
import type { AuthContextType,User } from "@/types/auth";
const AuthContext=createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){
    const [user,setUser]=useState<AuthContextType["user"]>(null)
    function login(user:User){
        setUser(user)
    }
    function logout(){
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context=useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}