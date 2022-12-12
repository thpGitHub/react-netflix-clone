import { randEmail, randPassword } from '@ngneat/falso';
// const faker = require('@faker-js/faker')
// import * as faker from '@faker-js/faker'

// const user2 = { email: randEmail(), name: randFullName() };

const user = {
    // username: faker.internet.userName(),
    username: randEmail(),
    // username: 'toto',
    // password: faker.internet.password(),
    password: randPassword(),

}
describe('netflix e2e', () => {
    it('netflix User Experience', () => {
      cy.visit('http://localhost:3000/')
      cy.findByRole('button', {name: /Nouveau sur Netflix ?/i}).click()
    })
  })
