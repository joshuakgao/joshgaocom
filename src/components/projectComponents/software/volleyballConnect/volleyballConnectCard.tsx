import { TitleCard } from "../../titleCard";

export function VolleyballConnectCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/software/volleyballConnect"
      backgroundColor="lightblue"
      toFullscreen={toFullscreen}
    >
      <h1>Volleyball Connect</h1>
      <h2>
        A mobile app platform for all volleyball players to connect, meet, and
        play
      </h2>
    </TitleCard>
  );
}
