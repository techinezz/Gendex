import { debounce } from 'lodash';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const GlobalContext = createContext();

const LOADING = "LOADING";
const GET_POKEMON = "GET_POKEMON";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_POKEMON_DATA = "GET_ALL_POKEMON_DATA";
const GET_SEARCH = "GET_SEARCH";
const GET_POKEMON_DATABASE = "GET_POKEMON_DATABASE";
const NEXT = "NEXT";

const reducer = (state, action) => {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_ALL_POKEMON:
            return { ...state, allPokemon: action.payload.results, next: action.payload.next, loading: false };
        case GET_POKEMON:
            return { ...state, pokemon: action.payload, loading: false };
        case GET_POKEMON_DATABASE:
            return { ...state, pokemonDataBase: action.payload, loading: false };
        case GET_SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case NEXT:
            return { 
                ...state, 
                allPokemon: [...state.allPokemon, ...action.payload.results], 
                next: action.payload.next, 
                loading: false };
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
        const response = await fetch(`${baseUrl}pokemon?limit=40`);
        const data = await response.json();
        dispatch({ type: "GET_ALL_POKEMON", payload: data});

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

    //get all pokemon data
    const getAllPokemonData = async () => {
        dispatch({ type: "LOADING" });
        const response = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
        const data = await response.json();
        dispatch({ type: "GET_POKEMON_DATABASE", payload: data.results });
    };

    //next page
    const next = async () => {
        dispatch({ type: "LOADING" });
        const response = await fetch(state.next);
        const data = await response.json();
        dispatch({ type: "NEXT", payload: data });

        //fetch pokemon data from next page and updating the page
        const newPokemonData = [];
        for(const pokemon of data.results) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            newPokemonData.push(pokemonData);
        }

        setAllPokemonData([...allPokemonData, ...newPokemonData]);
    };

    //real time search
    const realTimeSearch = debounce(async (search) => {
        dispatch({ type: "LOADING" });
        //search pokemon database
         const response = state.pokemonDataBase.filter((pokemon) => {
            return pokemon.name.includes(search.toLowerCase());
        });

        dispatch({ type: "GET_SEARCH", payload: response });
    }, 500);

    useEffect(() => {
        getAllPokemonData();
        allPokemon();
    }, []);
        

    return (
        <GlobalContext.Provider 
        value={{
            ...state,
            allPokemonData,
            getPokemon,
            realTimeSearch,
            next,
        }}>
            {children}
            </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
    };