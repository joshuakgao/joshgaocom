import thumbnail from "../../../../assets/projects/aiml/Linear Regression/thumbnail.png";
import { TitleCard } from "../../titleCard";

export function RealEstateLinearRegressionCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/aiml/linearRegression"
      toFullscreen={toFullscreen}
      textPosition={["left", "top"]}
      backgroundImage={thumbnail}
      backgroundDarken={50}
    >
      <h1 className="primary">Real Estate Linear Regression</h1>
      <h2 className="primary">With Stochastic Gradient Descent</h2>
    </TitleCard>
  );
}
