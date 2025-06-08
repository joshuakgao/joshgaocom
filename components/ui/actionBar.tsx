import { Row } from "@/components/ui";
import { IconButton } from "@/components/ui/iconButton";
import { ExtraSmall, P } from "@/components/ui/typography";
import { db } from "@/firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogleDrive } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { PiHandsClappingLight } from "react-icons/pi";
import { PostProps } from "../types";

export function ActionBar({ post }: { post: PostProps }) {
  const [claps, setClaps] = useState<undefined | number>(post.claps ?? 0);
  const [hasClapped, setHasClapped] = useState(false);

  useEffect(() => {
    // avoid fetching claps if already fetched from db
    if (post.claps !== undefined) return;

    const fetchlaps = async () => {
      const docRef = doc(db, "claps", "claps");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const data = docSnap.data();
      if (!data.hasOwnProperty(post.slug)) return;

      // get claps if exists for this post
      setClaps(data[post.slug]);
    };

    fetchlaps();
  }, []);

  const handleClap = async () => {
    setClaps((prev) => (prev ?? 0) + 1);
    setHasClapped(true);
    if (post.slug) {
      const docRef = doc(db, "claps", "claps");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const data = docSnap.data();
      if (data.hasOwnProperty(post.slug)) {
        await updateDoc(docRef, {
          [post.slug]: increment(1),
        });
      } else {
        await updateDoc(docRef, {
          [post.slug]: 1,
        });
      }
    }
  };

  const colorHexes = ["#7e22ce", "#db2777", "#ea7d08"];

  const getClapColor = () => {
    if (!hasClapped) return "";
    if (!claps) return colorHexes[0];
    return colorHexes[claps % colorHexes.length];
  };

  const clapColor = getClapColor();
  const transitionClass = "transition-colors duration-300 ease-in-out";

  return (
    <Row className="justify-between border-t border-b py-3 px-2 text-gray-500 text-sm">
      {/* Left side */}
      <Row className="gap-2">
        <IconButton
          onClick={handleClap}
          className="flex items-center gap-1 border-none"
        >
          <PiHandsClappingLight
            size={22}
            className={`${transitionClass} pointer-events-none`}
            color={clapColor}
          />
          <P className={`${transitionClass} pointer-events-none`}>{claps}</P>
        </IconButton>

        <ExtraSmall>Claps appreciated!</ExtraSmall>
      </Row>

      {/* Right side */}
      <Row className="gap-4">
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
      </Row>
    </Row>
  );
}
