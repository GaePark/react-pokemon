import { useNavigate } from "react-router-dom";

const Pokemon = ({ pokeDB }) => {
  const image = pokeDB["sprites"]["other"]["official-artwork"]["front_default"];
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`/${pokeDB.id}`);
  };
  return (
    <div className=" w-1/5 h-1/4 p-1">
      <div
        className=" transition duration-500 drop-shadow-lg bg-slate-700 hover:bg-slate-900 rounded-md w-full h-full flex flex-col items-center justify-between cursor-pointer p-2"
        onClick={onClickDetail}
      >
        <div
          className="w-full font-bold text-lg "
          style={{ color: pokeDB.color }}
        >
          {pokeDB.id}
        </div>
        <div className="w-full h-2/3">
          <img
            className=" w-full h-full object-contain mx-auto"
            src={image}
            alt={pokeDB.ko}
          />
        </div>
        <div className="font-bold">
          <div className=" text-white">{pokeDB.ko}</div>
          <div style={{ border: `1px solid ${pokeDB.color}` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
