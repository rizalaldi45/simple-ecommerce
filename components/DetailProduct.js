import React, { useContext, useState } from 'react'
import Head from 'next/head'
import { Context } from '../contexs/index'
import { toast } from 'react-toastify';
import { useRouter } from "next/router"
import numeral from "numeral"
import axios from 'axios'

const DetailProduct = (props) => {
    const [city, setCity] = useState([])
    const [showListCity, setListCity] = useState(false)
    const [cityInput, setCityInput] = useState("")
    const [courier, setCourier] = useState([])
    const [loading, setLoading] = useState(false)

    const { state, dispatch } = useContext(Context)
    const { _id, picture, name, price, stock, description, weight } = props.product
    const favProduct = state.favorite?.find(e => e._id === _id)
    const router = useRouter()

    const handleFavoriteProduct = async () => {
        if (state === null) router.push('/login')
        await axios({
            method: 'POST',
            url:`/api/user/${state.user?._id}/favorite/${_id}`,
            withCredentials: true,
        }).then((res) => {
            const { message } = res.data.data
            dispatch({
                type: 'FAV_PRODUCT',
                payload: res.data.data.user.favorite,
            })
            dispatch({
                type: 'LOGIN',
                payload: res.data.data.user,
            })
            localStorage.setItem('USER_PROFILE', JSON.stringify(res.data.data.user))
            toast(message)
        }).catch((err) => {
            console.log(err)
        }) 
    }

    const handleBuyProduct = () => {
        if (state.user === null){
            router.push('/login')
        }
    }

    const handleSearchDestination = async (e) => {
        if (e.target.value.length === 0) return  setListCity(false), setCityInput("")

        setCityInput(e.target.value)
        setListCity(true)
        setLoading(true)
        await axios({
            method: 'POST',
            url: '/api/user/city',
            data: {city: cityInput}
        }).then(res => {
            setCity(res.data.city)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleCostShipping =  async (id_city, city_name) => {
        setCityInput(city_name)
        setListCity(false)
        setLoading(true)
        await axios({
            method: 'POST',
            url: '/api/product/shipping',
            data: {city: id_city, weight}
        }).then(res => {
            setCourier(res.data.rajaongkir.results)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleAddToCart = () => {
        const find = state.cart.find(e => e._id === props.product._id)
        console.log(find)
        if (!find) {
            dispatch({
                type: 'CART',
                payload: props.product,
            })
            toast('Success add to cart')
        } else toast('Same product already on cart')
    }

    return (
        <div>
            <Head>
                <title>{name}</title>
                <meta property={`og:${name}`} content={name} key={name} />
            </Head>
            <div className="block md:flex justify-between mt-14 mb-28">
                <div className="w-full md:w-3/6 h-96 bg-contain bg-center bg-no-repeat" style={{backgroundImage: `url(${picture})`}}>
                    <img 
                        className="absolute cursor-pointer" 
                        src='/images/heart.png' 
                        style={{opacity: (favProduct ? 1 : 0.4)}}
                        width={35} height={35} 
                        onClick={handleFavoriteProduct}
                    />
                </div>
                <div className="w-full md:w-3/6 h-auto">
                    <h3 className="text-2xl">{name}</h3>
                    <p className="text-lg mt-4">Rp.{numeral(price).format('0,0')} </p>
                    <p className="text-gray-400 mt-3 text-md">Stock {stock}</p>
                    <h3 className="text-gray-400 mt-5 text-md">Weight {weight} gram</h3>

                    <h3 className="text-justify md:text-left text-sm mt-5 leading-loose">{description}</h3>
                    <div className="block lg:flex">
                        <div className="flex items-baseline">
                            <div>
                                <span className='mr-5'>Quantity</span>
                            </div>
                            <div>
                                <input 
                                    type="number" 
                                    defaultValue={1} min={1} max={stock} 
                                    className="text-center px-2 mt-5 mb-5 mr-10 h-10 w-24 focus:outline-none border-gray-300 border-b"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline">
                            <div>
                                <span className='mr-5'>Destination</span>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <input 
                                            type="text" 
                                            placeholder="city"
                                            value={cityInput}
                                            onChange={handleSearchDestination} 
                                            className="text-center px-2 mt-5 mb-5 mr-10 h-10 w-28 focus:outline-none border-gray-300 border-b"
                                        />
                                    </li>
                                    <ul>
                                        <li>
                                            {showListCity && (
                                                <div className='fixed z-20 w-40 flex-wrap max-h-72 p-3 bg-white drop-shadow-md overflow-y-auto'>
                                                    {city.map((e,i) => {
                                                        return <div 
                                                            className="py-2 px-2 text-sm hover:bg-gray-100" 
                                                            key={i} 
                                                            onClick={() => handleCostShipping(e.city_id, e.city_name)}
                                                        >
                                                            {e.city_name}
                                                        </div>
                                                    })}
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                            {loading && (
                                <div>
                                    <img className='animate-spin' src='/images/waiting.png' width="13" height="13" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        {courier.map((e) => {
                            return (
                                e.costs.map((item) => {
                                    return (
                                        item.cost.map((cost, indx) => {
                                            return (
                                                <button key={indx} className="mt-5 w-48/100 p-4 border border-gray-300 text-left focus:outline-none focus:border-red-300 cursor-pointer">
                                                    <h5>{e.name} - {item.service}</h5> 
                                                    <p className="text-xs mt-1 text-gray-400">Rp. {numeral(cost.value).format('0,0')}</p>
                                                    <p className="text-xs mt-1 text-gray-400">Est {cost.etd} days</p>                   
                                                </button>
                                            )
                                        })
                                    )
                                })
                            )
                        })}
                    </div>                               
                    <div className='mb-5 md:mb-0'>
                        <button className="mt-8 w-auto py-3 px-2 mr-5 bg-gray-300 py-2 px-7 bg-black text-white hover:drop-shadow-md" onClick={handleBuyProduct}>
                            Buy Now
                        </button>
                        <button className="mt-8 w-auto py-3 px-2 bg-gray-300 py-2 px-7 bg-black text-white hover:drop-shadow-md" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct