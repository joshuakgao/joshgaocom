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
} from "../../../commonComponents";
import { ColorBoxButton } from "../../../commonComponents/colorBoxButton";
import { ImageUploader } from "../../../commonComponents/imageUploader";
import { BackpropagationVisualizationCard } from "./backpropagationVisualizationCard";

export function BackpropagationVisualizationPage() {
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
      <BackpropagationVisualizationCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="1/18/2024"
          skills={["python"]}
          projectComponents="K Nearest Neighbor Algorithm with CIFAR-10 Database Interactive Demo"
          sources={{
            github: "https://github.com/tugonbob/cifar-knn-classifer",
          }}
        />
      </MainContentDiv>
    </ScrollDiv>
  );
}
