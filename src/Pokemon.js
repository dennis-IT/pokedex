import React, { useState, useEffect } from 'react'
//import mockData from './mockData';
import { Typography, Link, Button, CircularProgress } from '@material-ui/core';
import { toFirstCharUppercase } from './Utils';
import Axios from 'axios';

const Pokemon = (props) => {
    const { match: { params }, history } = props;
    const [pokemon, setPokemon] = useState(undefined);

    //!NOTE:
    //There are 3 states:
    //1. pokemon = undefined -> It means we are getting data from API -> should return loading in progress
    //2. pokemon = good data -> It means we can pull data from the API -> should return actual info
    //3. pokemon = bad data (invalid id) -> It means we cannot pull any data from the API -> should return pokemon not found

    useEffect(() => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
            .then(response => {
                const { data } = response;
                setPokemon(data);
            })
            .catch(error => {
                setPokemon(false);
            });
    }, [params.pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;

        return (
            <React.Fragment>
                <Typography variant='h1'>
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default} alt={name} />
                </Typography>
                <img style={{ width: '300px', height: '300px' }} src={fullImageUrl} alt={name} />
                <Typography variant='h3'>Pokemon Info</Typography>
                <Typography>
                    Species: <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Weight: {weight}</Typography>
                <Typography variant="h6">
                    Types:
                    {types.map(typeInfo => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return (
                        <Typography key={name}>{name}</Typography>
                    )
                })}
                </Typography>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
            <br />
            <Button variant="contained" disableElevation color="secondary" onClick={() => history.push("/")}>
                Back to Pokedex
            </Button>
        </React.Fragment>
    );
}

export default Pokemon;

