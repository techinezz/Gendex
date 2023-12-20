import { useGlobalContext } from "../../context/global";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import  styles from "../../styles/Pokemon.module.css";


function Pokemon() {
    const router = useRouter();
    const { pokemon } = router.query;
    const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();


    useEffect(() => {
        if (pokemon) {
            getPokemon(pokemon);
        }
    }, []);


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

    // *This div will display the image of the pokemon when you click on the pokemon card */
    return (
        <div className={styles.PokemonBg}>
            {pokemonItem && (
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
                            <h5>Name:</h5>
                            <p>{pokemonItem?.name}</p>
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Tpye:</h5>
                                {pokemonItem?.types?.map((type) => {
                                    return <p key={type.type.name}>{type.type.name}</p>;
                                })}
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>NO.</h5>
                            <p>{pokemonItem?.id}</p>
                        </div>
                    </div>
                </div>
            </>
            
            )}
        </div>
    )
}

export default Pokemon;