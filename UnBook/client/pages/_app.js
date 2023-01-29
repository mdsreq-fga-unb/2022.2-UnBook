import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <head>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <Nav />
            <ToastContainer position="top-center" />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;