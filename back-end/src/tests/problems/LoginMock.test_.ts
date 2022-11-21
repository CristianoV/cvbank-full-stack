import {
  login,
  usernameWrong,
  passwordWrong,
  smallUserName,
  smallPassword,
  alphaNumericPassword,
} from '../mocks/LoginMocks';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as Sinon from 'sinon';
import { app } from '../../yapp';
import User from '../../database/models/user';
const teste = 'http://localhost:3333';

chai.use(chaiHttp);

describe('Testando rotas', () => {
  describe('Login', async () => {
    it('Testando login com tudo correto', async () => {
      const response = await chai.request('http://localhost:3333').get('/');

      chai.expect(response.status).to.be.equal(200);
      chai.expect(response.status).to.equal(200);
    });
  });
  it('Testando login com tudo corretox', async () => {
    Sinon.stub(User, 'findOne').resolves(login as User);

    const response = await chai
      .request(teste)
      .post('/login')
      .send(login);

    chai.expect(response.status).to.be.equal(200);
    chai.expect(response.status).to.equal(200);
    chai.expect(response.body).to.be.key('token');
  });
});

// describe('Testando rotas', () => {
// describe('Login', () => {
//   // before(() => {
//   //   Sinon.stub(User, 'findOne').resolves(login as User);
//   // });

//   // after(() => {
//   //   Sinon.restore();
//   // });
//   it('Testando login com tudo correto', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send(login);

//     expect(response.status).to.be.equal(200);
//     expect(response.status).to.equal(200);
//     expect(response.body).to.be.key('token');
//   });
//   it('Testando login com usuario errado', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send(usernameWrong);

//     expect(response.status).to.be.equal(403);
//     expect(response.status).to.equal(403);
//     expect(response.body).to.be.key('error');
//   });
//   it('Testando login com senha errada', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send(passwordWrong);

//     expect(response.status).to.be.equal(403);
//     expect(response.status).to.equal(403);
//     expect(response.body).to.be.key('error');
//     expect(response.body).to.be.deep.equal({
//       error: 'Incorrect email or password',
//     });
//   });
//   it('Testando login com username errado menor que 3 caracteres', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send(smallUserName);

//     // expect(response.status).to.be.equal(403);
//     // expect(response.status).to.equal(403);
//     expect(response.body).to.be.key('error');
//     expect(response.body).to.be.deep.equal({
//       error: 'model must be 3 or more characters long',
//     });
//   });
//   it('Testando login com senha errada menor que 8 caracteres', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send(smallPassword);

//     // expect(response.status).to.be.equal(403);
//     // expect(response.status).to.equal(403);
//     expect(response.body).to.be.key('error');
//     expect(response.body).to.be.deep.equal({
//       error: 'String must contain at least 8 character(s)',
//     });
//   });
//   it('Testando login com senha faltando validações', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send(alphaNumericPassword);

//     // expect(response.status).to.be.equal(403);
//     // expect(response.status).to.equal(403);
//     expect(response.body).to.be.key('error');
//     expect(response.body).to.be.deep.equal({
//       error: 'model must be alphanumeric',
//     });
//   });
// });
// });
