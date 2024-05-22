import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Nav = ({ pokeResults, setSearchData }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      onClicksubmit();
    }
  };

  const onClicksubmit = () => {
    const pokeFilter = pokeResults.filter((el) => el.ko.includes(search));
    setSearchData(pokeFilter);
    navigate(`/search?q=${search}`);
    setSearch("");
  };
  const onClickHome = () => {
    navigate("/");
  };

  return (
    <div className=" bg-red-600 w-full px-20 h-24 drop-shadow-lg ">
      <nav className=" flex justify-between items-center h-full">
        <div>
          <img
            src="./pngwing.com.png"
            alt="logo"
            className="w-36 cursor-pointer"
            onClick={onClickHome}
          />
        </div>
        <div className="w-1/4 h-2/5 flex flex-row rounded-full border-2 border-white text-lg ">
          <input
            className=" w-full rounded-full pl-4 outline-none bg-inherit text-white font-medium"
            onChange={onChangeSearch}
            onKeyDown={activeEnter}
            value={search}
            placeholder="검색"
            type="text"
          />
          <button
            className=" text-white font-bold px-4"
            onClick={onClicksubmit}
          >
            <FaSearch />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
