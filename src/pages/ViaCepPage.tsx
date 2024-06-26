import { ChangeEvent, useEffect, useState } from "react";
import ViaCepService, {
  IViaCepResponse,
  ViaCepError,
} from "../services/ViaCepService";

const viaCepService = new ViaCepService();

function ViaCepPage() {
  const [message, setMessage] = useState<string | null>();
  const [address, setAddress] = useState<string | null>();
  const [history, setHistory] = useState<IViaCepResponse[]>([]);

  const validateCep = (cep: string): boolean => /^[0-9]{8}$/.test(cep);

  const fetchAddress = async (cep: string) => {
    try {
      const data = await viaCepService.getAddressByCep(cep);
      setAddress(viaCepService.displayAddress(data));
      setMessage(null);
    } catch (error: unknown) {
      if (error instanceof ViaCepError) {
        setMessage(error.message);
      }
    }
  };

  const cepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    if (!validateCep(cep)) {
      setMessage("Informe um CEP válido");
      setAddress(null);
    } else {
      fetchAddress(cep);
    }
  };

  useEffect(() => {
    setHistory(viaCepService.getHistory());
  }, []);

  return (
    <div>
      <h1>ViaCep</h1>
      <div>
        <input onChange={cepChange} type="text" />
        <p className="mt-2 text-sm text-red-600">{message}</p>
        {address && <p className="mt-2 text-sm">{address}</p>}
      </div>
      <div>
        <h2>Histórico de</h2>
        <ul>
          {history.map((item) => (
            <li key={item.cep}>
              {item.cep}: {viaCepService.displayAddress(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViaCepPage;
