import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, secret });
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1>Página de Cadastro</h1>
        </div>
      </div>

      <div class="row py-5">
        <div class="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group py-2">
              <label className="text-muted"><small>Nome</small></label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text" className="form-control"
                placeholder="Digite seu nome" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>E-mail</small></label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Digite seu e-mail" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Senha</small></label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" className="form-control"
                placeholder="Digite sua senha" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Nome</small></label>
              <select className="form-control">
                <option>Qual é sua cor favorita?</option>
                <option>Qual é o nome do seu melhor amigo?</option>
                <option>Qual é sua comida favorita?</option>
              </select>
              <small className="form-text text-muted">
                Você pode usar esta resposta para recuperar sua senha, se esquecer.
              </small>
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Resposta</small></label>
              <input
                value={secret}
                onChange={e => setSecret(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Digite sua resposta aqui" />
            </div>

            <div>
              <button className="btn btn-primary col-12">Cadastrar</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;