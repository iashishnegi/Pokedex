import React from 'react'
import './Pokemon.css'

function Pokemon({name, image}) {
  return (
        <div className='pokemon'>
            <div>
                <img className='pokemon-image' src={image}/>
            </div>
            <div className='pokemon-name'>
                {name}
            </div>
        </div>
  )
}

export default Pokemon