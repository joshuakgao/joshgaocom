import React, { useState, ChangeEvent } from "react";
import {
  ContentHeader,
  LatexDiv,
  MainContentDiv,
  ScrollDiv,
  Spacer,
} from "../../../commonComponents";
import { CifarKnnImageClassificationCard } from "./CifarKnnImageClassificationCard";
import Latex from "react-latex-next";
import cifarImages from "../../../../assets/projects/aiml/cifarKnnImageClassification/cifarImages.png";

export function CifarKnnImageClassificationPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await fetch(
        "https://relaxing-vulture-trusty.ngrok-free.app/aiml/test",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      setData(data);
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
          The CIFAR-10 dataset consists of 60000 32x32 colour images in 10
          classes, with 6000 images per class. There are 50000 training images
          and 10000 test images.
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
        <h2>Interactive Demo</h2>
        <h3>Upload Image</h3>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Image</button>
          <img src={`data:image/jpeg;base64,${data.resized_image}`} />
        </div>
      </MainContentDiv>
    </ScrollDiv>
  );
}
