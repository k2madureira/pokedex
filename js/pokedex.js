

/*____________________________________

  Constants and variables used in app
  ____________________________________*/


// (Level 1)
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'; // Url for API (Application Programming Interface)
const url_part_1 = 'https://pokeapi.co';             // encounters pokemon
const $ = document.querySelector.bind(document);    // Json?. XD

// (Level 2)
const body = $('body'),
      container = $('.pokemon'),
      hunt = $('.hunt-input'),
      huntBtn = $('.huntBtn'),
      error = $('.error');

// (variables)
var poke,           // Pokemaster search
    pokemon,       // Pokemon Data coming from the API
    pokelocation,  // Pokemon Location 
    ball;        // throw pokeball in index

 /*______________________

  Pokemon League Functions
  ______________________*/

async function requestHunt (url,name){         //asynchronous request
        await fetch(url + name)               // wait request response ->
        .then(response => response.json())   // then transform in object JS ->
        .then(data => {                     // now assigns the value to pokemon variable   
            pokemon = data;
        })
        .catch(err => console.log(err)); // Try and catch
}

async function requestEncounters (url1,url2){ //search location pokemon
        await fetch(url1+url2)
        .then(response=>response.json())
        .then(data=> {

            let strData  = data.map(item=>item.location_area.name).toString();
            let strSplit = strData.split(",",3).toString();
            let str = strSplit.replace(/,/g,"<br>");
            
            pokelocation = str;
        })
        .catch(err=>console.log(err));
} 

function searchImg () {

    let way = '';
    

    for(var i=1;i<=60;i++){

        if(pokemon.id == i){
            way = 'img/'+i+'.png';
            
        
        }else if(way == ''){
            
            way = pokemon.sprites.front_default;
            
        }
    }
    return way;
    
    
}

function type(){

    let str = pokemon.types.map(item => item.type.name).toString();
    let type;

    var bug = str.match(/bug/g);
    var electric =str.match(/electric/g);
    var fairy  = str.match(/fairy/g);
    var fighting  = str.match(/fighting/g);
    var fire  = str.match(/fire/g);
    var flying  = str.match(/flying/g);
    var ghost = str.match(/ghost/g);
    var grass = str.match(/grass/g);
    var psychic = str.match(/psychic/g);
    var poison = str.match(/poison/g);
    var normal = str.match(/normal/g);
    var water = str.match(/water/g);
    
    

    if(bug){
        type='bug';

    }else if(electric){
        type='electric';
    
    }else if(fairy){
        type='fairy';

    }else if(fighting){
        type='fighting';
        
    }else if(fire){
        type='fire';
    
    }else if(flying){
        type='flying';
    
    }else if(ghost){
        type ='ghost';
        
    }else if(grass){
        type ='grass';
    
    }else if(normal){
        type ='normal';
    
    }else if(psychic){
        type ='psychic';
   
    }else if(poison){
        type ='poison';

    }else if(water){
        type='water';  

    }else {
        type='';
    }

    switch(type) {
        
        case 'bug':
            // body.style.backgroundImage = "url(img/type/bug.jpg)";
            return 'img/type/bug.jpg';
            break;
        case 'electric':
           // body.style.backgroundImage = "url(img/type/electric.png)";
            return 'img/type/electric.png';
            break;
        
        case 'fairy':
            // body.style.backgroundImage = "url(img/type/fairy.jpg)";
             return 'img/type/fairy.jpg';
             break;
        
        case 'fighting':
             // body.style.backgroundImage = "url(img/type/fighting.jpg)";
              return 'img/type/fighting.jpg';
              break;
        
        case 'fire':
           // body.style.backgroundImage = "url(img/type/fire.jpg)";
            return 'img/type/fire.jpg';
            break;
        case 'flying':
            //body.style.background = "url(img/type/flying.jpg)";
            return 'img/type/flying.jpg';
            break;    
        
        case 'ghost':
            //body.style.backgroundImage = "url(img/type/ghost.jpg)";
            return 'img/type/ghost.jpg';
            break;
        
        case 'grass':
           // body.style.backgroundImage = "url(img/type/grass.jpg)";
            return 'img/type/grass.jpg';
            break; 

        case 'normal':
            //body.style.backgroundImage = "url(img/type/normal.jpg)";
            return 'img/type/normal.jpg';
            break;

        case 'psychic':
            //body.style.backgroundImage = "url(img/type/psychic.jpg)";
            return 'img/type/psychic.jpg';
            break;
        
            case 'poison':
            //body.style.backgroundImage = "url(img/type/poison.jpg)";
            return 'img/type/poison.jpg';
            break;
            
        case'water':
           // body.style.backgroundImage = "url(img/type/water.jpg)";
            return 'img/type/water.jpg';
            break;
        
        
                
        default:
            
            //container.style.backgroundImage = "";
            return 'img/type/normal.jpg';
    }

   
}

function info (){

    ball= `

    <div class="pokemon-picture">
        <img src="${searchImg()}" alt="draw pokemon ${pokemon.name}">
    </div>
    <div class="info">
        <span>Name:</span>
            <p class="info-p special" id="name">${pokemon.name}</p>

        <img  class ="type-bg" src="${type()}" alt=" pokemon type ${pokemon.types.map(item => item.type.name).toString()}">    
        <span>Type:</span>
            <p class="info-p special" id="type">${pokemon.types.map(item => item.type.name).toString()}</p>
            
        <span>description:</span>
            <p class="info-p" id="description">
                This pokemon is ${pokemon.name},it has ${pokemon.height  / 10}m and ${pokemon.weight  / 10}kg.
            </p>
        <span>Location area:</span>
            <p class="info-p special" id="place">${pokelocation}</p>
    </div>
    `;
  
    return ball;

}

async function start (beast) {
    
    await requestHunt(baseUrl,beast);


    if(pokemon.detail){  // if not found
        error.style.display ='block';
        container.style.display='none';
    }else {
        error.style.display ='none';
        container.style.display='flex';
        //----------------------------------------------------
        // Looking location pokemon
        //----------------------------------------------------
        let url_part_2 = pokemon.location_area_encounters;
        
        await requestEncounters(url_part_1,url_part_2);
        //----------------------------------------------------
        
        container.innerHTML = info();
        console.log(pokemon.types.map(item => item.type.name).toString());
        console.log(pokemon.name);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

    huntBtn.addEventListener('click',event=>{
        event.preventDefault();
        poke = hunt.value.toLowerCase();
        hunt.value= '';
        start(poke);
        
    });    
    

  });



