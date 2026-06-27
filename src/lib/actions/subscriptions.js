'use server';

import { serverPatch } from "../core/server";

export const createSubscription = async (subInfo) => {
  return serverPatch(
    `/api/users/premium/${subInfo.email}`
  );
};
