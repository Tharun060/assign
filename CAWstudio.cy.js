describe('Test', ()=>{

    it('HomeTest', ()=>{
        cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html")

        cy.get("summary").should('be.visible').click()

        cy.get("#jsondata").clear()

        cy.wait(4000)

        const jsonData=[
                        {"name" : "Bob", "age" : 20, "gender": "male"}, 
                        {"name": "George", "age" : 42, "gender": "male"},
                        {"name": "Sara", "age" : 42, "gender": "female"}, 
                        {"name": "Conor", "age" : 40, "gender": "male"}, 
                        {"name": "Jennifer", "age" : 42, "gender": "female"}]

        cy.get("#jsondata").type(JSON.stringify(jsonData), {parseSpecialCharSequences: false })

        cy.wait(4000)

        cy.get("#refreshtable").click()

        cy.wait(4000)

        cy.get("#dynamictable tr:nth-child(n+3)").then(($rows)=>{
            expect($rows).to.have.length(jsonData.length)

             cy.get("#dynamictable tr:nth-child(n+3)").each(($row, index)=>{
                const actualData=$row.find('td').map((_, cell)=> Cypress.$(cell).text())
                const expectedData = Object.values(jsonData[index]).map(jsonData)
                expect(actualData).to.equal(expectedData)
             })

             ;
        })


    })
})