import Link from "next/link";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../contexs";
import { toast } from 'react-toastify';
import CartDetail from "./CartDetail";
import Wishlist from './Wishlist'

export default function Navbar() {
  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishList] = useState(false)
  const { state, dispatch } = useContext(Context)

  const handleLogout = async () => {
    const { data } = await axios.get('/api/user/signout')
    localStorage.removeItem('USER_PROFILE');
    toast(data.message)
    dispatch({
        type: 'LOGOUT'
    })
  }
  
  return (
    <h1 className="w-full h-20 flex justify-center items-center">
        <div className="w-7/12 flex justify-between">
            <div>
                <Link href='/'>
                    <span className='text-lg font-extrabold'>Shopping.io</span>
                </Link>
            </div>
            <div>
                <div>
                    {state.user === null ? (
                        <Link href='/login' className="cursor-pointer">Login</Link>
                    ) : (
                        <ul className="w-wuto flex justify-between">
                            <li className="mr-4 text-gray-300">{state.user?.name}</li>
                            <li className="mr-4">
                                <ul
                                    className="cursor-pointer"
                                    onClick={() => setShowWishList(true)}
                                >
                                    wishlist
                                </ul>
                                <ul><Wishlist show={showWishlist} setShowWishList={setShowWishList} /></ul>
                            </li>
                            <li className="mr-6">
                                <ul 
                                    className="cursor-pointer"
                                    onClick={() => setShowCart(true)}
                                >
                                    cart
                                </ul>
                                <ul><CartDetail show={showCart} setShowCart={setShowCart} /></ul>
                            </li>
                            <li className="cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    </h1>
  );
}
