import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import Register from './register';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <div>
                <link rel="stylesheet" href="/css/styles.css" />
                <link rel="stylesheet" href="/css/home.css" />
            </div>
            <div className='home'>
              <div className='home-nav'>{Component.name !== 'Login' && <Nav />}</div>
              <div className='home-contaimer'>
                <ToastContainer position="top-center" />
                <Component {...pageProps} />
              </div>
            </div>
        </UserProvider>
    )
}

export default MyApp;