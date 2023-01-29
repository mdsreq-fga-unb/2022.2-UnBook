import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div>
                <link rel="stylesheet" href="/css/styles.css" />
            </div>
            <Nav />
            <ToastContainer position="top-center" />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;