'use strict';

class Character {
    constructor(
      name,
      gender,
      height,
      mass,
      hairColor,
      skinColor,
      movies,
      pictureUrl,
      homeWorld,
      moviesNames = [],
      movieDates = [] ,
      planetName,
      vehicle = [],
      starship = [],
      mostExpensiveCraft = "",
      
    ) {
      this.name = name;
      this.gender = gender;
      this.height = height;
      this.mass = mass;
      this.hairColor = hairColor;
      this.skinColor = skinColor;
      this.movies = movies;
      this.pictureUrl = pictureUrl;
      this.homeWorld = homeWorld;
      this.moviesNames = moviesNames;
      this.movieDate = movieDates;
      this.planetName = planetName;
      this.vehicle = vehicle;
      this.starship = starship;
      this.mostExpensiveCraft = mostExpensiveCraft;
      
    }
    async getMoviesName(){
          return this.moviesNames;
    }
    async getFirstDate(){
        let FirstDate = this.movieDate.sort(function(a,b){
        return Date.parse(a) > Date.parse(b);
    });
      return FirstDate;
    }
    async getHomePlanet(){
      return this.planetName;
    }
    async mostExpensiveVehicle(){
      let pricesOfVehicles = [];
      this.vehicle.forEach(async(vehicle) => {
        if (vehicle.cost_in_credits !== "unknown") {
          pricesOfVehicles.push(vehicle.cost_in_credits);
        
      }
    });
    console.log(pricesOfVehicles);
    
      let pricesOfStarship = [];
        this.starship.forEach(async(starship) => {
          if (starship.cost_in_credits !== "unknown") {
            pricesOfStarship.push(starship.cost_in_credits);
          }
        });
        console.log(pricesOfStarship);

    
    let theMostexpensiveVehicles = Math.max(...pricesOfVehicles);
    let theMostexpensiveStarship = Math.max(...pricesOfStarship);
    let dyrasteFordonsPris = "";

    console.log(`${this.name} most expensive vechicle costs ${Math.max(...pricesOfVehicles)}`);
    console.log(`${this.name} most expensive starship costs ${Math.max(...pricesOfStarship)}`);

    if(theMostexpensiveVehicles > theMostexpensiveStarship){
        dyrasteFordonsPris = theMostexpensiveVehicles;
    }else{
      dyrasteFordonsPris = theMostexpensiveStarship;
    }
    console.log(dyrasteFordonsPris);

    let dyrasteFordon = "";
    let dyrasteStarskepp = "";

    try {
        dyrasteFordon = await this.vehicle.find(item => item.cost_in_credits == dyrasteFordonsPris);
        this.mostExpensiveCraft = dyrasteFordon;

    } catch (error) {
      console.log(error)
    }
    
    try {
        dyrasteStarskepp = await this.starship.find(item => item.cost_in_credits == dyrasteFordonsPris);
        this.mostExpensiveCraft = dyrasteStarskepp;
    } catch (error) {
      console.log(error)
    }
    
    
    //console.log(dyrasteStarskepp);
    //console.log(dyrasteFordon);

    }
};


  const fetchData = async (url) => {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  };

  let selectedChar = [];
  let pageParam = "";
  let allCharacters = [];

  function movieNames(movies) {
    let movieNames = [];
    movies.forEach(async(film) => {
      let theMovie = await fetch(film);
      let movieName = await theMovie.json();
      movieNames.push(movieName.title);
      })
      return movieNames;
  }

  function movieDates(movies) {
    let movieDates = [];
    movies.forEach(async(film) => {
      let theMovie = await fetch(film);
      let movieName = await theMovie.json();
      movieDates.push(movieName.release_date);
      })
      return movieDates;
  }
  
  async function homePlanet(home){
    let planet = await fetch(home);
    let planetName = await planet.json();
    return await planetName;
  }

  async function getVehicle(url){
    let vehicleArr = [];
    await url.forEach(async(item) =>{
    let vehicle = await fetch(item);
    let allVehicle = await vehicle.json();
    vehicleArr.push(allVehicle);
    })
    return vehicleArr;
  }

  async function getStarship(url){
    let starshipArr = [];
    await url.forEach(async(item) =>{
    let starship = await fetch(item);
    let allStarship = await starship.json();
    starshipArr.push(allStarship);
    })
    return starshipArr;
  }




  let getAllchar = async () => {
    for (let i = 1; i < 17; i++) {
      console.log(i);
      let data = await fetchData(`https://swapi.dev/api/people/${i}`);
      console.log(data);
      /*
    let { name, gender, height, mass, hair_color, skin_color, films, pictureUrl} = data;
      
    let charName = name;
      let charHeight = height;
      let charGender = gender;
      let charMass = mass;
      let charHair = hair_color;
      let charSkin = skin_color;
      let charMovies = films;
      let pictureUrl = `${charName}+.webp`;
      */
      let getMovieNames = movieNames(await data.films);
      console.log(getMovieNames)

      let getMovieDates = movieDates(await data.films);
      console.log(getMovieDates)

      let getHomeWorld = await homePlanet(data.homeworld);
      console.log(getHomeWorld);
     
      let vehicles = await getVehicle(data.vehicles);
      console.log(vehicles);

      let starship = await getStarship(data.starships);
      console.log(starship);

      let pictureUrl = data.name+`.jpg`;
      let newChar = new Character(
        /*
        charName,
        charGender,
        charHeight,
        charMass,
        charHair,
        charSkin,
        charMovies
        */
       data.name, data.gender, data.height, data.mass, data.hair_color, data.skin_color, data.films, pictureUrl, data.homeworld, getMovieNames, getMovieDates, getHomeWorld.name, vehicles, starship
      );
      

      allCharacters.push(newChar);
      
    let options1 = document.createElement("option");
        options1.innerHTML = `<option value="${data.name}">${data.name}</option>`;
        dropdown1.append(options1);
        
    let options2 = document.createElement("option");
        options2.innerHTML = `<option>${data.name}</option>`;
        dropdown2.append(options2);

    
    }

  };

  

  let container = document.querySelector(".profileContainer");
  let char1Div = document.querySelector("#char1");
  let char1PicDiv = document.createElement("div");
  let char1InfoDiv = document.createElement("div");
  let char2Div = document.querySelector("#char2");
  let char2PicDiv = document.createElement("div");
  let char2InfoDiv = document.createElement("div");
  
  let onRender = (char1, char2) => {
    char1Div.innerHTML = "";
    char2Div.innerHTML = "";
        
    char1PicDiv.innerHTML = `<h2>${char1.name}</h3><br> <img src="img/${char1.pictureUrl}" alt="${char1.name} picture">`;
    char2PicDiv.innerHTML = `<h2>${char2.name}</h3><br> <img src="img/${char2.pictureUrl}" alt="${char2.name} picture">`;
       
    char1Div.append(char1PicDiv);
    char2Div.append(char2PicDiv);

  };


  let dropdown1 = document.querySelector("#charList1");
  let dropdown2 = document.querySelector("#charList2");
  let getInfoBtn = document.querySelector("#getInfoBtn");
  getInfoBtn.addEventListener("click", () => {
  selectedChar = [];
  //compareBtn.style.display = "inherit";
  compareBtn.disabled = false;
  //movieNameBtn.disabled = false;
  //firstAppearBtn.disabled = false;
  //movieNameBtn.style.display = "inherit";
  
  compareResultContainer.innerHTML = "";

  let selectedOne = allCharacters.find(item => item.name === dropdown1.value);
  let selectedTwo = allCharacters.find(item => item.name === dropdown2.value);

  console.log(selectedOne);
  console.log(selectedTwo);
  
  selectedChar.push(selectedOne,selectedTwo);
  onRender(selectedOne,selectedTwo);
  

    
  });
  
  let compareBtn = document.querySelector("#compareBtn");
    compareBtn.addEventListener("click", () => {
      compareResultContainer.innerHTML = "";

    compare();
    compareBtn.disabled = true;
    
  });

  getAllchar();
  

