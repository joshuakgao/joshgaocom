import "katex/dist/katex.min.css";
import { useState } from "react";
import { backend } from "../../../../backend";
import {
  Col,
  ColorBoxButton,
  ContentHeader,
  MainContentDiv,
  Row,
  ScrollDiv,
  Spacer,
} from "../../../commonComponents";
import { GptNanoCard } from "./gptNanoCard";

export function GptNanoPage() {
  const [query, setQuery] = useState<string>("The meaning of life is:");
  const [maxTokens, setMaxTokens] = useState<string>("50");
  const [modelResponses, setModelResponses] = useState<{
    gpt_nano: string;
    gpt_2: string;
  }>({
    gpt_nano: `The meaning of life is: The meaning of life should be in God to us, to man, and also to the environment. It is not merely that life is good and healthy, it is also that it improves the nature of life and nature`,
    gpt_2: `The meaning of life is: "Let him give you up to the angels." 1 James 10:32 We have become free, and so have God. Romans 5:5 He is "wonderful" because we cannot`,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const compareModels = async () => {
    if (!query) return;

    setError(false);
    setLoading(true);

    try {
      const response = await fetch(
        `${backend.url}/aiml/gpt-nano?query=${query}&max_tokens=${maxTokens}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

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
      <GptNanoCard toFullscreen />
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

        <h2>Interactive Demo</h2>
        <Row
          style={{
            border: "1px solid lightgrey",
            borderRadius: "var(--borderRadius)",
            padding: 52,
            alignItems: "flex-start",
          }}
        >
          <Col>
            <label htmlFor="models query">Query:</label>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <Spacer />
            <label htmlFor="max tokens">Max Tokens:</label>
            <select
              style={{ width: 50 }}
              id="max tokens"
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
            >
              <option value="1">10</option>
              <option value="2">20</option>
              <option value="3">30</option>
              <option value="4">40</option>
              <option value="5">50</option>
              <option value="6">60</option>
              <option value="7">70</option>
              <option value="8">80</option>
              <option value="9">90</option>
              <option value="10">100</option>
            </select>
            <Spacer size={32} />
            <Col>
              <ColorBoxButton
                style={{ minHeight: 50 }}
                onClick={compareModels}
                isLoading={loading}
              >
                <p style={{ margin: 0, color: "var(--primary)" }}>Run KNN</p>
              </ColorBoxButton>
              {error ? (
                <p style={{ color: "red", fontSize: 16, alignSelf: "center" }}>
                  Something went wrong, please try again.
                </p>
              ) : null}
            </Col>
          </Col>
          <Spacer horizontal size={32} />
          <Row
            style={{
              flex: 1,
              alignItems: "flex-start",
              border: "1px solid var(--accent)",
              borderRadius: "var(--borderRadius)",
              padding: 16,
              minHeight: 164,
            }}
          >
            <Col style={{ flex: 1 }}>
              <h3 style={{ textAlign: "center" }}>gpt-nano</h3>
              <p style={{ textAlign: "justify" }}>{modelResponses?.gpt_nano}</p>
            </Col>
            <Spacer horizontal size={32} />
            <Col style={{ flex: 1 }}>
              <h3 style={{ textAlign: "center" }}>gpt-2</h3>
              <p style={{ textAlign: "justify" }}>{modelResponses?.gpt_2}</p>
            </Col>
          </Row>
        </Row>
      </MainContentDiv>
    </ScrollDiv>
  );
}
