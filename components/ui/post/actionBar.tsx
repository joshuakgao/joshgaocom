import { Row } from "@/components/ui";
import { FaGithub, FaGoogleDrive } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { LuArrowDownToLine, LuExternalLink } from "react-icons/lu";
import { SiHuggingface } from "react-icons/si";

import { PostProps } from "../../types";
import { Button } from "../button";

export function ActionBar({ post }: { post: PostProps }) {
  return (
    <Row className="py-3 px-2 text-sm border-t">
      <Row className="gap-4">
        {post.links?.publication && (
          <Button
            variant="secondary"
            onClick={() => window.open(post.links?.publication, "_blank")}
          >
            <Row>
              View Publication <LuExternalLink size={22} className="ml-1" />
            </Row>
          </Button>
        )}
        {post.links?.website && (
          <Button
            variant="secondary"
            onClick={() => window.open(post.links?.website, "_blank")}
          >
            <Row>
              Visit Website <LuExternalLink size={22} className="ml-1" />
            </Row>
          </Button>
        )}
        {post.links?.pdf && (
          <Button
            variant="ghost"
            onClick={() => window.open(post.links?.pdf, "_blank")}
          >
            <Row>
              Download <LuArrowDownToLine size={22} className="ml-1" />
            </Row>
          </Button>
        )}
        {post.links?.github && (
          <Button
            onClick={() => window.open(post.links?.github, "_blank")}
            variant="ghost"
          >
            <Row>
              Github <FaGithub size={22} className="ml-1" />
            </Row>
          </Button>
        )}
        {post.links?.youtube && (
          <Button
            onClick={() => window.open(post.links?.youtube, "_blank")}
            variant="ghost"
          >
            <IoLogoYoutube size={22} className="hover:text-red-500" />
          </Button>
        )}
        {post.links?.googleDrive && (
          <Button
            onClick={() => window.open(post.links?.googleDrive, "_blank")}
            variant="outline"
          >
            <FaGoogleDrive size={22} />
          </Button>
        )}
        {post.links?.huggingface && (
          <Button
            onClick={() => window.open(post.links?.huggingface, "_blank")}
            variant="ghost"
          >
            <Row>
              Dataset <SiHuggingface size={22} className="ml-1" />
            </Row>
          </Button>
        )}
      </Row>
    </Row>
  );
}
