import React, { useEffect, useState } from "react"
import DetailProduct from "../../components/DetailProduct"
import { useRouter, withRouter } from "next/router"
import axios from "axios"

function Detail({router, idItem}){
    const [product, setProduct] = useState("")

    const getProductDetail = async () => {
        await axios({
            method: 'GET',
            url: `/api/product/${idItem}`
        }).then(res => {
            setProduct(res.data.products)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProductDetail()
    }, [])

    return(
        <div>
            <h1>Home / Detail page / <span className="text-gray-400">{product.name}</span></h1>
            <DetailProduct product={product} />
        </div>
    )
}

Detail.getInitialProps = async ({query}) => {
    const {idItem} = query
    return {idItem}
}

export default withRouter(Detail)