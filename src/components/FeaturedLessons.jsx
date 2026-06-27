import { getFeaturedLessons } from "@/lib/api/lessons";
import FeaturedLessonsClient from "./FeaturedLessonsClient";

export default async function FeaturedLessons() {
  const lessons =
    await getFeaturedLessons();

  return (
    <FeaturedLessonsClient
      lessons={lessons}
    />
  );
}