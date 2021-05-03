const searchButton = document.querySelector(".button--search");
const input = document.querySelector(".search-input");
const dropdown = document.querySelector(".search-dropdown");

searchButton.addEventListener("click", function () {
  updateButton("Clicked");
});
input.addEventListener("click", function () {
  showDropdown();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    fetch(`/search?q=${input.value}`).then(() => {
      input.value = "SEARCH SUBMITTED";
    });
  }
});

function updateButton(text) {
  if (searchButton.classList.contains("button-clicked")) {
    searchButton.classList.remove("button-clicked");
    searchButton.innerHTML = "Google Search";
  } else {
    searchButton.classList.add("button-clicked");
    searchButton.innerHTML = text;
  }
}

function showDropdown() {
  dropdown.style.visibility = "visible";
}

function hideDropdown() {
  dropdown.style.visibility = "hidden";
}

window.document.addEventListener("click", function (event) {
  const classList = event.target.classList;
  if (
    classList.contains("search-input") ||
    classList.contains("search-dropdown")
  ) {
    console.log("don't hide dropdown");
  } else {
    hideDropdown();
  }
});
