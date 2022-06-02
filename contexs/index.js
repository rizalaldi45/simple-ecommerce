import { useReducer, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const initialState = {
    user: null,
    cart: [],
    favorite: null,
}

const Context = createContext()

const rootReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT': 
            return {...state, user: null}
        case 'FAV_PRODUCT':
            return {...state, favorite: action.payload}
        case 'CART':
            return {...state, cart: [...state.cart, action.payload]}
        case 'CART_QTY_UPDATE':
            return {...state, cart: action.payload}
        default:
            return state
    }
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    const router = useRouter()

    useEffect(() => {
        const dataUser = localStorage.getItem('USER_PROFILE')
        const data = JSON.parse(dataUser)
        dispatch({
            type: 'LOGIN',
            payload: data
        })
        dispatch({
            type: 'FAV_PRODUCT',
            payload: data?.favorite
        })
    }, [])

    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
          const { status } = error.response
          if (status === 401) {
              localStorage.removeItem('USER_PROFILE')
              dispatch({
                  type: 'LOGOUT'
              })
              router.push('/login')
          }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      });

    return(
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider}