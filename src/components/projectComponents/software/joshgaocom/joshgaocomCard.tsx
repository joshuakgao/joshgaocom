import { TitleCard } from "../../titleCard";

export function JoshgaocomCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      to="/software/joshgaocom"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundColor="#e0e0e0"
    >
      <h1>joshgao.com</h1>
      <h2>A website showcasing Joshua Gao's projects</h2>
    </TitleCard>
  );
}
