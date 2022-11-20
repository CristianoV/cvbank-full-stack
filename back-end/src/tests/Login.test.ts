import {
  login,
  usernameWrong,
  passwordWrong,
  smallUserName,
  smallPassword,
  alphaNumericPassword,
} from './mocks/LoginMocks';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as Sinon from 'sinon';
// import app from '../app';

import User from '../database/models/user';

chai.use(chaiHttp);

describe('Testando rotas', () => {
  describe('Login', () => {
    before(() => {
      Sinon.stub(User, 'findOne').resolves(login as User);
    });

    after(() => {
      Sinon.restore();
    });
    it('Testando login com tudo correto', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/login')
        .send(login);

      chai.expect(response.status).to.be.equal(200);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.be.key('token');
    });
    it('Testando login com usuario errado', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/login')
        .send(usernameWrong);

      chai.expect(response.status).to.be.equal(403);
      chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
    });
    it('Testando login com senha errada', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/login')
        .send(passwordWrong);

      chai.expect(response.status).to.be.equal(403);
      chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'Incorrect email or password',
      });
    });
    it('Testando login com username errado menor que 3 caracteres', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/login')
        .send(smallUserName);

      // chai.expect(response.status).to.be.equal(403);
      // chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'model must be 3 or more characters long',
      });
    });
    it('Testando login com senha errada menor que 8 caracteres', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/login')
        .send(smallPassword);

      // chai.expect(response.status).to.be.equal(403);
      // chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'String must contain at least 8 character(s)',
      });
    });
    it('Testando login com senha faltando validações', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/login')
        .send(alphaNumericPassword);

      // chai.expect(response.status).to.be.equal(403);
      // chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'model must be alphanumeric',
      });
    });
  });
});
