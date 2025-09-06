"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  InlineCode,
  P,
  PostContent,
  PostImg,
  PostWrapper,
} from "@/components/ui";

export default function MlRealEstateValuation() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>
        <H1>Zillow Dataset</H1>
        <P>
          I collect 9,750 listings from Zillow using the Realty Mole Property
          Api. Each listing includes data attributes such as address, number of
          bed and bathrooms, city, county, days on market, lot and square
          footage size, and year built. This data is filtered out for single
          familiy homes with prices lower than $1M, a lot size less than 20,000
          sqft, and a square footage of less than 3,000.
        </P>
        <P>
          Below is a distribution of the square footage and lot size vs price.
        </P>
        <PostImg
          src={`${assetsPath}/zillow-dataset-sqft.png`}
          alt="Zillow Square Footage vs Price"
        />
        <PostImg
          src={`${assetsPath}/zillow-dataset-lot.png`}
          alt="Zillow Lot Size vs Price"
        />

        <H1>Finding the Best Model: Gradient Descent</H1>
        <P>
          To find the best fit line for the data, I implement a multivariable
          linear regression model using stochastic gradient descent. The
          variables include:{" "}
          <span className="italic">
            number of bathrooms, number of bedrooms, days on market, lot size,
            square footage, and year built.
          </span>
        </P>
        <P>I train with a learning rate of 1e-10 over 5 iterations.</P>
        <P>
          However, it seems that the coefficient for all variables except for
          square footage and lot size were close to zero - effectively remove
          their terms from the linear equation. Square footage was the variable
          that most affected the predicted listing price.
        </P>
        <P>
          I train again with just the square footage and lot size variables.
        </P>
        <PostImg src={`${assetsPath}/sgd-animation.gif`} alt="SGD Animation" />
        <H1>Valuation Model</H1>
        <P>After training, we get our final valuation model:</P>
        {/* <Katex>{`$$\\text{Valuation} = 0.07 + 11.081 * \\text{lot size} + 148.837 * \\text{square footage}$$`}</Katex> */}
        <InlineCode>
          Valuation = 0.07 + (11.081 * lot size) + (148.837 * square footage)
        </InlineCode>
        <P>
          As you can see, square footage has the largest coefficient which means
          it affects the valuation the most.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
