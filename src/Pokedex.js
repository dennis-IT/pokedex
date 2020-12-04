import React, { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid';
import { AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography, TextField } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
//import mockData from './mockData';
import { toFirstCharUppercase } from './Utils';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
    pokedexAppbar: {
        backgroundColor: '#c24914'
    },
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto',
        width: '130px',
        height: '130px'
    },
    cardContent: {
        textAlign: 'center'
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        padding: "10px 10px",
        marginTop: "10px",
        marginBottom: "10px"
    },
    searchIcon: {
        alignSelf: "flex-end",
        paddingRight: "5px",
        marginBottom: "5px"
    },
    searchInput: {
        width: "15rem",
        marginBottom: "5px"
    }
}));


const Pokedex = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(response => {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`

                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];

        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        title={name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <React.Fragment>
            <AppBar position='static' className={classes.pokedexAppbar} elevation={0}>
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField className={classes.searchInput} label="Pokemon" variant="standard" />
                    </div>
                </Toolbar>
            </AppBar>

            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {
                        Object.keys(pokemonData).map((pokemonId) => getPokemonCard(pokemonId))
                    }
                </Grid>
            ) : (
                    <CircularProgress />
                )}
        </React.Fragment>
    );
};

export default Pokedex;
