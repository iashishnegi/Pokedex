import React from 'react'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'

// Import CSS
import "./Pokedex.css"

const Pokedex = () => {
  return (
    <div className='pokedex-wrapper'>
        <h1 className='pokedex-heading' id='pokedex-heading'>Pokedex</h1>
        <Search />
        <PokemonList/>
    </div>
  )
}

export default Pokedex