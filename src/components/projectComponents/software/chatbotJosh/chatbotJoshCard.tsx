import chatbot_background from "../../../../assets/projects/software/chatbotJosh/chatbot_title_card.png";
import { TitleCard } from "../../titleCard";

export function ChatbotJoshCard({
  toFullscreen = false,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      backgroundImage={chatbot_background}
      textPosition={["bottom", "left"]}
      to="/software/chatbotJosh"
      toFullscreen={toFullscreen}
    >
      <h1 className="primary">Chatbot Josh</h1>
      <h2 className="primary">
        A custom built chatbot to answer any career inquires for Josh Gao
      </h2>
    </TitleCard>
  );
}
