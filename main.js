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
      pictureUrl
    ) {
      this.name = name;
      this.gender = gender;
      this.height = height;
      this.mass = mass;
      this.hairColor = hairColor;
      this.skinColor = skinColor;
      this.movies = movies;
      this.pictureUrl = pictureUrl;
    }
  }
  
  const fetchData = async (url) => {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  };

  let selectedChar = [];
  let pageParam = "";
  let allCharacters = [];
  
  let getAllchar = async () => {
    
    for (let i = 1; i < 17; i++) {
      pageParam = i;
      console.log(pageParam);
      let data = await fetchData(`https://swapi.dev/api/people/${pageParam}`);
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
      let pictureUrl = data.name+`.webp`;
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
       data.name, data.gender, data.height, data.mass, data.hair_color, data.skin_color, data.films, pictureUrl
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

  //let container = document.querySelector(".profileContainer");
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
  
  }

    let dropdown1 = document.querySelector("#charList1");
    let dropdown2 = document.querySelector("#charList2");
    let getInfoBtn = document.querySelector("#getInfoBtn");
    getInfoBtn.addEventListener("click", () => {
    selectedChar = [];
    compareBtn.disabled = false;
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


