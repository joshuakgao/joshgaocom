import { TitleCard } from "../../titleCard";

export function JoshgaocomCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundColor="#00a2e8"
      to="/software/joshgaocom"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">joshgao.com</h1>
    </TitleCard>
  );
}
