import React from "react";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
  GoogleSheetsEmbed,
} from "../../../commonComponents";
import { RealEstateDealFinderCard } from "./realEstateDealFinderCard";

export function RealEstateDealFinderPage() {
  return (
    <ScrollDiv>
      <RealEstateDealFinderCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="20/6/2022"
          skills={["python", "googleDrive", "sql"]}
          projectComponents={
            "Zillow & Redfin Data Scraping - Proxies - Google Sheets"
          }
          sources={{
            github: "https://github.com/tugonbob/ZillowListingsScraper.git",
            googleDrive:
              "https://docs.google.com/spreadsheets/d/1qD2yjneLiJczgDRSSvbo4YF5NHOBaaOxutOvw86UOtg/edit?usp=sharing",
          }}
        />
        <h3>Quick Summary</h3>
        <p>
          I scrape Zillow and Redfin listings and analyze the data in Google
          Sheets to find real estate deals. The Zillow website has bot
          protection, so I avoid this by using proxies to change my ip address
          to scrape the data anyways.
        </p>
        <h2>Introduction</h2>
        <p>
          Trying to find your next great real estate investment is tedious when
          your looking through Zillow and clicking on random houses over and
          over. That's when it occurred to me that I could automate this
          process. With a few criteria in mind, I can sift through thousands of
          Zillow listings, identifying and filtering out the obvious losers, and
          then conduct a more thorough analysis of potential good deals.
        </p>
        <h2>My Real Estate Criteria</h2>
        <p>
          I wanted to find a house in a good area in Greater Houston that would
          cash flow at a decent rate. Since a "good area" is a very subjective
          matter, we need a quantifiable figure that can represent that. I
          decided on school ratings because not only does a better school rating
          mean a better area, but also the area appreciates more as well. To
          estimate cash flow, I would normally estimate the cap rate of the
          property, but neither Zillow or Redfin give estimates on operating
          expenses. Therefore, I moved to the common rule of thumb that the
          estimated monthly rent of a property should be at least 1% of the
          purchase price. But first, we need to gather that information for each
          property.
        </p>
        <h2>Data Collection</h2>
        <p>
          I collect data by scraping Zillow's website source code and by taking
          advantage of a Python package called Redfin that provides Redfin data.
        </p>
        <p>
          From Zillow I collect:
          <ul>
            <li>Listing Price</li>
            <li>{"Zestimate (Zillow's Rent Estimation)"}</li>
            <li>{"Property Status (for sale, foreclosure, etc.)"}</li>
            <li>Address</li>
          </ul>
        </p>
        <p>
          From Redfin I collect:
          <ul>
            <li>House Size</li>
            <li>Lot Size</li>
            <li>Year Built</li>
            <li>School Rating</li>
          </ul>
        </p>

        <h2>Getting Around Zillow's Bot Protection</h2>
        <p>
          In a previous iteration of this script, I would be able to collect
          data straight off the Zillow website really quickly. I could scan the
          whole Greater Houston Area in the matter of 15 minutes. However,
          Zillow's bot protection caught on and would block any url calls with a
          captcha - rendering my script useless. How did I solve this? I had a
          hunch that Zillow was keeping track of my ip address and noticing an
          inhuman amount of url changes and thereby throwing up a captcha
          whenever they would notice my ip.
        </p>
        <p>
          So then, the next question was: how do I constantly change my ip?
          That's when I stumbled upon something known as a proxy. A proxy is
          essentially a server that your internet traffic can go through before
          traveling to the desired website's servers. And most of these servers
          are located all over the world with their own unique ip address.
        </p>
        <p>
          So, I scraped a bunch of proxy servers from the website:
          www.free-proxy-list.net. And one by one hit the Zillow website with
          each of these proxies. Unfortunately, not every proxy worked, and it
          would take about 5 seconds to try each proxy. This would considerably
          slow down the process of data collection, but would thankfully work
          without fail.
        </p>
        <p>
          Note for the programmers out there: I did try an async way of calling
          these proxies, but just couldn't get the script to work 😔
        </p>
        <h2>Data Analysis</h2>
        <p>
          Below is an excel sheet used to apply filters based on my property
          criteria. I'm looking for a "Schools Rating" of above 7 and a "Rent to
          Price Ratio" of above 1%. I used Google Sheet's own SQL flavor to
          apply customizable filters {'(first two rows in the "Dashboard" tab)'}
          .
        </p>
        <GoogleSheetsEmbed src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRV3VF8HIPGQal3m6bUSKfPrIRf1bDqNiCrDDPJ2g50TkPMmXnPbYV-k1v19l-yHt6os7fTJ8kcHSzZ/pubhtml?" />
        <h2>Final Thoughts</h2>
        <p>
          I'm actually quite happy with this script. It works every time without
          fail, despite Zillow's best efforts to thwart bots. It finds houses
          that fit my criteria much faster than I would have been able to do so
          manually.
        </p>
        <p>
          However, there are downsides. Namely, the speed of the script is not
          as fast as I would like it to be. It can take more than a whole day to
          scan the Greater Houston Area. And even after the data analysis, will
          often find very low quality houses. Why you may ask? Because when
          estimated rents are high but the selling price is cheap, many times
          this will produce a property that requires so much rehab that it
          doesn't make sense to spend the time or the money. For example,
          properties that went up in flames or went through a flood or have
          terrible mold or even foundation issues.
        </p>
        <p>
          Since the housing market is pretty hot during the time of writing
          this, I have yet to find any good deals with this script. However, I
          hope that as interest rates climb and housing prices come down, this
          script will be an invaluable tool to squeeze out an advantage over
          other real estate investors.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