let compareResultContainer = document.querySelector(".compareResult");
let compare = () =>{
  
  console.log(selectedChar);
  
  let tallestChar = "";
  let heaviestChar = "";
  let mostMoviesChar = "";
  let genderCompare = "";
  let hairColorCompare = "";
  let skinColorCompare = "";
  let char1 = selectedChar[0];
  let char2 = selectedChar[1];
  onRender(char1, char2);
  let compareResultText = "";
  let compareResult = document.createElement("p");
  

  char1InfoDiv.innerHTML = `<p> Name: ${char1.name}<br> 
          Gender: ${char1.gender} <br> Height:${char1.height} <br> Mass: ${char1.mass} <br>
          Hair Color: ${char1.hairColor} <br> Skin Color: ${char1.skinColor} <br> 
          Films: ${char1.movies.length}</p>`;

  char2InfoDiv.innerHTML = `<p> Name: ${char2.name}<br> 
          Gender: ${char2.gender} <br> Height:${char2.height} <br> Mass: ${char2.mass} <br>
          Hair Color: ${char2.hairColor} <br> Skin Color: ${char2.skinColor} <br> 
          Films: ${char2.movies.length}</p>`;
  
  char1Div.append(char1InfoDiv);
  char2Div.append(char2InfoDiv);
  

  if(char1.name === char2.name){
    compareResultText = `You can't compare same char!!!`;
    compareResult.innerText = compareResultText;
  }else{
  //Compare height
  if(Number(char1.height) === Number(char2.height)){
    tallestChar = `${char1.name} and ${char2.name} have same height!`;
  }else if(Number(char1.height) > Number(char2.height)){
    tallestChar = `${char1.name} is tallest`;
  }
  else{
    tallestChar = `${char2.name} is tallest`;
  }

  //Compare weight
  if(char1.mass === "unknown" || char2.mass === "unknown"){
    heaviestChar = "There is missing info, can't compare!";
  }else if(Number(char1.mass) === Number(char2.mass)){
    heaviestChar = `${char1.name} and ${char2.name} have same weight!`;
  }else if(Number(char1.mass.replace(",","")) > Number(char2.mass.replace(",",""))){
    heaviestChar = `${char1.name} is heaviest`;
  }else{
    heaviestChar = `${char2.name} is heaviest`;
  };



  //Compare movies
  if(char1.movies.length === char2.movies.length){
    mostMoviesChar = `${char1.name} and ${char2.name} have been same amount of films.`;
  }else if(char1.movies.length > char2.movies.length){
    mostMoviesChar = `${char1.name} has been in most films`;
  }else{
    mostMoviesChar = `${char2.name} has been in most films`;
  }
 
  //Compare gender
  if(char1.gender === "n/a" || char2.gender === "n/a"){
    genderCompare = `Gender : There is missing info, can't compare!`;
  }else if(char1.gender === char2.gender){
    genderCompare = `${char1.name} and ${char2.name} have the same gender.`;
  }else{
    genderCompare = `${char1.name} and ${char2.name} have different gender.`;
  }

  //Compare hair color
  if(char1.hairColor === "n/a" || char2.hairColor === "n/a"){
    hairColorCompare = `hair color : There is missing info, can't compare!`;
  }else if(char1.hairColor === char2.hairColor){
    hairColorCompare = `${char1.name} and ${char2.name} have same hair color.`;
  }else{
    hairColorCompare = `${char1.name} and ${char2.name} have different hair color.`;
  }

  //Compare skin color
  if(char1.skinColor === "n/a" || char2.skinColor === "n/a"){
    skinColorCompare = `Skin color : There is missing info, can't compare!`;
  }else if(char1.skinColor === char2.skinColor){
    skinColorCompare = `${char1.name} and ${char2.name} have same skin color.`;
  }else{
    skinColorCompare =`${char1.name} and ${char2.name} have different skin color.`;
  }

  compareResultText = `${tallestChar} 
  ${heaviestChar}
  ${mostMoviesChar} 
  ${genderCompare}
  ${hairColorCompare}
  ${skinColorCompare}
  `
  compareResult.innerText = compareResultText;

  }
  
  compareResultContainer.append(compareResult);
};


