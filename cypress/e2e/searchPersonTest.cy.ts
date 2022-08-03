import SearchPage from '../e2e/pages/searchPage';

describe('Search Person', () => {
  const searchPage = new SearchPage();
  const characterDetailsText = [
    {
      Title:"Luke Skywalker",
      Gender: "male",
      BirthYear: "19BBY",
      EyeColor: "blue",
      SkinColor: "fair"
    },
    {
      Title:"Luminara Unduli",
      Gender: "female",
      BirthYear: "58BBY",
      EyeColor: "blue",
      SkinColor: "yellow"
    },
  ]
  beforeEach(() => {
    cy.visit('/');
  })

  // Verify Application is render successfully
  it('Application should able to render successfully', () => {
    searchPage.elements.headerTitle().should('be.visible').then(($h1) => {
      expect($h1).to.have.text('The Star Wars Search');
    })
    searchPage.elements.queryField().should('be.visible')
    searchPage.elements.searchBtn().should('be.visible')
  })

  it('Search People with Character - Luke Skywalker', () => {
    searchPage.elements.queryField().type('Luke Skywalker');
    searchPage.clickSearch();
    searchPage.elements.headerTitle().should(($h1) => {
      expect($h1).to.have.text('The Star Wars Search');
    })
    verifyDetailsForNthCharacters(searchPage, characterDetailsText);
  })

  
  it('Search People with Character With Multiple Results - lu', () => {
    searchPage.elements.queryField().type('lu');
    searchPage.clickSearch();
    verifyDetailsForNthCharacters(searchPage, characterDetailsText);
  })

  it('Search People with Character Not Found', () => {
    searchPage.elements.queryField().type('Vikas');
    searchPage.clickSearch();
    searchPage.elements.errorMessage().should(($h1) => {
      expect($h1).to.have.text('Not found.');
    })
  })
})

function verifyDetailsForNthCharacters(searchPage: SearchPage, characterDetailsText: { Title: string;Gender: string; BirthYear: string; EyeColor: string; SkinColor: string; }[]) {
  searchPage.elements.characterDetailView().each(($el, index) => {
    //expect($el).to.have.length(2);
    console.log("Index " + $el.index);
    cy.get('.card-subtitle.mb-2.text-muted').eq(index).should('contain', characterDetailsText[index].Title);
    searchPage.elements.characterGenderTxt().eq(index).should('contain', characterDetailsText[index].Gender);
    searchPage.elements.characterBirthYearTxt().eq(index).should('contain', characterDetailsText[index].BirthYear);
    searchPage.elements.characterEyeColorTxt().eq(index).should('contain', characterDetailsText[index].EyeColor);
    searchPage.elements.characterSkinColorTxt().eq(index).should('contain', characterDetailsText[index].SkinColor);
  });
}
