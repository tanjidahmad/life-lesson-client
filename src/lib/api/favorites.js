import { serverFetch } from "../core/server";

export const getMyFavorites = async (email) => {
  return serverFetch(`/api/favorites/${email}`);
};