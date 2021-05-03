describe("Google homepage test", () => {
  const searchTerm = "my search term";

  beforeEach(() => {
    cy.visit("/");
  });

  it("displays all the necessary elements", () => {
    cy.get(".header").children(".header-link").should("have.length", 4);
    cy.get(".main").find("img").should("have.attr", "alt", "Google");
    cy.get(".main").find("input.search-input");
    cy.get(".buttons").children(".button").should("have.length", 2);
    cy.get(".languages")
      .should("contain.text", "Español (Latinoamérica)")
      .should("contain.text", "Quechua");
  });

  it("Can input a search term", () => {
    cy.get(".search-input").type(searchTerm).should("have.value", searchTerm);
  });

  it("Can submit a search request", () => {
    cy.intercept(
      {
        method: "GET",
        pathname: "/search",
        query: {
          q: searchTerm,
        },
      },
      {
        statusCode: 200,
        fixture: "google.json",
      }
    ).as("submitSearch");

    cy.get(".search-input")
      .type(`${searchTerm}{enter}`)
      .should("have.value", "SEARCH SUBMITTED");

    cy.wait("@submitSearch")
      .its("response.body")
      .should("have.property", "name")
      .and("include", "Google search response");
  });

  it("Can show a search dropdown", () => {
    cy.get(".search-dropdown").should("not.be.visible");
    cy.get(".search-input").click();
    cy.get(".search-dropdown").should("be.visible");
  });

  it("Hides the dropdown when outside is clicked", () => {
    cy.get(".search-input").click();
    cy.get(".header").click();
    cy.get(".search-dropdown").should("not.be.visible");
  });

  it("Does not hide the dropdown when dropdown is clicked", () => {
    cy.get(".search-input").click();
    cy.get(".search-dropdown").click().should("be.visible");
  });

  it("Can update a button when clicked", () => {
    cy.get(".button--search")
      .should("have.text", "Google Search")
      .click()
      .should("have.text", "Clicked");
  });
});
