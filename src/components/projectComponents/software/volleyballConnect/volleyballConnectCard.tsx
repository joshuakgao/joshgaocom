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
      <h1 className="primary">Volleyball Connect</h1>
    </TitleCard>
  );
}
