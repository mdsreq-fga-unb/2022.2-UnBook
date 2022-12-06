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

## Estratégia de Testes

#### Tipos de Testes que serão realizados:

- Testes Unitários: serão utilizados para garantir o funcionamento de pequenas unidades da aplicação.
- Testes de Aceitação: serão utilizados para validar com o cliente se cada funcionalidade está atendento aos requisitos propostos.

#### Técnicas e ferramentas que serão utilizadas:

- Testes Unitários: os testes unitários serão realizados com o auxílio das ferramentas Jest e Enzyme.
- Testes de Aceitação: os testes de aceitação serão validados conforme os critérios de aceitação das histórias de usuário e por meio da avaliação dos clientes.

## Estratégia de Refatoração

A refatoração será utilizado com o objetivo de reestruturar o código da aplicação para seguir os princípios do design simples. Para tal, será adotada a prática de revisão dos pull requests criados pelos membros da equipe. Desta forma, os membros poderão sugerir melhorias e apontar duplicações no código.

## Estratégia de Integração Contínua
