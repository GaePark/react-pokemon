import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import requests from "../../api/requests";

import { useLocation } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  const [resultData, setResultData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const speciesData = await axios.get(
        `${requests.fetchSpecies}${location.pathname}`
      );
      const resultData = await axios.get(
        `${requests.fetchPokemon}${location.pathname}`
      );

      const names = speciesData.data.names.find(
        (name) => name.language.name === "ko"
      );
      const koName = names.name;

      let koGenera;
      if (
        speciesData.data.genera.find((genera) => genera.language.name === "ko")
      ) {
        const genera = speciesData.data.genera.find(
          (genera) => genera.language.name === "ko"
        );
        koGenera = genera.genus;
      } else {
        const genera = speciesData.data.genera.find(
          (genera) => genera.language.name === "en"
        );
        koGenera = genera.genus;
      }

      let koText;
      if (
        speciesData.data.flavor_text_entries.find(
          (text) => text.language.name === "ko"
        )
      ) {
        const text = speciesData.data.flavor_text_entries.find(
          (text) => text.language.name === "ko"
        );
        koText = text.flavor_text;
      } else {
        const text = speciesData.data.flavor_text_entries.find(
          (text) => text.language.name === "en"
        );
        koText = text.flavor_text;
      }

      const color = speciesData.data.color.name;

      const allData = {
        ...resultData.data,
        koGenera: koGenera,
        koText: koText,
        color: color,
        koName: koName,
      };
      setResultData(allData);
      console.log(resultData);
    };
    fetchData();
  }, [location.pathname]);

  const image =
    resultData?.sprites["other"]["official-artwork"]["front_default"];
  console.log(resultData);

  if (resultData) {
    return (
      <div>
        <div className=" w-2/3 my-20 mx-auto flex flex-row justify-around bg-white">
          <div>
            <img src={image} alt={resultData.koName} />
          </div>
          <div className="flex flex-col justify-around">
            <div className=" text-xl font-semibold text-gray-600">
              도감번호 {resultData.id}번
            </div>
            <div className=" text-4xl font-bold">{resultData.koName}</div>
            <div className="  text-lg font-bold">{resultData.koText}</div>
            <div>
              <table className="w-full">
                <tr className="bg-gray-200 w-full">
                  <th>타입</th>
                  <th>키</th>
                  <th>분류</th>
                </tr>
                <tr>
                  <th>
                    {resultData.types[0].type.name} <br />
                    {resultData.types[1] ? resultData.types[1].type.name : ""}
                  </th>
                  <th>{resultData.height}0cm</th>
                  <th>{resultData.koGenera}</th>
                </tr>
              </table>
            </div>
            <div>
              <table className="w-full">
                <tr className=" bg-gray-200">
                  <th>체력</th>
                  <th>공격</th>
                  <th>방어</th>
                  <th>특공</th>
                  <th>특방</th>
                  <th>스피드</th>
                </tr>
                <tr>
                  <th>{resultData.stats[0].base_stat}</th>
                  <th>{resultData.stats[1].base_stat}</th>
                  <th>{resultData.stats[2].base_stat}</th>
                  <th>{resultData.stats[3].base_stat}</th>
                  <th>{resultData.stats[4].base_stat}</th>
                  <th>{resultData.stats[5].base_stat}</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default DetailPage;
