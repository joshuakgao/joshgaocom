import React from "react";
import {
  insideSprouts,
  storeLayout,
} from "../../../../assets/projects/business/SproutsOct22";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { SproutsOct22Card } from "./sproutsOct22Card";

export default function SproutsOct22Page() {
  return (
    <ScrollDiv>
      <SproutsOct22Card toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="10/12/2022"
          sources={{
            googleDrive:
              "https://docs.google.com/spreadsheets/d/1SksgkV0zExFc2ytbq-33UMIv1dxi0D_Qb8BhKIQ-ilc/edit?usp=sharing",
          }}
        />
        <p>
          Sprouts is a health and value focused grocery chain that has the
          potential to grow tremendously. It only has a critical mass of stores
          in California, Texas, Arizona and Florida, meaning that it has a huge
          runway for growth in the rest of the US states. Now the question is:
          in this time of rampant inflation, will this small grocery store
          survive under the intense competition of Walmart, Kroger, and Amazon
          and provide a healthy return based on its growth and valuation.
        </p>
        <h2>Business</h2>
        <p>
          Sprouts Farmers Market engages in the operation of healthy grocery
          stores. They feature an open store layout with fresh produce at the
          center of the store and specialize in fresh, natural and organic
          products.
        </p>
        <img src={insideSprouts} style={styles.img} />
        <h2>Strategy</h2>
        <p>
          <i>Target Customers.</i> Sprouts looks to target health enthusiasts
          through their range of products and experience. This is an absolute
          plus since the move towards healthy eating is a rapidly growing trend.
        </p>
        <p>
          <i>Store format.</i> Sprouts has a store layout different from
          traditional grocery stores. It features bulk foods and produce in the
          center of the store surrounded by a specialty grocery offering. Their
          stores are around 29,000 sqft which is considerably smaller than their
          big box retailer counterparts averaging more than 100,000 sqft. This
          means that they can be more efficient in the sales per sqft, and in
          turn, be more nimble in opening new stores. However, this comes at a
          disadvantage as well. Customers looking for a one stop shop may forego
          Sprouts as an option if they need gas, pharmacy and other non-grocery
          items.
        </p>
        <img src={storeLayout} style={styles.img} />
        <p>
          <i>Distribution.</i> Large brick and mortar retailers understand that
          the logistics of distribution and supply chain is one of the most
          important aspects of their business. Efficiency is the name of the
          game, especially in the grocery market since most products are
          perishable. Sprouts recognizes this and strives to have a distribution
          center within a 250 mile radius from all their stores. Closer
          distribution centers mean a faster shipment from farm to grocery store
          which results in fresher foods in stores and less inventory loss to
          expired food. Sprouts distribution goals will significantly slow down
          their store openings, but will be far made up by their competitive
          edge in grocery freshness and customer loyalty.
        </p>
        <h2>Major Risks</h2>
        <p>
          <i>Supllier and Supply Chain Risk.</i>The grocery industry is a high
          inventory turnover and low margin industry. Any sort of supplier
          constraint could mean Sprouts will be unable to restock their shelves
          and their products will be more costly to acquire, reducing revenue
          and putting significant pressure on an already low margin.
          Additionally, Sprouts suppliers are concentrated in KeHE (primary
          supplier of dry grocery and frozen foods), and many local, regional
          and national farms. KeHE alone accounts for 44% of Sprout’s purchases.
          If there’s any damage in the relationship between KeHE and Sprouts,
          KeHE could increase their prices or simply not provide Sprouts with
          groceries at all. Local and regional farmers are at risk of not
          producing enough and quality control issues. And finally, Walmart,
          Kroger, CostCo and other larger retailers may take priority in a food
          shortage for local farmers due to their ability to put in larger
          orders.
        </p>
        <p>
          <i>Macroeconomic Factors.</i> Even though grocery stores are generally
          recession proof due to the fact that people need to buy food, Sprouts
          may not benefit from this. As a health focused store, Sprouts can
          command higher prices but customers may prefer big box discount stores
          during times of economic distress. Inflation may also worsen Sprout’s
          position as supplier pricing increases, it may be difficult for
          Sprouts to pass that cost to customers in fear of pushing away loyal
          customers.
        </p>
        <h2>Financial Highlights</h2>
        <ul>
          <li>Management expects a 10% growth in 2023</li>
          <li>Declining comparable store sales in 2021</li>
        </ul>
        <p>Income Statement</p>
        <ul>
          <li>$6.1 billion in sales</li>
          <li>5.55% operating margin</li>
          <li>4%</li>
          <li>10.34% ROIC</li>
        </ul>
        <p>Balance Sheet</p>
        <ul>
          <li>$245 million in cash</li>
          <li>$1,096 million in lease liabilites</li>
          <li>$259.6 million in debt</li>
        </ul>
        <h2>Valuation</h2>
        <h3>Revenue Growth</h3>
        <p>
          I do believe that Sprouts will grow since they have a huge amount of
          States they aren’t even operating in. However, I think that
          management’s 10% growth expectation is ambitious. I’m going to guess a
          6% growth rate for 6 years, and then gradually drop it down to 2%
        </p>
        <h3>Margins</h3>
        <p>
          Sprouts is more similar to Whole Foods and Trader Joes rather than the
          general grocery stores like Kroger, Albertsons and Walmart. Therefore,
          Sprouts will have the higher 5% to 6% margins. However since they are
          still small and have yet to reach any significant economies of scale,
          they will have a lower 4% to 5% margin and gradually reach the higher
          margins as they grow.
        </p>
        <h3>Tax Rate</h3>
        <p>
          For the last 3 years, Sprouts’ tax rate has been at a stable 24%. So
          I’m going to keep it as such, until year 6, where I’ll gradually bring
          it down to the corporate tax rate of 21%.
        </p>
        <h3>Capex</h3>
        <p>
          Sprouts is going to need to reinvest quite a bit in order to support
          the 6% growth that I’m estimating, so I’m going to set it at 3% of
          revenues and gradually bring it down a bit after year 6.
        </p>
        <h3>Discount Rate</h3>
        <p>
          The historic annual return of the S&P 500 is about 10% annually. So my
          minimum required return aka the discount rate is 10%.
        </p>
        <h3>Terminal Growth Rate</h3>
        <p>
          I’m using the current{" "}
          <a
            href="https://www.cnbc.com/quotes/US10Y"
            target="_blank"
            rel="noopener noreferrer"
          >
            US 10 Year T bond
          </a>{" "}
          rate of 3.93%
        </p>
        <h3>Result</h3>
        <p>
          After taking a net present value of the Free Cash Flow calculated with
          the assumptions above, and subtracting out net debt we arrive at an
          estimated intrinsic value of $36.20 per share. At the time of writing,
          Sprouts Farmers Market’s stock is at $27.67 per share, implying a 30%
          discount at current prices.
        </p>
        <p>See full valuation in google drive link</p>
        <h2>Conclusion</h2>
        <p>
          I think I made some very reasonable assumptions, but my intuition
          tells me they are slightly on the optimistic side. Also, Sprouts has a
          TON of leasing liabilities, and I didn’t add those leases into net
          debt. If I subtract out the $1.7 billion of leases from our estimated
          intrinsic value, we get an intrinsic value of about $21.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}

type StyleSheet = {
  [key: string]: React.CSSProperties;
};

const styles: StyleSheet = {
  img: {
    width: "100%",
    height: "100%",
  },
};
