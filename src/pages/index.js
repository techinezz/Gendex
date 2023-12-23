import { useGlobalContext } from "@/context/global";
import Router from "next/router";
import { useState } from "react";


export default function Home() {
  const {allPokemonData, searchResults, next, getPokemon, loading, realTimeSearch } = useGlobalContext();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);

    realTimeSearch(search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  }

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => {
      return <div key={pokemon.id} onClick={() => {
        Router.push(`/pokemon/${pokemon.name}`)
      }}
      className="pokemon-name"
      >{pokemon.name}</div>
    });
  };


  return <main>
    <form action="" className="search-form" onSubmit={handleSearch}>
      <div className="input-control">
        <input type="text" placeholder="Search Pokemon.." value={search} onChange={handleChange} />
        <button className="submit-btn" type="submit">
          Search
        </button>
      </div>
    </form>

    {search && searchResults.length > 0 && (
    <div className="search-results">{displaySearchResults()}</div>
    )}
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

    <div className="next">
      {allPokemonData.length > 0 && (
        <button className="next-btn" onClick={next}>
          Load More Pokemon &darr;
        </button>
      )}
    </div>

  </main>
  
}
