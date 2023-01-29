import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  
  const router = useRouter();
  const logout = () => {  
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className={"nav d-flex justify-content-end primary bg-primary"}>
      <Link 
        href="/" 
        className={`nav-link text-light logo ${current ==="/" && "active"}`} 
        data-testid="home-link">
          UnBook
      </Link>

      {state !== null ? (
        <>
          <Link 
            href="/user/dashboard" 
            className={`nav-link text-light ${
                current === "/user/dashboard" && "active"
            }`}>
              {state && state.user && state.user.name}
          </Link>

          <a
            onClick={logout}
            className="nav-link text-light" 
            data-testid="logout-link">
              Sair
          </a>

        </>

      ) : (

        <>
          <Link 
            href="/login" 
            className={`nav-link text-light ${
              current === "/login" && "active"
            }`}
            data-testid="login-link">
              Login
          </Link>

          <Link 
            href="/register" 
            className={`nav-link text-light ${
              current === "/register" && "active"
            }`}
            data-testid="register-link">
              Cadastrar
          </Link>
        </>

      )}


    </nav>

  );
};

export default Nav;
