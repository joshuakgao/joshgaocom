import thumbnail from "../../../../../assets/projects/ai-ml/standford-cs229/lectureThumbnail.jpg";
import { TitleCard } from "../../../titleCard";

export function LinearRegressionCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/ai-ml/standford-cs229-linearRegression"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={thumbnail}
      backgroundDarken={30}
    >
      <h1 className="primary">1.1 Linear Regression</h1>
      <h2 className="primary">
        Standford CS229: Machine Learning taught by Andrew Ng
      </h2>
    </TitleCard>
  );
}
