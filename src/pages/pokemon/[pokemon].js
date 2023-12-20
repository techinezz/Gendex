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


    let myLink = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

    // This is just a for back up if the pokemon does not have a home image
    if(pokemonItem?.sprites?.other) {
        const  { "official-artwork": link } = pokemonItem?.sprites?.other;
        myLink = link.front_default;
    }

    // *This div will display the image of the pokemon when you click on the pokemon card */
    return (
        <div>
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
                    </div>
                </div>
            </>
            
            )}
        </div>
    )
}

export default Pokemon;