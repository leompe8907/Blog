import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
    } from "firebase/auth";

import { Navigate } from 'react-router-dom';

import { auth } from "../firebase";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        console.log("error de contexto")
    }
    return context
}

export function AuthProvider ({children}){
    const signup = async (email,password) => {
        const response = await createUserWithEmailAndPassword(auth,email,password)
        console.log(response)
    }
    const signin = async (email,password) => {
        const response = await signInWithEmailAndPassword(auth,email,password)
        console.log(response)
    }
    const logout = async () => {
        const response =await signOut(auth)
        console.log(response)
    }
    return (
        <authContext.Provider
            value={{signup,signin,logout}}>
            {children}
        </authContext.Provider>)
}
