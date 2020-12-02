import React from 'react'

const Pokemon = (props) => {
    const { match: { params } } = props;

    return (
        <div>
            this is the Pokemon page for pokemon #{params.pokemonId}
        </div>
    )
}

export default Pokemon;