let movieNameBtn = document.querySelector("#moviesName");
movieNameBtn.addEventListener("click", async () => {
   //await selectedChar[0].getMoviesName();
   //await selectedChar[1].getMoviesName();
   //console.log(char1MoviesArr[0]);
   //console.log(char2MoviesArr);
  
  let moivesName1 = document.createElement("div");
  let moivesName2 = document.createElement("div");
  moivesName1.setAttribute("id","char1MoviesDiv");
  moivesName2.setAttribute("id","char2MoviesDiv");

    selectedChar[0].moviesNames.forEach((movie) => {
      let renderMoviesName1 = document.createElement("ul");
      renderMoviesName1.innerHTML = `<li>${movie}</li>`;
      console.log(`Char1 movies: ${movie}`);
      moivesName1.append(renderMoviesName1);  
    });

    selectedChar[1].moviesNames.forEach((movie) => {
      let renderMoviesName2 = document.createElement("ul");
      renderMoviesName2.innerHTML = `<li>${movie}</li>`;
      console.log(`Char2 movies: ${movie}`);
      moivesName2.append(renderMoviesName2);
    });
    
    char1Div.append(moivesName1);
    char2Div.append(moivesName2); 


    //movieNameBtn.disabled = true;
    
    
    
  });

  let firstAppearBtn = document.querySelector("#moviesDate");
  firstAppearBtn.addEventListener("click", async () =>{
    
    let char1FirstDate = await selectedChar[0].getFirstDate();
    let char2FirstDate = await selectedChar[1].getFirstDate();

    console.log(`${char1FirstDate}`);
    let char1DateText = document.createElement("p");
    char1DateText.innerText = `${selectedChar[0].name} first appeared in a movie ${char1FirstDate[0]}`;

    
    console.log(`${char2FirstDate}`);
    let char2DateText = document.createElement("p");
    char2DateText.innerText = `${selectedChar[1].name} first appeared in a movie ${char2FirstDate[0]}`;

    char1Div.append(char1DateText);
    char2Div.append(char2DateText);

  });
  
