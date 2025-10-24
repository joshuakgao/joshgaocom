import { Row } from "@/components/ui";
import { FaGithub, FaGoogleDrive, FaRegFilePdf } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import { SiHuggingface, SiLichess } from "react-icons/si";
import { PostProps } from "../../types";
import { Button } from "../button";

export function ActionBar({ post }: { post: PostProps }) {
  const linkConfig = {
    publication: {
      icon: <LuExternalLink size={22} />,
      label: "View Publication",
    },
    website: {
      icon: <LuExternalLink size={22} />,
      label: "Visit Website",
    },
    lichess: {
      icon: <SiLichess />,
      label: "Challenge Athena (Set Time Control to Real Time)",
    },
    pdf: {
      icon: <FaRegFilePdf size={22} />,
      label: "PDF",
    },
    github: {
      icon: <FaGithub size={22} />,
      label: "Github",
    },
    youtube: {
      icon: <IoLogoYoutube size={22} className="hover:text-red-500" />,
      label: "Youtube",
    },
    googleDrive: {
      icon: <FaGoogleDrive size={22} />,
      label: "Google Drive",
    },
    huggingfaceDataset: {
      icon: <SiHuggingface size={22} />,
      label: "Dataset",
    },
  };

  const orderedButtons = post.links
    ? Object.entries(post.links)
        .filter(([_, url]) => url)
        .map(([key, url], index) => {
          const config = linkConfig[key as keyof typeof linkConfig];
          if (!config) return null;

          const variant = index === 0 ? "default" : "secondary";

          return (
            <Button
              key={key}
              variant={variant}
              onClick={() => window.open(url, "_blank")}
            >
              <Row className="space-x-1">
                <span>{config.label}</span>
                <span>{config.icon}</span>
              </Row>
            </Button>
          );
        })
        .filter(Boolean)
    : [];

  return (
    <Row className="py-3 px-2 text-sm border-t border-t-gray-400">
      <Row className="gap-4">{orderedButtons}</Row>
    </Row>
  );
}
