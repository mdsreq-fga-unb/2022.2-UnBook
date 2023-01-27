import Link from "next/link";

const Nav = () => {
  return (
    <nav className={"nav d-flex justify-content-end primary bg-primary"}>
      <Link href="/" className="nav-link text-light">Página Inicial</Link>
      <Link href="/login" className="nav-link active text-light">Entrar</Link>
      <Link href="/register" className="nav-link active text-light">Cadastrar</Link>
    </nav>

  );
};

export default Nav;