import { Pokemon } from "models";
import { ApiResponse } from "./Api.types";
import { api } from "./Api";

const getList = async (): Promise<ApiResponse<Pokemon[]>> => {
  const response = await api.get("/pokemon");

  if (response.status !== 200) {
    return { ok: false, messageCode: response.data.messageCode };
  } else
    return {
      ok: true,
      data: (response.data.results as Pokemon[]).map((x) => ({
        ...x,
        url: `https://img.pokemondb.net/artwork/${x.name}.jpg`,
      })),
    };
};

export const pokemonApi = {
  getList,
};
