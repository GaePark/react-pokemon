import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

const PageBtn = ({ setPage, pokeResults }) => {
  const test = Math.ceil(pokeResults.length / 20);
  const a = Math.floor(test / 10);
  const b = a * 10;

  const pageNum = Array.from({ length: test }, (v, i) => i + 1);
  const [num, setNum] = useState(0);
  const PG = pageNum.slice(num, num + 10);

  const onClickNext = () => {
    if (num >= b) return;
    setPage(num + 10);
    setNum(num + 10);
  };

  const onClickPrev = () => {
    if (num <= 0) return;
    setPage(num - 10);
    setNum(num - 10);
  };

  const onClickPage = (e) => {
    setPage(Number(e.target.id) - 1);
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <button onClick={onClickPrev}>
        <GrPrevious />
      </button>
      <div
        className="flex justify-center text-center"
        style={{ width: "400px" }}
      >
        {PG.map((el) => (
          <div
            key={el}
            id={el}
            className=" w-8 h-8 mx-2 text-xl cursor-pointer "
            onClick={onClickPage}
          >
            {el}
          </div>
        ))}
      </div>
      <button onClick={onClickNext}>
        <GrNext />
      </button>
    </div>
  );
};

export default PageBtn;
