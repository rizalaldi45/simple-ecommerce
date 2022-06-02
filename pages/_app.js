import 'antd/dist/antd.css'
import '../styles/global.css'
import { Provider } from '../contexs/index';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    return(
        <Provider>
            <ToastContainer position="bottom-center" />
            <Navbar />
            <div className="w-7/12 h-auto mx-auto">
                <Component {...pageProps} />
            </div>
            {/* <Footer /> */}
        </Provider>
    )
}

export default MyApp