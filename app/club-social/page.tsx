import React from "react";
import ClubCover from "./clubCover";
import { getPageBySlug } from "@/lib/wordpress";

export default async function Page() {
  const page = await getPageBySlug("club-social");

  return (
    <main>
      <ClubCover page={page} />
    </main>
  );
}
