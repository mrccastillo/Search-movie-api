const searchBar = document.querySelector("#movie-search");
searchBar.addEventListener("keydown", async function (e) {
  // console.log(e.code)
  if (e.key === "Enter") {
    console.log(searchBar.value);
    const fetchAPI = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchBar.value}`
    );
    const movieDatas = await fetchAPI.json();
    console.log(movieDatas);
    document.querySelector("section").innerHTML = ""; // remove previously appended divs

    //creates the search result text when u search
    if (Object.keys(movieDatas).length === 0) {
      const searchResult = document.createElement("h2");
      searchResult.innerHTML = "No results found";
      document.querySelector("section").appendChild(searchResult);
    } else {
      const searchResult = document.createElement("h2");
      searchResult.innerHTML = `Search results for: ${searchBar.value}`;
      document.querySelector("section").appendChild(searchResult);
    }
    //create card for card container
    const movieCardContainer = document.createElement("div");
    movieCardContainer.classList.add("card-containers");
    document.querySelector("section").appendChild(movieCardContainer);
    for (let objects of movieDatas) {
      if (objects.show.image) {
        //create card for movie
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        //create and appends the image to the card
        const movieImage = document.createElement("img");
        movieImage.classList.add("movie-image");
        movieImage.style.backgroundImage = `url(${objects.show.image.medium})`;
        //create element for title
        const movieTitle = document.createElement("h3");
        movieTitle.classList.add("movie-title");
        movieTitle.innerHTML = `Title: ${objects.show.name}`;

        movieCardContainer.appendChild(movieCard);
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieTitle);
        console.log(objects.show.image.medium);
        console.log(objects.show.name);
        searchBar.value = "";
      }
    }
  }
});
