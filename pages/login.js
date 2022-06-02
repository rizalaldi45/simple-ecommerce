import React, { useState, useContext } from 'react'
import { Context } from '../contexs/index'
import axios from 'axios'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify';
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { state, dispatch } = useContext(Context)
    const router = useRouter()
    
    const handleLogin = async () => {
        await axios({
            method: 'POST',
            url: '/api/user/signin',
            data: {email, password}
        }).then((res) => {
            console.log(res)
            const { user } = res.data
            dispatch({
                type: 'LOGIN',
                payload: user,
            })
            localStorage.setItem('USER_PROFILE', JSON.stringify(user))
            toast('Login successfully')
            router.push('/')
        }).catch(() => {
            toast('Login failed')
        })
    }

    return(
        <div className="w-1/3 h-auto mx-auto mt-40 text-center mb-24">
            <h5 className='mb-3 text-3xl'>Login</h5>
            <p className='mb-10 text-xs text-gray-400'>Login and start shoping in our platform</p>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-3 px-4 mb-5 w-full focus:outline-none border-gray-300 border"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-3 px-4 mb-5 w-full focus:outline-none border-gray-300 border"/>
            <button onClick={handleLogin} className="mb-5 w-full py-3 px-2 bg-gray-300 hover:drop-shadow-md">
                Signin
            </button>
            <div className="mb-5 text-gray-400">Or</div>
            <GoogleButton
                style={{width: '100%'}}
                label="Login with Google"
                onClick={() => { console.log('Google button clicked') }}
            />
            <p className='mt-7 text-xs text-gray-400'>
                dont have any account ? &nbsp;
                <Link href="/signup">
                    <span className="text-black cursor-pointer">Signup</span>
                </Link>
            </p>
        </div>
    )
}

export default Login