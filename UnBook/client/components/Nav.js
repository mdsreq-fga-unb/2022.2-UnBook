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
    <nav className={"nav d-flex justify-content-end primary bg-primary"}
      style={{backgroundColor: "blue"}}
    >

      <Link 
        href="/" 
        className={`nav-link logo ${current ==="/" && "active"}`} 
        data-testid="home-link">
          UnBook
      </Link>


      {state !== null ? (
        <>
          <div className="dropdown">
            <a 
              className="btn dropdown-toggle text_light" 
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>

            <ul className="dropdown-menu">
              <li>
                <Link 
                  href="/user/dashboard" 
                  className={`nav-link dropdown-item ${
                    current === "/user/dashboard" && "active"
                  }`}>
                    Feed
                </Link>
              </li>
              <li>
                <Link 
                  href="/user/profile/update" 
                  className={`nav-link dropdown-item ${
                    current === "/user/profile/update" && "active"
                  }`}>
                    Perfil
                </Link>
              </li>
              {state.user.role === "Admin" && (
                <li>
                <Link 
                  href="/admin" 
                  className={`nav-link dropdown-item ${
                    current === "/admin" && "active"
                  }`}>
                    Admin
                </Link>
              </li>
              )}

              <li>
                <a
                  onClick={logout}
                  className="nav-link" 
                  data-testid="logout-link">
                    Sair
               </a>
              </li>
            </ul>
          </div>
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
