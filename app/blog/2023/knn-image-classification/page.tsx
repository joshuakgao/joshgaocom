"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  P,
  PostContent,
  PostImg,
  PostLink,
  PostWrapper,
} from "@/components/ui";

export default function StockPortfolioTracker() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>
        <H1>Method</H1>
        <P>
          This is my implementation of KNN to compare CIFAR-10 images. It's a
          simple pixel-wise comparison approach with the options of l1 or l2
          distance metrics.
        </P>
        <P>
          To do classification, we take k nearest neighbors and their classes,
          and select the most common class occurances as the predicted class. If
          there is a tie in the number of classes, we prefer the class of the
          closest neighbor.
        </P>
        <H1>Results</H1>
        <PostImg src={`${assetsPath}/knn.png`} alt="KNN Results" />
        <P>
          Since KNN relies on the distance of color values at each corresponding
          pixel location, the results can be very unreliable.
        </P>
        <P>
          In the first example, the predicted class is correct however there are
          3 incorrect classes in the 5 nearest neighbors. This is due to the
          fact that the background, which is the majority of pixels, are all of
          similar color.
        </P>
        <P>
          You can see examples where this fails in the 2nd, 4th and 5th
          examples.
        </P>
        <H1>Conclusion</H1>
        <P>
          This is a very flawed approach to image classification, but it was a
          fun exercise to implement KNN from scratch and understand its
          limitations.
        </P>
        <P>
          For a more robust KNN image classification approach, using an image
          embedder would be beneficial. This could involve leveraging
          pre-trained models to extract feature vectors from images, which can
          then be used for distance calculations in the KNN algorithm.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
