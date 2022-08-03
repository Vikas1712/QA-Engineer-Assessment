import SearchPage from './pages/searchPage';

describe('Search Planet', () => {
  const searchPage = new SearchPage();
  const planetDetailsText = [
    {
      Title: "Felucia",
      Population: 8500000,
      Climate: "hot, humid",
      Gravity: "0.75 standard"
    },
    {
      Title: "Saleucami",
      Population: 1400000000,
      Climate: "hot",
      Gravity: "unknown"
    },
  ]
  beforeEach(() => {
    cy.visit('/');
    searchPage.elements.radioBtnPlanets().click();
  })

  // Verify Application is render successfully
  it('Application should able to render successfully', () => {
    searchPage.elements.headerTitle().should('be.visible').then(($h1) => {
      expect($h1).to.have.text('The Star Wars Search');
    })
    searchPage.elements.queryField().should('be.visible')
    searchPage.elements.searchBtn().should('be.visible')
  })

  it('Search Planet with Character - Felucia ', () => {
    searchPage.elements.queryField().type('Felucia');
    searchPage.clickSearch();
    searchPage.elements.headerTitle().should(($h1) => {
      expect($h1).to.have.text('The Star Wars Search');
    })
    verifyDetailsForNthPlanets(searchPage, planetDetailsText);
  })

  it('Search Planet with Character With Multiple Results - uc', () => {
    searchPage.elements.queryField().type('uc');
    searchPage.clickSearch();
    verifyDetailsForNthPlanets(searchPage, planetDetailsText);
  })

  it('Search Planet with Character Not Found', () => {
    searchPage.elements.queryField().type('Vikas');
    searchPage.clickSearch();
    searchPage.elements.errorMessage().should(($h1) => {
      expect($h1).to.have.text('Not found.');
    })
  })
})

function verifyDetailsForNthPlanets(searchPage: SearchPage, planetDetailsText: { Title: string; Population: number; Climate: string; Gravity: string; }[]) {
  searchPage.elements.planetDetailView().each(($el, index) => {
    console.log("Index " + $el.index);
    cy.get('.card-subtitle.mb-2.text-muted').eq(index).should('contain', planetDetailsText[index].Title);
    searchPage.elements.planetPopulationTxt().eq(index).should('contain', planetDetailsText[index].Population);
    searchPage.elements.planetClimateTxt().eq(index).should('contain', planetDetailsText[index].Climate);
    searchPage.elements.planetGravityTxt().eq(index).should('contain', planetDetailsText[index].Gravity);
  });
}
