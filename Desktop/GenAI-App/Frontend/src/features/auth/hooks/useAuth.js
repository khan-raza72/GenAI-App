
import { useState } from "react";
import { createContext } from "react";

import { AuthContext } from "../auth.context.jsx";
import { useContext, useEffect } from "react";
// useContext -> context (global box) se data padhne ke liye
// useEffect  -> component load hote hi kuch code chalane ke liye


// wo global box jisme user, setUser, loading, setLoading store hai

import { login, register, logout, getMe } from "../services/auth.api";
// backend ko call karne wale 4 functions (auth.api.js se aaye)



export const useAuth = () => {
// ye custom hook hai - jo bhi component isse call karega,
// usse login/register/logout ka pura ready-made logic milega

    const context = useContext(AuthContext)
    // AuthContext box se current value nikali

    const { user, setUser, loading, setLoading } = context
    // us box se 4 cheezein alag-alag nikal li:
    // user       -> abhi kaun login hai
    // setUser    -> user ko update karne ka function
    // loading    -> process chal raha hai kya
    // setLoading -> loading on/off karne ka function


    const handleLogin = async ({ email, password }) => {
    // login karne ka function - Login.jsx isse call karega

        setLoading(true)
        // 1. login shuru - loading screen ON

        try {
            const data = await login({ email, password })
            // 2. auth.api.js ka login() call - backend ko request gayi

            setUser(data.user)
            // 3. backend se mila user data -> global state mein save
        } catch (err) {

            // 4. agar error aaya (galat password etc) -> console mein print
        } finally {
            setLoading(false)
            // 5. chahe kuch bhi ho, loading OFF kar do
        }
    }

    const handleRegister = async ({ username, email, password }) => {
    // naya account banane ka function - Register.jsx isse call karega
    // bilkul handleLogin jaisa pattern, bas register() API call hoti hai

        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            // register hote hi turant user ko login state mein daal diya
        } catch (err) {
    
        } finally {
            setLoading(false)
        }
    }

   // AuthContext / useAuth ke andar:
const handleLogout = async () => {
    try {
        // Backend cookie remove API call (Optional if using API)
        // await logoutUser(); 
    } catch (err) {
        console.error("Logout failed", err);
    } finally {
        setUser(null); // Clear User State
        localStorage.clear(); // Clear local storage token
    }
}

   useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])


    return { user, loading, handleRegister, handleLogin, handleLogout }
    // ye sab bahar return kiya taaki koi bhi component
    // "const { handleLogin, loading } = useAuth()" likh ke seedha use kare
}

export default useAuth