import thumbnail from "../../../../../assets/projects/aiml/stanfordCs229/lectureThumbnail.jpg";
import { TitleCard } from "../../../titleCard";

export function LinearRegressionCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/aiml/stanfordCs229/linearRegression"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={thumbnail}
      backgroundDarken={30}
    >
      <h1 className="primary">1.1 Linear Regression</h1>
      <h2 className="primary">Stanford CS229: Machine Learning</h2>
    </TitleCard>
  );
}
