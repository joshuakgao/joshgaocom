import { IconButton } from "@/components/ui/iconButton";
import { ExtraSmall, P } from "@/components/ui/typography";
import { useState } from "react";
import { FaGithub, FaGoogleDrive } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { PiHandsClappingLight } from "react-icons/pi";
import { PostProps } from "../types";
import { GrDocumentPdf } from "react-icons/gr";

type ActionBarProps = {
  claps: number;
  post: PostProps;
};

export function ActionBar({ claps, post }: ActionBarProps) {
  const [clapCount, setClapCount] = useState(claps);
  const [hasClapped, setHasClapped] = useState(false);

  const handleClap = () => {
    setClapCount((prev) => prev + 1);
    setHasClapped(true);
    // Optionally send to backend
  };

  const colorHexes = ["#7e22ce", "#db2777", "#ea7d08"];

  const getClapColor = () => {
    if (!hasClapped) return "";
    const offset = clapCount - claps;
    const color = colorHexes[offset % colorHexes.length];
    return `text-[${color}]`;
  };

  const clapColor = getClapColor();
  const transitionClass = "transition-colors duration-300 ease-in-out";

  return (
    <div className="flex items-center justify-between border-t border-b py-3 px-2 text-gray-500 text-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <IconButton
          onClick={handleClap}
          className="flex items-center gap-1 border-none"
        >
          <PiHandsClappingLight
            size={22}
            className={`${clapColor} ${transitionClass} pointer-events-none`}
          />
          <P className={`${clapColor} ${transitionClass} pointer-events-none`}>
            {clapCount}
          </P>
        </IconButton>

        <ExtraSmall className="mt-0.5">
          Enjoyed the article? Let me know with some claps!
        </ExtraSmall>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {post.links?.github && (
          <IconButton onClick={() => window.open(post.links?.github, "_blank")}>
            <FaGithub size={22} />
          </IconButton>
        )}
        {post.links?.youtube && (
          <IconButton
            onClick={() => window.open(post.links?.youtube, "_blank")}
          >
            <IoLogoYoutube size={22} className="hover:text-red-500" />
          </IconButton>
        )}
        {post.links?.pdf && (
          <IconButton onClick={() => window.open(post.links?.pdf, "_blank")}>
            <GrDocumentPdf size={22} />
          </IconButton>
        )}
        {post.links?.website && (
          <IconButton
            onClick={() => window.open(post.links?.website, "_blank")}
          >
            <IoLink size={22} />
          </IconButton>
        )}
        {post.links?.googleDrive && (
          <IconButton
            onClick={() => window.open(post.links?.googleDrive, "_blank")}
          >
            <FaGoogleDrive size={22} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
