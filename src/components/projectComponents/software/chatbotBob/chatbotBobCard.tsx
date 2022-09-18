import chatbot_background from "../../../../assets/projects/software/chatbotBob/chatbot_title_card.png";
import { TitleCard } from "../../titleCard";

export function ChatbotBobCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={chatbot_background}
      textLocation={["bottom", "left"]}
      to="/software/chatbotBob"
      toFullscreen={toFullscreen}
    >
      <h1>Chatbot Bob</h1>
      <h2>
        A custom built chatbot to answer any career inquires for Joshua Gao
      </h2>
    </TitleCard>
  );
}
