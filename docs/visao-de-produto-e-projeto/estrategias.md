# Estratégias de Implementação

## Histórico de Revisão

| Data       | Versão | Descrição                                                                          | Autor(es)                                                                                                                                                                                                                                                  |
| ---------- | ------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 05/12/2022 | 1.0    | Primeira das estragégias de Design Simples, TDD, Refatoração e Integração Contínua | [Ana Beatriz](https://github.com/AnaBeatrizMassuh), [Gabriel Cabral](https://github.com/GabriellCabrall), [Lucas Borba](https://github.com/LBorba00), [Maciel Júnior](https://github.com/macieljuniormax), [Pedro Campos](https://github.com/pedrocampos0) |

## Estratégia de Design Simples

O Design Simples é uma técnica utilizada para simplificar o desenvolvimento de software em qualquer fase de sua evolução. Sua premissa é que o sistema desenvolvido seja produzido da maneira mais simples e clara possível, de forma que possa ser entendido e continuado por qualquer membro da equipe. A partir desse conceito, para assegurar a prática do design simples, adotaremos as seguintes estratégias:

- Procurar resolver os problemas de forma simples
- Realizar refatoração para evitar duplicidade de código e melhorar códigos existentes
- Evitar adicionar funcionalidades ao código até que elas sejam necessárias
- Realizar adições e alterações no código apenas baseando-se nas histórias de usuário

## Estratégia de Integração Contínua

#### Ferramentas para integração contínua

- A ferramenta a ser utilizada é o Github Actions.

#### Técnicas para integração contínua

- Testes automatizados;
- Construção com ritimo sustentável porem ágil;
- Integrações simples e rápidas;
- Progresso constante e demonstrável.

## Estratégia de Testes

#### Tipos de testes que serão realizados:

- Funcionais: para verificar se aplicação faz o que ela é proposta para executar
- Usabilidade: para verificar se o usuário consegue entender e fazer uso da aplicação conforme acordado com os clientes e a equipe

#### Níveis de testes que serão realizados:

- Testes Unitários: serão utilizados para garantir o funcionamento de pequenas unidades da aplicação
- Testes de Sistema: serão utilizados para testar o comportamento do sistema como um todo, simulando a utilização real
- Testes de Aceitação: serão utilizados para validar com o cliente se cada funcionalidade está atendento aos requisitos propostos

#### Técnicas e ferramentas que serão utilizadas:

- TDD: os testes serão realizados com o auxílio das ferramentas Jest e Enzyme
- Testes Manuais: utilizaremos para verificar se as funcionalidades estão funcionando conforme o esperado

#### Execução dos testes

- Os testes unitários serão feitos pelo par após a codificação da funcionalidade para verificar se a funcionalidade está de acordo com a user story, portanto o teste será realizado durante a sprint;
- Os testes de sistema serão realizados pela equipe após a integração para verificar se o produto está se comportando como esperado, portanto o teste será realizado durante a sprint;
- Os testes de aceitação serão realizados pelo cliente e também pela equipe com o objetivo de verificar se o produto está de acordo com as especificações do cliente, portanto este teste será realizado sempre após os testes unitários e os de sistemas.

## Estratégia de Refatoração

A refatoração será utilizado com o objetivo de reestruturar o código da aplicação para seguir os princípios do design simples. Para tal, será adotada a prática de revisão dos pull requests criados pelos membros da equipe. Desta forma, os membros poderão sugerir melhorias e apontar duplicações no código.
