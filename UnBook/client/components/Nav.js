import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
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
        className="nav-link text-light logo" 
        data-testid="home-link">
          UnBook
      </Link>

      <Link 
        href="/login" 
        className="nav-link active text-light" 
        data-testid="login-link">
          Login
      </Link>

      <Link 
        href="/register" 
        className="nav-link active text-light" 
        data-testid="register-link">
          Cadastrar
      </Link>

      <a
        onClick={logout}
        className="nav-link active text-light" 
        data-testid="logout-link">
          Sair
      </a>
    </nav>

  );
};

export default Nav;
