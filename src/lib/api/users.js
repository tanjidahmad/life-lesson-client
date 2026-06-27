import { serverPatch } from "../core/server";

export const updateProfile =
  async (email, data) => {
    return serverPatch(
      `/api/users/profile/${email}`,
      data
    );
  };