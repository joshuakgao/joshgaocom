import "katex/dist/katex.min.css";
import { useState } from "react";
import { backend } from "../../../../backend";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { RealEstateLinearRegressionCard } from "../realEstateLinearRegression/realEstateLinearRegressionCard";
import { ColorBoxButton } from "../../../commonComponents/colorBoxButton";

export function GptNanoPage() {
  const [query, setQuery] = useState<string>("Once upon a time");
  const [maxLength, setMaxLength] = useState<string>("100");
  const [modelResponses, setModelResponses] = useState<{
    gpt_nano: string;
    gpt_2: string;
    civil_finetune: string;
  }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const compareModels = async () => {
    console.log("HI");
    if (!query) return;

    setError(false);
    setLoading(true);

    try {
      const response = await fetch(
        `${backend.url}/aiml/gpt-nano?query=${query}&max_length=${maxLength}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error("" + data.error);

      setModelResponses(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollDiv>
      <RealEstateLinearRegressionCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="6/4/2023"
          skills={["python"]}
          projectComponents="Machine Learning Linear Regression Implementation"
          sources={{
            github:
              "https://github.com/tugonbob/stanford-cs229-andrew-ng/blob/main/Ch1-SupervisedLearning/1-LinearRegression/1.1.1-LmsAlgorithm.ipynb",
          }}
        />
        <p>Hi GPT-NANO</p>
        <ColorBoxButton
          style={{ alignSelf: "center", minHeight: 50 }}
          onClick={compareModels}
          isLoading={loading}
        >
          <p style={{ margin: 0, color: "var(--primary)" }}>Query Models</p>
        </ColorBoxButton>
        {error ? (
          <p style={{ color: "red", fontSize: 16, alignSelf: "center" }}>
            Something went wrong, please try again.
          </p>
        ) : null}
        <h1>gpt-nano</h1>
        <p>{modelResponses?.gpt_nano}</p>
        <h1>gpt-2</h1>
        <p>{modelResponses?.gpt_2}</p>
        <h1>civil-finetune</h1>
        <p>{modelResponses?.civil_finetune}</p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
