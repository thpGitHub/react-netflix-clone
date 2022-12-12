import {randEmail, randPassword} from '@ngneat/falso'

const user = {
    username: randEmail(),
    password: randPassword(),
}
describe('netflix e2e', () => {
    it('netflix User Experience', () => {
        cy.visit('http://localhost:3000/')
        cy.findByRole('button', {name: /Nouveau sur Netflix ?/i}).click()

        cy.findByRole('dialog').within(() => {
            cy.findByLabelText(/Email ou numéro de téléphone/i).type(
                user.username,
            )
            cy.findByLabelText(/Mot de passe/i).type(user.password)
            cy.findByRole('button', {name: /INSCRIVEZ-VOUS/i}).click()
        })

        cy.findByRole('link', {name: /Series/i}).click()

        cy.findByRole('heading', {name: /Séries tendances Netflix/i}).should(
            'exist',
        )
        cy.findByRole('heading', {name: /Séries les mieux notées/i}).should(
            'exist',
        )
        cy.findByRole('heading', {name: /Les séries populaires/i}).should(
            'exist',
        )
        cy.findByRole('heading', {name: /Les documentaires/i}).should('exist')
        cy.findByRole('heading', {name: /Les séries criminelles/i}).should(
            'exist',
        )
        cy.findByRole('contentinfo').should('exist')

        cy.findByRole('textbox', {name: /search/i}).type('batman{enter}')
        cy.findByRole('listitem', {name: /movie/i}).within(() => {
            cy.findAllByRole('link').should('have.length', 16)
        })
        cy.findByRole('listitem', {name: /tv/i}).within(() => {
            cy.findAllByRole('link').should('have.length', 4)
        })

        cy.findAllByRole('button', {name: /logout/i}).click()

        cy.findByRole('dialog').within(() => {
            cy.findByLabelText(/Email ou numéro de téléphone/i).type(
                user.username,
            )
            cy.findByLabelText(/Mot de passe/i).type(user.password)
            cy.findByRole('button', {name: /CONNEXION/i}).click()
            /**
             * ToDO : when reconnexion we have on route /search/batman
             * should return accueil
             */
        })
    })
})
