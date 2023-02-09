<p>
  <span style="font-size: 50px;">Padrão de Design UnBook</span>
  <img src="../img/logo_UnBook.png" width="80px" height="80px" style="display: inline-block; vertical-align: bottom;">
</p>

## Introdução

Bem-vindo ao Padrão de Design UnBook! Neste documento, estão inseridas informações detalhadas sobre a paleta de cores, os componentes e as páginas utilizadas na criação do nosso aplicativo.

A paleta de cores é composta por branco, azul, azul claro e cinza, que são as cores-chave para a criação de um visual coerente e harmonioso. Além disso, o documento apresenta uma descrição detalhada dos componentes da barra superior, do Feed HomePage e do Feed do usuário, da coluna lateral, da postagem, dos comentários, da paginação, das páginas de perfil do usuário, de login e de cadastro.

Informações adicionais, como a responsividade das páginas e a recuperação da senha, também estão incluídas. É importante seguir estes padrões para garantir que o aplicativo tenha uma aparência uniforme e seja fácil de usar para os usuários.

## Paleta de cores

### Brancos

`#FFFFFF`

### Azul

`#2A8BF2`

### Azul claro
 `#60A9F6`

### Cinza
 `#444`
 

## Componentes
### Barra superior
- Barra superior fixa
- Botão UnBook → Homepage
- Botão com o nome do usuário logado → Dropdown
- Dropdown do usuário logado → Feed, Perfil, Sair
- Feed → Feed do usuário
- Perfil → Perfil do usuário (página de edição)
- Sair → Logout do usuário

### Feed HomePage e Feed do usuário
- Feed responsivo ao tamanho da tela
- Componente para postagem → Escrever postagem, botões para estilizar a escrita
- Botão de postar → Trigger de postagem
- Botão de câmero → Adicionar imagem

#### Coluna lateral
- Coluna lateral responsiva ao tamanho da tela
- Barra de pesquisa → Pesquisa de usuários
- Botão Pesquisar → Trigger da pesquisa
- Botão de Seguir → Seguir usuário
- Nome do usuário

#### Postagem
- Nome do usuário
- Foto do usuário
- Data da postagem
- Texto da postagem
- Botão de excluir postagem → Excluir postagem
- Botão de editar postagem → Editar postagem
- Botão de curtir → Curtir postagem
- Botão de comentar → Comentar na postagem
- Scroll de comentários → Comentários da postagem

#### Comentário
- Formulário para comentário:
→ Escrever comentário
→ Botão de Enviar
→ Botão de sair
- Comtário adicionado:
→ Nome do usuário
→ Foto do usuário
→ Botão de excluir comentário 

#### Paginação
- Botão de voltar
- Botão de avançar
- Número da página

### Perfil do usuário (forms)
- Foto de perfil
- Nome do usuário
- Botão de enviar edições do perfil
- Sobre
- Email
- Senha
- Botão de excluir conta
- Pergunta de segurança
- Resposta de segurança

### Login (forms)
- Email
- Senha
- Botão de entrar

### Cadastro (forms)
- Nome
- Email
- Senha
- Pergunta de segurança
- Resposta de segurança
- Botão de cadastrar

### Informações adicionais
- As páginas de login e cadastro devem ter um botão para cada uma delas, para que o usuário possa ir para a página desejada. E elas passam uma ideia de homogêneidade, pois possuem o mesmo layout e a responsividade é a mesma.

- As perguntas de segurança são para que o usuário possa recuperar a senha caso esqueça e são pré-definidas.

- Ambos os feeds possuem uma barra de scroll e a mesma estrutura. No entanto o feed da homepage deve ser preenchido com as postagens de todos os usuários, enquanto o feed do usuário deve ser preenchido com as postagens do usuário logado.