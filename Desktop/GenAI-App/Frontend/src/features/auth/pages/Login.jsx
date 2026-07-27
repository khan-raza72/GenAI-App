import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("") // 🟢 Error message state

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("") // Clear previous errors

        try {
            await handleLogin({ email, password })
            // 🟢 NAVIGATE SIRF TABHI HOGA JAB LOGIN SUCCESSFUL HO!
            navigate('/')
        } catch (err) {
            // 🔴 Error aane par navigate KHABHI nahi hoga
            setError(err.response?.data?.message || err.message || "Invalid Email or Password")
        }
    }

    if (loading) {
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                {/* 🔴 ERROR ALERT SHOW KAREIN */}
                {error && (
                    <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' required />
                    </div>
                    <button className='button primary-button'>Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login