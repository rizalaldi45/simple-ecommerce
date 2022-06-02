import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import GoogleButton from 'react-google-button'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const register = async () => {
        await axios({
            method: 'POST',
            url: '/api/user/register',
            data: {name, email, password}
        }).then(()=> {
            router.push('/login')
            toast('Register successfully')
        }).catch(() => {
            toast('Register failed, please try again')
        })
    }

    return(
        <div className="w-1/3 h-auto mx-auto mt-40 text-center mb-24">
            <h5 className='mb-3 text-3xl'>Register</h5>
            <p className='mb-10 text-xs text-gray-400'>Create account and start shoping in our platform</p>
            <input type="text" placeholder="Fullname" value={name} onChange={(e) => setName(e.target.value)} className="py-3 px-4 mb-5 w-full focus:outline-none border-gray-300 border"/>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-3 px-4 mb-5 w-full focus:outline-none border-gray-300 border"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-3 px-4 mb-5 w-full focus:outline-none border-gray-300 border"/>
            <button onClick={register} className="mb-5 w-full py-3 px-2 bg-gray-300 hover:drop-shadow-md">
                Sign up
            </button>
            <div className="mb-5 text-gray-400">Or</div>
            <GoogleButton
                style={{width: '100%'}}
                label="Signup with Google"
                onClick={() => { console.log('Google button clicked') }}
            />
            <p className='mt-7 text-xs text-gray-400'>
                already have account ? &nbsp;
                <Link href="/login" className="text-black">
                    <span className="text-black cursor-pointer">Login</span>
                </Link>
            </p>
        </div>
    )
}

export default Signup