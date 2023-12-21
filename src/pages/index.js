import { useGlobalContext } from "@/context/global";
import Router from "next/router";


export default function Home() {
  const {allPokemonData} = useGlobalContext();


  return <main>
    <form action="" className="search-form"></form>
    <div className="all-pokemon">
      {allPokemonData ? allPokemonData.map((pokemon) => {
        return <div key={pokemon.id} className="pokemon" onClick={() =>{
          Router.push(`/pokemon/${pokemon.name}`)
        }}>
          <div className="card-image">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <div className="card-body">
            <h3>{pokemon.name}</h3>
            <p>More Details &nbsp; &rarr;</p>
          </div>
        </div>
        
      }): <h1>Loading...</h1>}
    </div>

  </main>
  
}
