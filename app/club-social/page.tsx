import React from "react";
import ClubCover from "./clubCover";
import { getPageBySlug } from "@/lib/wordpress";
import ClubCarousel from "./clubCarousel";
import ClubInfo from "./clubInfo";
import ClubRequirements from "./clubRequirements";
import ClubPartner from "./clubPartner";

export default async function Page() {
  const page = await getPageBySlug("club-social");

  return (
    <main>
      <ClubCover page={page} />
      <ClubCarousel page={page} />
      <ClubInfo page={page} />
      <ClubRequirements page={page} />
      <ClubPartner page={page} />
    </main>
  );
}
