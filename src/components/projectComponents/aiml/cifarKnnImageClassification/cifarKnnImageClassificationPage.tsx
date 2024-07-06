import { useState } from "react";
import Latex from "react-latex-next";
import cifarImages from "../../../../assets/projects/aiml/cifarKnnImageClassification/cifarImages.png";
import { backend } from "../../../../backend";
import {
  Col,
  ContentHeader,
  LatexDiv,
  MainContentDiv,
  Row,
  ScrollDiv,
  Spacer,
  ColorBoxButton,
  ImageUploader,
} from "../../../commonComponents";
import { CifarKnnImageClassificationCard } from "./cifarKnnImageClassificationCard";

export function CifarKnnImageClassificationPage() {
  const [image, setImage] = useState<File | null>(null);
  const [k, setK] = useState<string>("5");
  const [distanceFunction, setDistanceFunction] = useState<string>("l1");
  const [loading, setLoading] = useState<boolean>(false);
  const [knnResponse, setKnnResponse] = useState<{
    prediction: string;
    knn_image_and_labels: { image: string; label: string }[];
  }>();
  const [error, setError] = useState(false);

  const runKnn = async () => {
    if (!image) return;

    setError(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `${backend.url}/aiml/cifar-knn-image-classification?k=${k}&distance_function=${distanceFunction}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error("" + data.error);

      setKnnResponse(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollDiv>
      <CifarKnnImageClassificationCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="1/18/2024"
          skills={["python"]}
          projectComponents="K Nearest Neighbor Algorithm with CIFAR-10 Database Interactive Demo"
          sources={{
            github: "https://github.com/tugonbob/cifar-knn-classifer",
          }}
        />
        <h2>Interactive Demo</h2>
        <Col
          style={{
            border: "1px solid lightgrey",
            borderRadius: "var(--borderRadius)",
            padding: 52,
          }}
        >
          <ImageUploader image={image} setImage={setImage} />
          <Spacer />
          <Row style={{ justifyContent: "flex-start", flexWrap: "wrap" }}>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="k dropdown">K:</label>
              <select
                style={{ width: 50 }}
                id="k dropdown"
                value={k}
                onChange={(e) => setK(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </Col>
            <Spacer horizontal />
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label htmlFor="distance function dropdown">
                Distance Function:
              </label>
              <select
                style={{ width: 180 }}
                id="k dropdown"
                value={distanceFunction}
                onChange={(e) => setDistanceFunction(e.target.value)}
              >
                <option value="l1">l1 (Manhattan Distance)</option>
                <option value="l2">l2 (Euclidean Distance)</option>
              </select>
            </Col>
          </Row>
          <Spacer />
          <Col>
            <ColorBoxButton
              style={{ alignSelf: "center", minHeight: 50 }}
              onClick={runKnn}
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
          <Spacer />
          {knnResponse ? (
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--accent)",
                borderRadius: "var(--borderRadius)",
                padding: 16,
                paddingBottom: 32,
              }}
            >
              <h4>Prediction:</h4>
              <p style={{ marginTop: 0 }}>
                (The most common category in the below nearest images)
              </p>
              <h3 style={{ marginTop: 0, color: "red" }}>
                {knnResponse.prediction.toUpperCase()}
              </h3>
              <h4>Most Similar Images:</h4>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: 500,
                  flexWrap: "wrap",
                }}
              >
                {knnResponse.knn_image_and_labels.map(({ image, label }, i) => (
                  <Col
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 5,
                      marginLeft: 5,
                    }}
                  >
                    <p>{label}</p>
                    <img src={image} style={{ width: 75 }} />
                  </Col>
                ))}
              </Row>
            </Col>
          ) : null}
        </Col>
        <h2>K-Nearest Neighbors Algorithm</h2>
        <p>
          <Latex>
            The KNN algorithm finds the $k$ number of images that are most
            similar to the input image. And gives a prediction based on the most
            common class of those similar images.
          </Latex>
        </p>
        <h2>Selected Database</h2>
        <p>
          The CIFAR-10 dataset consists of 60,000 32x32 colour images in 10
          classes, with 6,000 images per class. There are 50,000 training images
          and 10,000 test images.
        </p>
        <Spacer />
        <img
          src={cifarImages}
          style={{
            width: "75%",
            minWidth: 450,
          }}
        />
        <h2>Distance Functions</h2>
        <p>
          The algorithm determines how similar another image is through a
          distance function. In this demo we will provide two distance formulas:
          L1 Distance and L2 Distance
        </p>
        <h3>L1 Distance (Manhattan Distance)</h3>
        <p>The L1 distance function is formally defined as follows:</p>
        <LatexDiv>
          <Latex>{"$$d(p,q)=\\Sigma_i^n \\mid p_i - q_i \\mid $$"}</Latex>
          <Spacer size={4} />
          <p>Where:</p>
          <Latex>$ d() = $ distance function</Latex>
          <Spacer size={4} />
          <Latex>$p = $ input image</Latex>
          <Spacer size={4} />
          <Latex>$q = $ comparison image</Latex>
          <Spacer size={4} />
          <Latex>
            {
              "$\\Sigma_i^n \\mid p_i - q_i \\mid = $ the sum of the absolute difference of every corresponding pixel of both images"
            }
          </Latex>
        </LatexDiv>
        <h3>L2 Distance (Euclidean Distance)</h3>
        <p>The L2 distance function is formally defined as follows:</p>
        <LatexDiv>
          <Latex>{"$$d(p, q) = \\sqrt{\\Sigma_i^n(q_i-p_i)^2}$$"}</Latex>
          <Spacer size={4} />
          <p>Where:</p>
          <Latex>$ d() = $ distance function</Latex>
          <Spacer size={4} />
          <Latex>{"$p = $ input image"}</Latex>
          <Spacer size={4} />
          <Latex>{"$q = $ comparison image"}</Latex>
          <Spacer size={4} />
          <Latex>
            {
              "$\\Sigma_i^n \\mid p_i - q_i \\mid = $ the square root of the sum of the square difference of every corresponding pixel of both images"
            }
          </Latex>
        </LatexDiv>
        <h2>Caveats</h2>
        <p>
          KNN algorithm is almost never used for image classification because of
          its computationally intensive nature. Here, I only use 32x32 images.
          As I scale up those images, the number of calculations required will
          exponentially increase. Additionally, the classifiation process is
          heavily influenced by database bias and fails to generalize to other
          images.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
