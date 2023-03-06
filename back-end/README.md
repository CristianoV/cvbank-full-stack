<h1 align="center">
Projeto CVBANK Back-End
</h1>

## :man_technologist: Tecnologias, bibliotecas e arquiteturas usadas
  * __Express__
  * __Postgress__
  * __Sequelize__
  * __Zod__
  * __Typescript__
  * __Jonwebtoken__
  * __Bcryptjs__
  * __Mocha__
  * __chai__
  * __Sinon__
  
# Instruções da aplicação

### Caso você não tenha Postgress, pode usar apenas o docker do banco
```
cd back-end
npm i
npm run docker
```

### Iniciar Projeto sem Docker
```
cd back-end
npm i
npm start
```

### Rodar Testes
```
cd back-end
npm test
```


## Documentação da API

#### Login no banco

```http
  POST /login
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Usuario do Login  |
| `password` | `string` | **Obrigatório**. senha do Login  |

#### Registro no banco

```http
  POST /register
```
| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Usuario para Registro  |
| `password` | `string` | **Obrigatório**. senha para Registro  |

#### Saldo da conta

```http
  GET /account
```

| Header   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `authorization`      | `string` | **Obrigatório**. token JWT disponibilizado ao fazer login |

#### fazer uma transação

```http
  POST /transaction
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username` | `string` | **Obrigatório**. Usuario para quem sera transferido dinheiro |
| `value`      | `number` | **Obrigatório**. O valor no qual sera transferido em centavos (R$) |


| Header   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `authorization`      | `string` | **Obrigatório**. token JWT disponibilizado ao fazer login |

#### Todas transações de um usuario

```http
  GET /transaction/all
```

| Header   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `authorization`      | `string` | **Obrigatório**. token JWT disponibilizado ao fazer login |

#### Transações de um usuario filtrado por data de transação e/ou transações do tipo cash-in/cash-out;

```http
  POST /transaction/filter
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `date`      | `string` | **Obrigatório**. Data em que deseja filtrar as transações |
| `type`      | `string` | Opcional. O tipo que transação que deseja filtrar que pode ser nulla tbm |

| Header   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `authorization`      | `string` | **Obrigatório**. token JWT disponibilizado ao fazer login |
