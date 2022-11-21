import {
  register,
  smallUserName,
  smallPassword,
  alphaNumericPassword,
} from './mocks/RegisterMocks';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testando rotas', () => {
  describe('register', () => {
    it('Testando register com username errado menor que 3 caracteres', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/register')
        .send(smallUserName);

      // chai.expect(response.status).to.be.equal(403);
      // chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'model must be 3 or more characters long',
      });
    });
    it('Testando register com senha errada menor que 8 caracteres', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/register')
        .send(smallPassword);

      // chai.expect(response.status).to.be.equal(403);
      // chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'String must contain at least 8 character(s)',
      });
    });
    it('Testando register com senha faltando validações', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/register')
        .send(alphaNumericPassword);

      // chai.expect(response.status).to.be.equal(403);
      // chai.expect(response.status).to.equal(403);
      chai.expect(response.body).to.be.key('error');
      chai.expect(response.body).to.be.deep.equal({
        error: 'model must be alphanumeric',
      });
    });
    it('Testando register com tudo correto', async () => {
      const response = await chai
        .request('http://localhost:3333')
        .post('/register')
        .send(register);

      chai.expect(response.status).to.be.equal(201);
      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.be.key('token');
    });
  });
});
