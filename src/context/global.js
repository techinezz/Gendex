import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const GlobalContext = createContext();

const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_POKEMON_DATA_DATA = "GET_POKEMON_DATA_DATA";
const EGET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT";

const reducer = (state, action) => {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_ALL_POKEMON:
            return { ...state, allPokemon: action.payload, loading: false };
        case GET_POKEMON:
            return { ...state, pokemon: action.payload, loading: false };
    }

    return state;
};


export const GlobalProvider = ({ children }) => {

    const baseUrl = "https://pokeapi.co/api/v2/";

    const initialState = {
        allPokemon: [],
        pokemon: {},
        pokemonDataBase: [],
        searchResults: [],
        next: "",
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [allPokemonData, setAllPokemonData] = useState([]);

    const allPokemon = async () => {
        dispatch({ type: "LOADING" });
        const response = await fetch(`${baseUrl}pokemon?limit=20`);
        const data = await response.json();
        dispatch({ type: "ALL_POKEMON", payload: data.results });

        //fetch pokemon data
        const allPokemonData = [];
        for(const pokemon of data.results) {
            console.log(pokemon);
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            allPokemonData.push(pokemonData);
        }
        setAllPokemonData(allPokemonData);
    };

    //We are getting the pokemon data from the pokemon url
    const getPokemon = async (pokemon) => {
        dispatch({ type: "LOADING" });
        const response = await fetch(`${baseUrl}pokemon/${pokemon}`);
        const data = await response.json();
        dispatch({ type: "GET_POKEMON", payload: data });
    };

    useEffect(() => {
        allPokemon();
    }, []);
        

    return (
        <GlobalContext.Provider 
        value={{
            ...state,
            allPokemonData,
            getPokemon,
        }}>
            {children}
            </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
    };