"use server";

import { serverMutation } from "../core/server";

export const createLesson = async (lessonData) => {
  return serverMutation("/api/lessons", lessonData);
};
