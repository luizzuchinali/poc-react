import axios from "axios";

/**
 * Defines the structure of the response received from the ViaCep API.
 */
interface IViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  erro?: string;
}

/**
 * Custom error class for handling ViaCep service errors.
 */
class ViaCepError extends Error {
  /**
   * Constructs a new ViaCepError instance.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "ViaCepError";
  }
}

/**
 * Service class for fetching and manipulating address data from the ViaCep API.
 */
class ViaCepService {
  private baseUrl: string = import.meta.env.VITE_VIA_CEP_BASE_URL;
  private readonly localStorageKey = "history";

  private history: IViaCepResponse[] = [];

  constructor() {
    const history = localStorage.getItem(this.localStorageKey);
    if (history) {
      this.history = JSON.parse(history);
    }
  }

  /**
   * Fetches address data by CEP (ZIP code) from the ViaCep API.
   * @param cep - The CEP (ZIP code) to fetch the address for.
   * @returns A promise that resolves to the address data.
   * @throws ViaCepError if the request fails or no data is found.
   */
  async getAddressByCep(cep: string): Promise<IViaCepResponse> {
    let response;
    try {
      response = await axios.get<IViaCepResponse>(
        `${this.baseUrl}/${cep}/json/`,
      );
    } catch (error) {
      throw new ViaCepError(
        `Falha ao tentar obter os detalhes do CEP: ${error}`,
      );
    }

    if (response.data && !response.data.erro) {
      this.history.push(response.data);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.history));
      return response.data;
    } else {
      throw new ViaCepError(`Não foi encontrado detalhes para o CEP: ${cep}`);
    }
  }

  /**
   * Retrieves the history of fetched addresses from local storage.
   * @returns An array of address data.
   */
  getHistory(): IViaCepResponse[] {
    return this.history;
  }

  /**
   * Formats and displays the address data.
   * @param address - The address data to display.
   * @returns A formatted string representing the address.
   */
  displayAddress(address: IViaCepResponse): string {
    return `Endereço: ${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf}`;
  }
}

export { ViaCepError };
export type { IViaCepResponse };
export default ViaCepService;
