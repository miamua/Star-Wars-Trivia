'use strict';

class Character{
    constructor(name, gender, height, mass, hairColor, skinColor, movies, pictureUrl){
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.movies = movies;
        this.pictureUrl = "";
    }

};


const fetchData = async (url) => {
    let response = await fetch(url);
    let json = await response.json();
    return json;
};


let allCharacters = [];
let createChar = async () => {
    let charsValue = document.querySelector("select[name='characters']");
    let params = charsValue.value;
    console.log(`https://swapi.dev/api/people/` + params);
    let data = await fetchData(`https://swapi.dev/api/people/${params}`);

    let { name, gender, height, mass, hair_color, skin_color, films } = data;
    let charName = name;
    let charHeight = height;
    let charGender = gender;
    let charMass = mass;
    let charHair = hair_color;
    let charSkin = skin_color;
    let charMovies = films;
    console.log(name);

    let newChar = new Character(charName, charGender,charHeight, charMass, charHair, charSkin, charMovies);
    allCharacters.push(newChar);
    console.log(typeof newChar);
    console.log(allCharacters);

    onRender();


}


let container = document.querySelector(".profileContainer");
let onRender = () =>{
container.innerHTML = "";
    allCharacters.forEach((char) => {
        
        let charDiv = document.createElement("div");
        charDiv.innerHTML = `<p> Name: ${char.name}<br> 
        Gender: ${char.gender} <br> Height:${char.height} <br> Mass: ${char.mass} <br>
        Hair Color: ${char.hairColor} <br> Skin Color: ${char.skinColor} <br> Films: ${char.movies} </p>`;
        
        container.append(charDiv);
        
    });

};

