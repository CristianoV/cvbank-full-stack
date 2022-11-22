import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import 'mocha';
import * as Sinon from 'sinon';
import { app } from '../app';

import User from '../database/models/user';
import Account from '../database/models/account';
import { afterEach } from 'mocha';
import { newAccount, newUsser } from './mocks/RegisterMocks';
import { account } from './mocks/LoginMocks';

chai.use(chaiHttp);

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJ1c2VybmFtZSI6IkNyaXN0aWFub1YiLCJpYXQiOjE2NjkxMTY3NDQsImV4cCI6MTY2OTIwMzE0NH0.wOSWpMNA5BMrPAVLxFo4Tts2hbq2odBwj2SYVuyMDTw';
const token2 =
  'eyJhbG11ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJ1c2VybmFtZSI6IkNyaXN0aWFub1YiLCJpYXQiOjE2NjkxMTY3NDQsImV4cCI6MTY2OTIwMzE0NH0.wOSWpMNA5BMrPAVLxFo4Tts2hbq2odBwj2SYVuyMDTw';

describe('Testando rota de Account', () => {
  describe('Sucesso', () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('Testando Account com tudo correto', async () => {
      Sinon.stub(Account, 'findOne').resolves(account as any);
      Sinon.stub(User, 'findOne').resolves(newUsser as any);
      const response = await chai
        .request(app)
        .get('/account')
        .set({ authorization: token });

      chai.expect(response.status).to.be.equal(202);
      chai.expect(response.status).to.equal(202);
      chai.expect(response.body).to.be.deep.equal({
        id: 1,
        balance: 10000000000000000000000000000,
        user: {
          username: 'Riquinho',
        },
      });
    });
  });
  describe('Falha', () => {
    afterEach(() => {
      Sinon.restore();
    });
    it('Testando Account com tudo correto', async () => {
      const response = await chai
        .request(app)
        .get('/account')
        .set({ authorization: token2 });

      chai.expect(response.status).to.be.equal(400);
      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.be.deep.equal({
        error: 'invalid token',
      });
    });
  });
});
