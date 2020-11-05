// write tests here
describe('Quotes App Testing', () => {
    beforeEach(() => {
        crypto.visit('http://localhost:1234')
    });

    //helpers to select elements 
    const textInput = () => cy.get('input[name=text');
    const submitBtn = () => cy.get('button[id="submitBtn"]');

    it('should do some basic math', () => {
        expect(1 + 1).to.equal(2);
        expect(1 + 2).not.to.equal(4);
        expect({}).not.to.equal({}); //===
        expect({}).to.eql({}); //==
    });

    it('should display the expected elements', () => {
        textInput().should('exist');
        submitBtn().should('exist');

        authorInput().should('exist');
        cancelBtn().should('exist');
        madeUpBtn().should('not.exist');

        cy.contains('submit Quote').should('exist');
        cy.contains(/submit quote/i).should('exist');
    });

    describe('Filling out inputs and cancelling', () => {
        it('can get to the correct url', () => {
            cy.url().should('include', 'localhost');
        });

        it('submit button should be disabled on initial load', () => {
            submitBtn().should('be.disabled')
        });

        it('should type stuff in the inputs', () => {
            textInput()
                .should('have.value', '')
                .type('Hi how are you?')
                .should('have.value', 'Hi how are you?');

            authorInput()
                .should('have.value', '')
                .type('I am doing well!')
                .should('have.value', 'I am doing well!');
        });

        it('should submit with both inputs filled in', () => {
            textInput().type('Keiran');
            authorInput().type('Kozlowski');
            cancelBtn().click();
            textInput().should('have.value', '');
            authorInput().should('have.value', '');
            submitBtn().should('be.disabled');
        });
    });

    describe('adding quotes', () => {
        it('can submit and delete a quote', () => {
            textInput().type('Kerian');
            authorInput().type('Kozlowski');
            submitBtn().click();

            cy.contains('Keiran').siblings('button:nth-of-type(2)').click();
            cy.contains('Keiran').should('not.exist');
        });
    });

    describe('editing quotes', () => {
        it('can edit a quote', () => {
            textInput().type('Keiran2');
            authorInput().type('Kozlowski2');
            submitBtn().click();

            cy.contains('keiran2').siblings('button:nth-of-type(1)').click();
            textInput().should('have.value', 'keiran2');
            authorInput().should('have.value', 'Kozlowski2');

            textInput().clear().type('I am cool');
            authorInput().clear().type('very much so');
            submitBtn().click();

            cy.contains('I am cool');
        });
    });
});