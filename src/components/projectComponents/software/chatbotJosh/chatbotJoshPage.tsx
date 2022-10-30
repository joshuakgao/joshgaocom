import {
  ContentHeader,
  GoogleSheetsEmbed,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { ChatbotJoshCard } from "./chatbotJoshCard";

export function ChatbotJoshPage() {
  return (
    <ScrollDiv>
      <ChatbotJoshCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="10/29/2022"
          projectComponents="Dialogflow - Firebase"
          skills={["dialogflow", "js", "firebase", "googleDrive"]}
          sources={{
            googleDrive:
              "https://docs.google.com/spreadsheets/d/19YN5nMysW3npDchNzWd4R_hfOTCS6ftW6dBrzzR3Hnc/edit?usp=sharing",
          }}
        />
        <h2 style={{ marginBottom: 15 }}>Talk to Chatbot Josh</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            border: "1px solid lightgrey",
          }}
        >
          <iframe
            allow="microphone;"
            width="100%"
            height="500"
            src="https://console.dialogflow.com/api-client/demo/embedded/a3b4c3fb-13eb-4d22-a5a8-ec7d4f659e0e"
            style={{ border: "0px solid black" }}
          />
        </div>
        <h3>Try These Questions</h3>
        <p>
          <ul>
            <li>What is your proudest achievement?</li>
            <li>Where do you see yourself in 5 years?</li>
            <li>How can I get in touch with you?</li>
          </ul>
        </p>
        <h2>All Possible Questions and Answers</h2>
        <p>
          Note: The training phrases aren't hard coded, but rather uses the bag
          of words algorithm
        </p>
        <GoogleSheetsEmbed src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQNtKK5cqO4cF50Qwb5wktpBFNrgGzPgP5XfmFqeh3P57zKu5yCTk8lgvhBc-_JsUFzGjzA5gE9Bkge/pubhtml?widget=true&amp;headers=false" />
      </MainContentDiv>
    </ScrollDiv>
  );
}
