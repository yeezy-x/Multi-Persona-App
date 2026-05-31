"use client"

import {createContext,useContext,useEffect,useState} from "react"
import type { AuthContextType,User } from "@/types/auth";
const AuthContext=createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){
    const [user,setUser]=useState<AuthContextType["user"]>(null)
    function login(user:User){
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user)
    }
    function logout(){
        localStorage.removeItem("user")
        setUser(null)
    }
    useEffect(() => {
        const savedUser=localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
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