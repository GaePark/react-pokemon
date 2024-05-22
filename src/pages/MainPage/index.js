import React, { useEffect, useState } from "react";
import Pokemon from "../../componant/pokemon";
import PageBtn from "../../componant/PageBtn";
import "./style.css";

const MainPage = ({ pokeResults }) => {
  const [page, setPage] = useState(0);
  const [pokeDB, setPokeDB] = useState([]);

  const PG = page * 20;
  useEffect(() => {
    setPokeDB(pokeResults.slice(PG, PG + 20));
  }, [pokeResults, PG]);

  console.log(pokeDB);
  return (
    <div className=" w-full mt-10">
      <div className="wrapper">
        {pokeDB.map((el) => (
          <Pokemon key={el.id} pokeDB={el} />
        ))}
      </div>
      <PageBtn page={page} setPage={setPage} pokeResults={pokeResults} />
    </div>
  );
};
export default MainPage;
