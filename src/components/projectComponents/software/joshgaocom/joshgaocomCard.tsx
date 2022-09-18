import { TitleCard } from "../../titleCard";

export function JoshgaocomCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundColor="#00a2e8"
      to="/software/joshgaocom"
      toFullscreen={toFullscreen}
    >
      <h1>joshgao.com</h1>
      <h2>A website showcasing Joshua Gao's projects</h2>
    </TitleCard>
  );
}
