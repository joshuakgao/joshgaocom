import { TitleCard } from "../../titleCard";
import beach from "../../../../assets/projects/software/volleyballConnect/beach.jpg";

export function VolleyballConnectCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/software/volleyballConnect"
      toFullscreen={toFullscreen}
      backgroundImage={beach}
    >
      <h1 style={{ color: "white" }}>Volleyball Connect</h1>
      <h2 style={{ color: "white" }}>
        A mobile app for all volleyball players to meet and play
      </h2>
    </TitleCard>
  );
}