let homePlanetBtn = document.querySelector("#planet");
homePlanetBtn.addEventListener("click", async () => {

  let char1Home = await selectedChar[0].getHomePlanet();
  let char2Home = await selectedChar[1].getHomePlanet();

  console.log(`${char1Home}`);
  let char1HomeText = document.createElement("p");
  char1HomeText.innerText = `${selectedChar[0].name} lives in ${char1Home}.`;

  console.log(`${char2Home}`);
  let char2HomeText = document.createElement("p");
  char2HomeText.innerText = `${selectedChar[1].name} lives in ${char2Home}.`;

  if(char1Home=== char2Home){
    let samePlanetText = document.createElement("p");
    console.log(`${selectedChar[0].name} and ${selectedChar[1].name} live in the same Planet!`);
    samePlanetText.innerText = `${selectedChar[0].name} and ${selectedChar[1].name} live in the same Planet!`;
    container.append(samePlanetText);
  }else{
    console.log(`not same planet`)
  }

  char1Div.append(char1HomeText);
  char2Div.append(char2HomeText);
});

 
let vehicleBtn = document.querySelector("#expensiveVehicle");
vehicleBtn.addEventListener("click", async () =>{

  await selectedChar[0].mostExpensiveVehicle();
  await selectedChar[1].mostExpensiveVehicle();

  console.log(selectedChar[0].mostExpensiveCraft);
  console.log(selectedChar[0].mostExpensiveCraft.name);
  console.log(selectedChar[1].mostExpensiveCraft);
  console.log(selectedChar[1].mostExpensiveCraft.name);


})