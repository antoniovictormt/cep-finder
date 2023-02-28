import { Header } from "./components/Header";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import api from "./services/api";
import { inputCepMask } from "./utils/inputMask";
import { inputCepWithoutMask } from "./utils/inputWithoutMask";

interface CepProps {
  bairro: string;
  cep: string;
  complemento: string;
  length: number;
  localidade: string;
  logradouro: string;
  uf: string;
}

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState<CepProps>();

  async function handleSearch() {
    if (inputCepWithoutMask(input) === "") {
      alert("Preencha algum CEP");
      return;
    }

    try {
      const response = await api.get(`${inputCepWithoutMask(input)}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Error");
      setInput("");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-cyan-700 p-2 md:p-4 lg:p-8 gap-4">
      <h1 className="text-3xl md:text-5xl lg:text-7xl text-cyan-100 animate-flip w-full text-center">
        Buscador de CEP
      </h1>

      <div className="bg-cyan-100 p-4 flex rounded-lg shadow-cyan-600 w-full justify-between max-w-[600px]">
        <input
          className="bg-transparent rounded-none text-xl text-gray-500 placeholder:text-gray-400 outline-none mr-4 w-full"
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(event) => setInput(inputCepMask(event.target.value))}
          maxLength={8}
        />

        <button>
          <FiSearch
            size={24}
            className="bg-transparent rounded-none flex justify-center items-center text-gray-500 hover:scale-125"
            onClick={handleSearch}
          />
        </button>
      </div>

      {cep !== undefined && (
        <main className="flex justify-center items-center flex-col bg-cyan-100 p-4 rounded-lg w-full gap-4 max-w-[600px]">
          <h2 className="text-4xl">CEP: {cep?.cep}</h2>

          <span className="text-2xl">Logradouro: {cep?.logradouro}</span>
          <span className="text-2xl">Bairro: {cep?.bairro}</span>
          {cep?.complemento.length !== 0 && (
            <span className="text-2xl">Complemento: {cep?.complemento}</span>
          )}
          <span className="text-2xl">
            {cep?.localidade} - {cep?.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
