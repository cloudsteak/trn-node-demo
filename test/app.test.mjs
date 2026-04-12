import assert from 'assert';
import { expect } from 'chai';
import request from 'supertest';

// Use dynamic import if app.js is CommonJS, or static import if ES module
import app from '../app.js';

describe('Unit test: Nyitó oldal', () => {
  it('Oldal nyitás sikeres (HTTP 200)', () => {
    return request(app)
      .get('/')
      .then((response) => {
        assert.equal(response.status, 200);
      });
  });

  it('Oldalon szerepel az "felhő" szó', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('felhő');
      });
  });

  it('A válasz Content-Type értéke text/html', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.headers['content-type']).to.include('text/html');
      });
  });

  it('Az oldal tartalmazza az aktuális évet', () => {
    const currentYear = new Date().getFullYear().toString();
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain(currentYear);
      });
  });

  it('Oldalon szerepel a "NodeJS Verzió:" felirat', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('NodeJS Verzió:');
      });
  });

  it('Oldalon szerepel a "Szerver neve:" felirat', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('Szerver neve:');
      });
  });

  it('A válasz tartalmaz X-Powered-By fejlécet', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.headers).to.have.property('x-powered-by');
      });
  });
});

describe('Unit test: Nem létező oldal', () => {
  it('Nem létező oldal 404-es hibát ad vissza', () => {
    return request(app)
      .get('/nem-letezik')
      .then((response) => {
        assert.equal(response.status, 404);
      });
  });

  it('A 404-es válasz szövege tartalmaz "Not Found" szöveget', () => {
    return request(app)
      .get('/nem-letezik')
      .then((response) => {
        expect(response.text).to.contain('Not Found');
      });
  });
});
