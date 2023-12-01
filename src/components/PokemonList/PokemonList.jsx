import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';



function PokemonList() {

  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [pokedexUrl , setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextUrl , setNextUrl] = useState('');
  const [prevUrl , setPrevUrl] = useState('');

  async function downloadPokemons(){
      setIsLoading(true);
      const response = await axios.get(pokedexUrl); //Download first 20 pokemons list array

      const pokemonResults = response.data.results; // we get sorted array of pokemons details from response

      // Updating prev and next URL for buttons
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);

      //Iterating over the array of pokemons and using their URL to create an array of promises that will download those 20 pokemons
      const pokemonResultPromise =  pokemonResults.map((pokemon)=>axios.get(pokemon.url));

      //Passing that promise array to axios.all
      const pokemonData = await axios.all(pokemonResultPromise); // Array of 20 pokemon detailed data

      // now iterate over all individual pokemon data and extract their id , name , image and the types
      const pokeListResult = pokemonData.map((pokeData)=>{
          const pokemon = pokeData.data;
          return {
              name: pokemon.name, 
              image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny , 
              types : pokemon.types ,
              id : pokemon.id
            }
      });

      // Setting the extracted properties into the PokemonList react variable
      setPokemonList(pokeListResult);
      setIsLoading(false);
  }

  //Using the useEffect to call automatically for the first time when the page renders and call downloadPokemons()
  
    useEffect (() => {
      downloadPokemons();
    },[pokedexUrl])
    
  return (
    <div className='pokemon-list-wrapper'>
        {/* Conditional rendering if pokemons are being downloaded or still downloading
            Once downloaded , it iterates over all the pokemon data and then renders Pokemon component with mentioned props and values
         */}
        <div className='pokemon-wrapper'>
            {(isLoading)?'Loading...': pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} />)}
        </div>
        <div className='controls'>
          <button className='button' disabled={prevUrl === undefined} onClick={()=>setPokedexUrl(prevUrl)} >Prev</button>
          <button className='button' disabled={nextUrl === undefined} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
        </div>
    </div>
  )
};

export default PokemonList;