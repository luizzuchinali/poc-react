import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import axios from "axios";
import ViaCepService, {
  IViaCepResponse,
} from "../../src/services/ViaCepService";

vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe.concurrent("ViaCepService", () => {
  const validCep = "01001-000";
  const invalidCep = "00000-000";
  const viaCepResponse: IViaCepResponse = {
    cep: validCep,
    logradouro: "Praça da Sé",
    complemento: "lado ímpar",
    bairro: "Sé",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    erro: undefined,
  };

  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("should fetch address data successfully from the API", async () => {
    const viaCepService = new ViaCepService();

    mockedAxios.get.mockResolvedValue({ data: viaCepResponse });

    const response = await viaCepService.getAddressByCep(validCep);

    expect(response).toEqual(viaCepResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://test-viacep.com.br/ws/${validCep}/json/`,
    );
  });

  it("should throw an error when the API call fails", async () => {
    const viaCepService = new ViaCepService();

    mockedAxios.get.mockRejectedValue(new Error("API call failed"));

    await expect(viaCepService.getAddressByCep(validCep)).rejects.toThrow(
      "Falha ao tentar obter os detalhes do CEP: Error: API call failed",
    );
  });

  it("should throw an error for an invalid CEP", async () => {
    const viaCepService = new ViaCepService();

    mockedAxios.get.mockResolvedValue({ data: { erro: true } });

    await expect(viaCepService.getAddressByCep(invalidCep)).rejects.toThrow(
      `Não foi encontrado detalhes para o CEP: ${invalidCep}`,
    );
  });

  it("should save fetched address to local storage", async () => {
    const viaCepService = new ViaCepService();

    mockedAxios.get.mockResolvedValue({ data: viaCepResponse });

    await viaCepService.getAddressByCep(validCep);

    const history = JSON.parse(localStorage.getItem("history") || "[]");
    expect(history).toContainEqual(viaCepResponse);
  });

  it("should retrieve history from local storage", () => {
    localStorage.setItem("history", JSON.stringify([viaCepResponse]));
    const viaCepService = new ViaCepService();
    const history = viaCepService.getHistory();

    expect(history).toEqual([viaCepResponse]);
  });
});
