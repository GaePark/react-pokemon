import React, { useEffect, useState } from "react";
import axios from "./api/axios";
import { Outlet, Route, Routes } from "react-router-dom";
import requests from "./api/requests";
import MainPage from "./pages/MainPage";
import Nav from "./componant/Nav";
import "./App.css";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const Layout = ({ pokeResults, setSearchData }) => {
  return (
    <div>
      <Nav pokeResults={pokeResults} setSearchData={setSearchData} />
      <Outlet />
    </div>
  );
};

function App() {
  const [pokeResults, setPokeResults] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = () => {
      Array(1024)
        .fill(1)
        .map(async (v, i) => {
          const resultData = await axios.get(
            `${requests.fetchPokemon}/${i + 1}`
          );
          const resultSpecies = await axios.get(
            `${requests.fetchSpecies}/${i + 1}`
          );
          const names = resultSpecies.data.names.find(
            (name) => name.language.name === "ko"
          );
          const koName = names.name;
          const color = resultSpecies.data.color.name;
          const allResult = { ...resultData.data, ko: koName, color: color };
          setPokeResults((prev) => [...prev, allResult]);
        });
    };
    fetchAllPokemon();
  }, []);
  pokeResults.sort((a, b) => a.id - b.id);
  return (
    <div className=" bg-gray-100 w-full h-full">
      <Routes>
        <Route
          path="/"
          element={
            <Layout pokeResults={pokeResults} setSearchData={setSearchData} />
          }
        >
          <Route index element={<MainPage pokeResults={pokeResults} />} />
          <Route path=":Id" element={<DetailPage />} />
          <Route
            path="search"
            element={<SearchPage searchData={searchData} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
