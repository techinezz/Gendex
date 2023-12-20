import { useGlobalContext } from "../../context/global";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Pokemon() {
    const router = useRouter();
    const { pokemon } = router.query;
    const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

    console.log(pokemonItem);

    useEffect(() => {
        getPokemon(pokemon);
    }, []);

    return (
        <div>
            <h1>Pokemon</h1>
        </div>
    )
}

export default Pokemon;