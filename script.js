//Variáveis
const searchInput = document.getElementById('searchInpt')
const nextButton = document.getElementById('nextButton')
const previousButton = document.getElementById('previousButton')
const searchButton = document.getElementById('search')
let pokeImg = document.getElementById('pokeImg')
let pokemonNumber = document.getElementById('pokemonNumber')
let pokemonName = document.getElementById('pokemonName')
let pokemonIndex = 0
let pokemonData;
let pokemonDataArray;
//Funções

async function pokemonShow() {
    try{
        //Recebimento da data contendo todos pokemons possíveis da API
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.")
        pokemonData = await response.json()
        //Transformando os possíveis pokemons em uma array
        pokemonDataArray = [...pokemonData.results]
        //Igualando o pokemon atual com o índice da variável
        let currentPokemon = pokemonData.results[pokemonIndex]
        //Extraindo o nome do pokemon
        pokemonName.innerHTML = `- ${currentPokemon.name}`
        //Fazendo requisição ao link associado ao pokemon, onde contém os dadoss
        let currentPokemonData = await  (await fetch(currentPokemon.url)).json()
        //Usando os dados da fatch para fazer alterações no visual da página
        pokemonNumber.innerHTML = `${currentPokemonData.id}`
        pokeImg.src = `${currentPokemonData.sprites.front_default}`
    }
    catch(error){
        window.alert('Não existe nenhum pokemon condizente a esse número nesse pokedex!')
    }
}

pokemonShow()

const nextPokemon = () =>{
    pokemonIndex++
    if(pokemonIndex > 1301){
        pokemonIndex = 0
        pokemonShow()
    }
    else{
        pokemonShow()
    }
}

const previousPokemon = () =>{
    pokemonIndex--
    if(pokemonIndex < 0){
        pokemonIndex = 1301
        pokemonShow()
    }
    else{
        pokemonShow()
    }
}

const searchPokemon = () => {
    let currentInput = searchInput.value.trim(); 
    let nameorId = /^[0-9]+$/.test(currentInput);
    if (nameorId) {
        pokemonIndex = Number(currentInput) - 1
        pokemonShow()
    } 
    else{
        let found = false
        pokemonDataArray.forEach((element, index) =>{
           if(element.name == currentInput){
                pokemonIndex = index
                found = true
                pokemonShow()         
           }
        })
        if(!found){
            window.alert('Não existe pokemon com esse nome nesse pokedex!')
        }
    }
}

//Event Listeners
nextButton.addEventListener('click',  nextPokemon)
previousButton.addEventListener('click', previousPokemon)
searchButton.addEventListener('click', searchPokemon)
