class SearchPage {

    elements = {
      headerTitle: () => cy.get("[data-auto-id='header']"),   
      searchDetailView:()=> cy.get("[data-auto-id='search-detail-view']"), 
      queryField: () => cy.get("#query"),
      searchBtn: () => cy.get("[data-auto-id='search-button']"),
      radioBtnPlanets:()=> cy.get("#planets"),
      radioBtnPeople:()=> cy.get("#people"),
      characterDetailView:()=> cy.get("[data-auto-id='character-detail-view']"),  
      characterGenderTxt: () => cy.get("[data-auto-id='character-gender']"),
      characterBirthYearTxt: () => cy.get("[data-auto-id='character-birth_year']"),
      characterEyeColorTxt: () => cy.get("[data-auto-id='character-eye_color']"),
      characterSkinColorTxt: () => cy.get("[data-auto-id='character-skin_color']"),
      errorMessage: () => cy.get("[data-auto-id='errorNotFound']"),
      planetDetailView: ()=> cy.get("[data-auto-id='planet-detail-view']"),
      planetPopulationTxt: () => cy.get("[data-auto-id='planet-population']"),
      planetClimateTxt: () => cy.get("[data-auto-id='planet-climate']"),
      planetGravityTxt: () => cy.get("[data-auto-id='planet-gravity']"),
    };
  
    typeQueryText(typeQueryText) {
      this.elements.queryField().type(typeQueryText);
    }
  
    clickSearch() {
      this.elements.searchBtn().click();
    }
}
export default SearchPage;