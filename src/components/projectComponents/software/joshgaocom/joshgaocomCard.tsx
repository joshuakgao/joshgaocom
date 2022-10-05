import { TitleCard } from "../../titleCard";
import homepage from "../../../../assets/projects/software/joshgaocom/homepage.png";

export function JoshgaocomCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      to="/software/joshgaocom"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={homepage}
    >
      <h1>joshgao.com</h1>
      <h2>A website showcasing Joshua Gao's projects</h2>
    </TitleCard>
  );
}
