import { useGlobalContext } from "../../context/global";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  styles from "../../styles/Pokemon.module.css";

// This is the page that will display the pokemon when you click on the pokemon card
function Pokemon() {
    const router = useRouter();
    const { pokemon } = router.query;
    const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

    useEffect(() => {
        if (pokemon) {
            getPokemon(pokemon);
        }
    }, [pokemon]);

// The code below will fetch the locations of the pokemon
const [locationAreaEncounters, setLocationAreaEncounters] = useState([]);
useEffect(() => {
    fetch(pokemonItem?.location_area_encounters)
        .then(response => response.json())
        .then(data => {
            const locationNames = data.map(encounter => encounter.location_area.name);
            setLocationAreaEncounters(locationNames);
        })
        .catch(error => console.error(error));
}, [pokemonItem]);

// This is for the popup to show all the locations of the pokemon
const [isPopupOpen, setIsPopupOpen] = useState(false);


    let myLink = "";

    // This is just a for back up if the pokemon does not have a home image
    if(pokemonItem?.sprites?.other) {
        const  { "official-artwork": link } = pokemonItem?.sprites?.other;
        myLink = link.front_default;
    }
    //Colors for the pokemon cards
    const cardColors = [
        '#FF5733', // Pomegranate
        '#DAF7A6', // Lime
        '#FFC300', // Saffron
        '#581845', // Plum
        '#C70039', // Red
        '#900C3F', // Ruby
        '#6C3483', // Amethyst
        '#1B4F72', // Ocean Blue
        '#17202A', // Night
        '#F4D03F', // Yellow
        '#2ECC71', // Emerald
        '#3498DB', // Peter River
        '#E74C3C', // Alizarin
        '#9B59B6', // Amethyst
        '#34495E', // Wet Asphalt
        '#16A085', // Green Sea
        '#27AE60', // Nephritis
        '#2980B9', // Belize Hole
        '#8E44AD', // Wisteria
        '#2C3E50', // Midnight Blue
        '#F39C12', // Orange
        '#D35400', // Pumpkin
        '#C0392B', // Pomegranate
        '#BDC3C7', // Silver
        '#7F8C8D'  // Asbestos
    ];

    const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];


    return (
        <div className={styles.PokemonBg} style={{
            backgroundColor: !loading && randomColor,
        
        }}
        >
            {!loading ? pokemonItem && (
            //This div will display the image of the pokemon when you click on the pokemon card
            <>
                <div className={styles.PokemonImage}>
                    <img src={pokemonItem?.sprites?.other?.home.front_default
                    ? pokemonItem?.sprites?.other?.home.front_default : myLink 
                    } alt={pokemonItem.name} />
                </div>
                <div className={styles.PokemonBody}>
                    <h2>{pokemonItem?.name}</h2>
                    <div className={styles.PokemonInfo}>
                    <div className={styles.PokemonInfoItem}>
                            <h5>Pokedex NO.</h5>
                            <p>{pokemonItem?.id}</p>
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Type:</h5>
                                {pokemonItem?.types?.map((type) => {
                                    return <p key={type.type.name}>{type.type.name}</p>;
                                })}
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Abilities:</h5>
                            {pokemonItem?.abilities?.map((ability) => {
                                return <p key={ability.ability.name}>{ability.ability.name}</p>;
                            })}
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Stats:</h5>
                            {pokemonItem?.stats?.map((stat) => {
                                return <p key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</p>;
                            })}
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>A Few Moves:</h5>
                            {pokemonItem?.moves?.slice(0, 4).map((move) => {
                                return <p key={move.move.name}>{move.move.name}</p>;
                            })}
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Location Area:</h5>
                            {locationAreaEncounters.length > 0 ? (
                                <>
                                    {locationAreaEncounters.slice(0, 0).map((locationName, index) => {
                                        return <p key={index}>{locationName}</p>;
                                    })}
                                    {locationAreaEncounters.length > 0 && (
                                        <button className={styles.button} onClick={() => setIsPopupOpen(true)}>Show all locations</button>
                                    )}
                                    {isPopupOpen && (
                                        <div className={styles.Popup}>
                                            {locationAreaEncounters.map((locationName, index) => {
                                                return <p key={index}>{locationName}</p>;
                                            })}
                                            <button className={styles.button} onClick={() => setIsPopupOpen(false)}>Close</button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p>Pokemon not found in the wild</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
            
            )
             : (
                <div className="loader">
                    <loading />
                </div>
                )}
        </div>
    );
}

export default Pokemon;