import { useState } from "react";
import { PiHandsClappingLight } from "react-icons/pi";
import { IoShareOutline, IoLink } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { IconButton } from "@/components/ui/iconButton";
import { P } from "@/components/ui/typography";

type ActionBarProps = {
  claps: number;
};

export function ActionBar({ claps }: ActionBarProps) {
  const [clapCount, setClapCount] = useState(claps);
  const [hasClapped, setHasClapped] = useState(false);

  const handleClap = () => {
    setClapCount((prev) => prev + 1);
    setHasClapped(true);
    // Optionally send to backend
  };

  return (
    <div className="flex items-center justify-between border-t border-b py-3 px-2 text-gray-500 text-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <IconButton
          onClick={handleClap}
          className="flex items-center gap-1 hover:text-black transition"
        >
          <PiHandsClappingLight size={22} color={hasClapped ? "#f97316" : ""} />
          <P className={hasClapped ? "text-orange-500" : ""}>{clapCount}</P>
        </IconButton>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <IconButton>
          <FaGithub size={22} />
        </IconButton>
        <IconButton>
          <IoLink size={22} />
        </IconButton>
        <IconButton>
          <IoLogoYoutube size={22} className="hover:text-red-500" />
        </IconButton>
      </div>
    </div>
  );
}
