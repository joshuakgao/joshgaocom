import { TitleCard } from "../../titleCard";
import homepage from "../../../../assets/projects/appdev/joshgaocom/homepage.png";

export function JoshgaocomCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      to="/appdev/joshgaocom"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={homepage}
    >
      <h1>joshgao.com</h1>
      <h2>A website showcasing Josh Gao's projects</h2>
    </TitleCard>
  );
}
