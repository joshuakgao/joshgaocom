import {
  ContentHeader,
  MainContentDiv,
  RowDiv,
  ScrollDiv,
} from "../../../../commonComponents";
import { LinearRegressionCard } from "./LinearRegressionCard";
import sqftVsPrice from "../../../../../assets/projects/aiml/stanfordCs229/1.1 Linear Regression/houseSizeVsPrice.png";
import lotSizeVsPrice from "../../../../../assets/projects/aiml/stanfordCs229/1.1 Linear Regression/lotSizeVsPrice.png";

export function LinearRegressionPage() {
  return (
    <ScrollDiv>
      <LinearRegressionCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="6/4/2023"
          skills={["python"]}
          projectComponents="Machine Learning Linear Regression Implementation"
          sources={{
            github:
              "https://github.com/tugonbob/Stanford-CS229-Andrew-Ng/tree/main/Ch1-SupervisedLearning/1-LinearRegression",
          }}
        />
        <h2>Introduction</h2>
        <p>
          In the world of machine learning and data analysis, linear regression
          is one of the fundamental algorithms used for predictive modeling. It
          forms the basis for more complex models and serves as a stepping stone
          to understand the principles of supervised learning. In this project,
          we will first delve into the concept of linear regression using real
          estate data as an example. Then, into a variation known as locally
          weighted linear regression. And finally, explore the simple normal
          equations to derive a linear regression.
        </p>
        <h2>What is Linear Regression?</h2>
        <p>
          Linear regression is a statistical modeling technique that aims to
          establish a linear relationship between a dependent variable (also
          known as the target variable) and one or more independent variables
          (also known as predictors or features). It assumes that the
          relationship between the variables can be represented by a straight
          line.
        </p>
        <h2>The Dataset</h2>
        <p>
          To illustrate linear regression, let's consider a real estate dataset.
          The dataset contains information about different houses, such as the
          size of the house and lot (in square feet) and the corresponding sale
          prices (in dollars). Our goal is to build a linear regression model
          that predicts the house price based on its size.
        </p>
        <h3>Data Visualization</h3>
        <p>
          Before diving into model building, it's crucial to explore and
          visualize the data to gain insights. Let's plot the data points on two
          scatter plots, with house size on the x-axis and sale price on the
          y-axis and lot size on
        </p>
        <RowDiv
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <img
            src={sqftVsPrice}
            style={{ width: "50%", minWidth: 450 }}
            alt=""
          />
          <img
            src={lotSizeVsPrice}
            style={{ width: "50%", minWidth: 450 }}
            alt=""
          />
        </RowDiv>
        <h2>Hypothesis</h2>
        <h2>Cost Function</h2>
        <h2>Minimizing the Cost Function</h2>
        <h2>Conclusion</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
