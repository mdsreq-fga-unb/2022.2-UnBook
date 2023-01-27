const Register = () => {
  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1>Página de Cadastro</h1>
        </div>
      </div>

      <div class="row py-5">
        <div class="d-flex justify-content-center">
          <form>
            <div className="form-group py-2">
              <label className="text-muted"><small>Nome</small></label>
              <input type="text" className="form-control" placeholder="Digite seu nome" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>E-mail</small></label>
              <input type="email" className="form-control" placeholder="Digite seu e-mail" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Nome</small></label>
              <input type="password" className="form-control" placeholder="Digite sua senha" />
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Nome</small></label>
              <select className="form-control">
                <option>Qual é sua cor favorita?</option>
                <option>Qual é o nome do seu melhor amigo?</option>
                <option>Qual é sua comida favorita?</option>
              </select>
              <small className="form-text text-muted">
                Voê pode usar esta resposta para recuperar sua senha, se esquecer.
              </small>
            </div>

            <div className="form-group py-2">
              <label className="text-muted"><small>Resposta</small></label>
              <input type="text" className="form-control" placeholder="Digite sua resposta aqui" />
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