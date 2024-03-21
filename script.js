//Variáveis
const searchInput = document.getElementById('searchInpt')
const nextButton = document.getElementById('nextButton')
const previousButton = document.getElementById('previousButton')
const searchButton = document.getElementById('search')
let pokeImg = document.getElementById('pokeImg')
let pokemonNumber = document.getElementById('pokemonNumber')
let pokemonName = document.getElementById('pokemonName')
let pokemonIndex = 1
let nonExist = false

//Funções
async function pokemonShow() {
    try{
        //Recebimento da data do pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
        let pokemonData = await response.json()
        pokemonIndex = pokemonData.id

        //Renderização do pokemon
        pokemonName.innerHTML = `- ${pokemonData.name}`
        pokemonNumber.innerHTML = pokemonData.id
        pokeImg.src = pokemonData.sprites.front_default
        pokeImg.style.visibility = 'visible'
    }
    catch(error){
        pokeImg.style.visibility = 'hidden'
        pokemonNumber.innerHTML = 'Não encontrado'
        pokemonName.innerHTML = ''
        console.error(error)
        pokemonIndex = 2
        nonExist = true
    }
}

pokemonShow()

const nextPokemon = () =>{
    pokemonIndex++
    if(pokemonIndex > 1025 || nonExist == true){
        pokemonIndex = 1
        pokemonShow()
    }
    else{
        pokemonShow()
    }
    
}

const previousPokemon = () =>{
    pokemonIndex--
    if(pokemonIndex == 0){
        pokemonIndex = 1025
        pokemonShow()
    }
    else{
        pokemonShow()
    }
}

const searchPokemon = () => {
    let currentInput = searchInput.value.trim().toLowerCase(); 
    pokemonIndex = currentInput
    searchInput.value = ''
    searchInput.focus()
    pokemonShow()
}

//Event Listeners
nextButton.addEventListener('click',  nextPokemon)
previousButton.addEventListener('click', previousPokemon)
searchButton.addEventListener('click', searchPokemon)
