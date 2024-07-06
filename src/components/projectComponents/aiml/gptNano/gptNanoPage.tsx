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
    gpt_nano: `The meaning of life is: an important thing for people, who are living and dying. The concept of existence includes every aspect of life, which has value over all the aspects in life so that one lives in balance. People who live with their faith`,
    gpt_2: `The meaning of life is: You are immortal in the same way if I live. It's just that I'm always right there. If you don't give me enough money and then you want me to do a better job, that's`,
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
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: 200 }}
            />
            <Spacer />
            <label htmlFor="max tokens">Max Tokens:</label>
            <select
              style={{ width: 50 }}
              id="max tokens"
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
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
