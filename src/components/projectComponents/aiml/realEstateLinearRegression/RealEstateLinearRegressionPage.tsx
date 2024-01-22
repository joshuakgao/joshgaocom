import {
  ContentHeader,
  LatexDiv,
  MainContentDiv,
  Row,
  ScrollDiv,
  Spacer,
} from "../../../commonComponents";
import { RealEstateLinearRegressionCard } from "./RealEstateLinearRegressionCard";
import sqftVsPrice from "../../../../assets/projects/aiml/Linear Regression/houseSizeVsPrice.png";
import lotSizeVsPrice from "../../../../assets/projects/aiml/Linear Regression/lotSizeVsPrice.png";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import sqftVsPriceGif from "../../../../assets/projects/aiml/Linear Regression/sqftVsPrice.gif";
import lotSizeVsPriceGif from "../../../../assets/projects/aiml/Linear Regression/lotSizeVsPrice.gif";

export function RealEstateLinearRegressionPage() {
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
        <h2>Introduction</h2>
        <p>
          In the world of machine learning and data analysis, linear regression
          is one of the fundamental algorithms used for predictive modeling. It
          forms the basis for more complex models and serves as a stepping stone
          to understand the principles of supervised learning. In this project,
          we will first delve into the concept of linear regression with
          stochastic gradient descent using real estate data.
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
        <Row
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
        </Row>
        <h2>Stochastic Gradient Descent</h2>
        <p>
          In order to find the line of best fit, we stochastic gradient descent
          to find the best parameters that minimizes the difference between
          predicted real estate price vs actual real estate price.
        </p>
        <p>The formalized equation is as follows:</p>
        <LatexDiv>
          <Latex>
            {
              "$$ \\theta_j := \\theta_j - \\alpha \\Sigma^m_{j=1} (h_\\theta(x^{(i)})-y^{(i)})*x_j^{(i)}$$"
            }
          </Latex>
          <p>Where:</p>
          <Spacer horizontal size={4} />
          <Latex>{"$ \\theta_j = $ the parameters to be changed"}</Latex>
          <Spacer horizontal size={4} />
          <Latex>{"$ \\alpha = $ learning rate"}</Latex>
          <Spacer horizontal size={4} />
          <Latex>{"$ x_j^{(i)} = $ the sqft and lot size as a vector"}</Latex>
          <Spacer horizontal size={4} />
          <Latex>
            {
              "$ h_\\theta(x^{(i)}) = $ linear regression real estate price prediction, given $x$ as inputs"
            }
          </Latex>
          <Spacer horizontal size={4} />
          <Latex>{"$ y^{(i)} = $ actual real estate price"}</Latex>
        </LatexDiv>
        <p>
          This equation will be repeated across 10 iterations which will
          continuously change 3 parameters that affect the linear regression.
          These three parameters when vectorized are known as{" "}
          <Latex>{"$\\theta$"}</Latex>. This will be represented as:
        </p>
        <LatexDiv>
          <Latex>
            {
              "$$ \\begin{bmatrix} \\theta_0 \\\\ \\theta_1 \\\\ \\theta_2 \\end{bmatrix} $$"
            }
          </Latex>
          <Spacer horizontal size={4} />
          <p>Where:</p>
          <Latex>
            {"$ \\theta_0 = $ bias or more simply, the y-intercept"}
          </Latex>
          <Spacer horizontal size={4} />
          <Latex>{"$ \\theta_1 = $ lot size multiplier"}</Latex>
          <Spacer horizontal size={4} />
          <Latex>{"$ \\theta_2 = $ sqft multiplier"}</Latex>
        </LatexDiv>
        <h2>Result</h2>
        <Row>
          <img src={sqftVsPriceGif} style={{ width: "50%", minWidth: 450 }} />
          <img
            src={lotSizeVsPriceGif}
            style={{ width: "50%", minWidth: 450 }}
          />
        </Row>
        <p>
          <Latex>{"$\\theta$ resulted in the following values:"}</Latex>
        </p>
        <LatexDiv>
          <Latex>
            {
              "$$\\theta = \\begin{bmatrix} 0.094 \\\\ 5.391 \\\\ 172.309 \\end{bmatrix}$$"
            }
          </Latex>
        </LatexDiv>
        <p>
          Through these results, we can quantify which aspects of single family
          houses influences price the most. Here, it is clear that the price of
          real single family houses is influenced much more by square footage
          than lot size.
        </p>
        <h2>Future Improvements</h2>
        <p>
          I kept this artical simple by only providing 2 features of the data
          for ease of visualization. However, we can get a much more accurate
          pricing model if we include other housing aspects such as year built,
          number of beds and baths, hoa fees, and even school ratings.
        </p>
        <p>
          However in the data, we can see that there is a large variance of
          price given lot size and sqaure fottage. This is due to the fact that
          it is hard to quantify the "fanciness" of the house. It's very
          different when you are buying the same sqft house but one is burned
          down, and the other has an indoor sauna. Please note that the pricing
          model here will only provide useful pricing on "average" homes
          relative to it's price.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
