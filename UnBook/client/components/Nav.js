import Link from "next/link";

const Nav = () => {
  return (
    <nav className={"nav d-flex justify-content-end primary bg-primary"}>
      <Link href="/" className="nav-link text-light" data-testid="home-link">Página Inicial</Link>
      <Link href="/login" className="nav-link active text-light" data-testid="login-link">Login</Link>
      <Link href="/register" className="nav-link active text-light" data-testid="register-link">Cadastrar</Link>
    </nav>

  );
};

export default Nav;
