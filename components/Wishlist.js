import React, { useContext } from 'react'
import { Drawer } from 'antd'
import numeral from 'numeral'
import { Context } from '../contexs/index'

const CartDetail = (props) => {
    const { show, setShowWishList } = props
    const { state, dispatch } = useContext(Context)

    return (
        <Drawer
            title='Wishlist'
            placement="right"
            visible={show}
            onClose={() => setShowWishList(false)}
        >
            {state?.favorite?.map((item, index) => (
                <div className='w-full h-auto p-1 flex' key={index}>
                <div className='w-2/5 h-28 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: `url(${item.picture})` }}>
                </div>
                <div className='w-3/5 h-auto flex flex-col justify-center pl-1'>
                    <h5 className='text-sm font-semibold'>{item.name}</h5>
                    <span className='text-xs font-light text-gray-400'>
                        Rp. {numeral(item.price).format('0,0')}
                    </span>
                    <span className='text-xs font-light text-gray-400'>Stock {item.stock}</span>
                </div>
            </div>
            ))}
        </Drawer>
    )
}

export default CartDetail