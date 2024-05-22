import React from "react";
import Pokemon from "../../componant/pokemon";

const SearchPage = ({ searchData }) => {
  return (
    <div>
      <div className=" w-full mt-10">
        <div className="wrapper">
          {searchData.map((el) => (
            <Pokemon key={el.id} pokeDB={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
