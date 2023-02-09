import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import { imageSource } from "../functions/index";
import { UilEstate, UilUserCheck, UilThLarge, UilUserSquare, UilPower } from '@iconscout/react-unicons'



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
    <>
      {state !== null && (
        <div className="profile-header">
          <div className='profile-header-image'>
            <Avatar size={100} src={imageSource(state.user)} />
          </div>
          <div className='profile-header-name'>
            {state.user.name}
          </div>
        </div>
      )}
      <nav className="nav">
        <div className="nav-links">
      <div className='nav-link'>
          <UilEstate className={`${current === "/" && "active"} input-icon-nav`}  size="2rem" />
          <Link 
            href="/" 
            className={`${current === "/" && "active"}`} 
            data-testid="home-link">
              Home
          </Link>
          </div>
          {state !== null ? (
            <>
            <div className='nav-link'>
                <UilThLarge className={`${current === "/user/dashboard" && "active"} input-icon-nav`} size="2rem" />
                <Link 
                  href="/user/dashboard" 
                  className={`${current === "/user/dashboard" && "active"}`}>
                    Dashboard
                </Link>
              </div>
              <div className='nav-link'>
              <UilUserSquare className={`${current === "/user/profile/update" && "active"} input-icon-nav`} size="2rem" />
                <Link 
                  href="/user/profile/update" 
                  className={`${current === "/user/profile/update" && "active"}`}>
                    Perfil
                </Link>
              </div>
              {state.user.role === "Admin" && (
                <div className='nav-link'>
                  <UilUserCheck className={`${current === "/user/profile/update" && "active"} input-icon-nav`} size="2rem" />
                  <Link 
                    href="/admin" 
                    className={`${current === "/admin" && "active"}`}>
                      Admin
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`nav-link text-light ${current === "/login" && "active"}`}
                data-testid="login-link">
                  Login
              </Link>
    
              <Link 
                href="/register" 
                className={`nav-link text-light ${current === "/register" && "active"}`}
                data-testid="register-link">
                  Cadastrar
              </Link>
            </>
          )}
        </div>
        {state !== null && (
          <div className='nav-link'>
          <UilPower className={`${current === "/" && "active"} input-icon-nav`} size="2rem" />
          <a
            onClick={logout}
            className="nav-link" 
            data-testid="logout-link">
              Sair
          </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
