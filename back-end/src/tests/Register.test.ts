import {
  newAccount,
  newUsser,
  register,
  smallUserName,
  smallPassword,
  alphaNumericPassword,
} from './mocks/RegisterMocks';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import 'mocha';
import * as Sinon from 'sinon';
import { app } from '../app';

import User from '../database/models/user';
import Account from '../database/models/account';

import { afterEach } from 'mocha';

chai.use(chaiHttp);

describe('Testando rota de Registro', () => {
  describe('Sucesso', () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('Testando register com tudo correto', async () => {
      Sinon.stub(User, 'findOne').returns(Promise.resolve(null));
      Sinon.stub(User, 'create').returns(newUsser as any);
      Sinon.stub(Account, 'create').returns(newAccount as any);
      const response = await chai.request(app).post('/register').send(register);

      chai.expect(response.status).to.be.equal(201);
      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.be.key('token');
    });
  });
  describe('Falha', () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('Testando register com username errado menor que 3 caracteres', async () => {
      Sinon.stub(User, 'findOne').returns(Promise.resolve(null));
      const response = await chai
        .request(app)
        .post('/register')
        .send(smallUserName);

      chai.expect(response.status).to.be.equal(400);
      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'model must be 3 or more characters long',
      });
    });
    it('Testando register com senha errada menor que 8 caracteres', async () => {
      Sinon.stub(User, 'findOne').returns(Promise.resolve(null));
      const response = await chai
        .request(app)
        .post('/register')
        .send(smallPassword);

      chai.expect(response.status).to.be.equal(400);
      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'String must contain at least 8 character(s)',
      });
    });
    it('Testando register com senha faltando validações', async () => {
      Sinon.stub(User, 'findOne').returns(Promise.resolve(null));
      const response = await chai
        .request(app)
        .post('/register')
        .send(alphaNumericPassword);

      chai.expect(response.status).to.be.equal(400);
      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'model must be alphanumeric',
      });
    });
  });
});
