import React, { useState, useEffect } from "react"
import axios from "axios"
import numeral from "numeral"
import { useRouter } from "next/router"

export default function CardProduct(props) {
    const [product, setProduct] = useState([])

    const router = useRouter()
    
    const getProduct = async () => {
        await axios({
            method: 'GET',
            url: '/api/product/show'
        }).then((res) => {
            const { products } = res.data
            setProduct(products)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleClickProduct = (id) => {
        router.push(`/product/detail?idItem=${id}`)
    }

    useEffect(()=> {
        getProduct()
    }, [])

    return(
        <div 
            className="w-auto h-auto mb-28" 
            style={{marginTop: `${props.margin}px`}}
        >
            <span className="text-xl">New Product <span className="text-xs pl-3">found new product with special price</span></span>
            <div className="w-full h-auto justify-between flex flex-wrap my-5">
                {product.map(e => {
                    return(
                        <div className="w-60 h-auto drop-shadow-md cursor-pointer bg-white my-5" key={e._id} onClick={() => handleClickProduct(e._id)}>
                            <div className="w-full h-52 bg-contain bg-center bg-no-repeat" style={{backgroundImage: `url(${e.picture})`}}>
                            </div>
                            <div className="w-full h-auto px-5">
                                <div className="w-full truncate">
                                    <span className="">{e.name}</span>
                                </div>
                                <div className="w-full truncate pb-5">
                                    <span className="text-xs text-gray-500">
                                        Rp. {numeral(e.price).format('0,0')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}