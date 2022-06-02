import React, { useContext, useState } from 'react'
import { Drawer } from 'antd'
import { Context } from '../contexs/index'
import numeral from 'numeral'
import { InputNumber } from 'antd';

const CartDetail = (props) => {
    const { show, setShowCart } = props
    const { state, dispatch } = useContext(Context)

    const handleQty = (value, id) => {
        const dataIndex = state.cart.findIndex(e => e._id === id)
        const copyData = state.cart
        copyData[dataIndex].quantityBuy = value
        dispatch({
            type: 'CART_QTY_UPDATE',
            payload: copyData
        })
    }
    
    return (
        <Drawer
            title='Shoping cart'
            placement="right"
            visible={show}
            onClose={() => setShowCart(false)}
        >
            {state.cart.map(e => (
                <div className='w-full h-auto p-1 flex' key={e._id}>
                    <div className='w-2/5 h-28 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: `url(${e.picture})` }}>
                    </div>
                    <div className='w-3/5 h-auto flex flex-col justify-center pl-1'>
                        <h5 className='text-sm font-semibold'>{e.name}</h5>
                        <span className='text-xs font-light text-gray-400'>
                            Rp. {numeral(e.price).format('0,0')}
                        </span>
                        <div className='flex'>
                            <span className='mt-2 text-sm'>Qty</span>
                            <InputNumber 
                                className='mt-2' 
                                size='small' 
                                min={1} 
                                max={e.stock}
                                bordered={false}
                                defaultValue={1}
                                onChange={(value) => handleQty(value,e._id)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </Drawer>
    )
}

export default CartDetail