"use client";

import {
  Col,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  P,
  Row,
  Small,
} from "@/components/ui";
import Link from "next/link";
import * as React from "react";
import { LuExternalLink } from "react-icons/lu";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { Button } from "./button";

export type TimelineItemProps = {
  label: string;
  img?: string;
  color?:
    | "inherit"
    | "grey"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  icon?: React.ReactNode;
};

export function TimelineItemCollapsible({
  label,
  title,
  description,
  img,
  link,
  linkText,
}: TimelineItemProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Col className="cursor-pointer">
        <CollapsibleTrigger asChild>
          <Row className="items-start">
            <Col>
              <Row>
                <P className="font-semibold text-sm md:text-lg">{title}</P>
                <Col>
                  {open ? (
                    <MdOutlineExpandLess
                      size={"22"}
                      className="ml-1 text-gray-400"
                    />
                  ) : (
                    <MdOutlineExpandMore
                      size={"22"}
                      className="ml-1 text-gray-400"
                    />
                  )}
                </Col>
              </Row>
              <Small
                className={`max-w-md ${
                  open ? "line-clamp-none" : "line-clamp-1"
                }`}
              >
                {description}
              </Small>
            </Col>
          </Row>
        </CollapsibleTrigger>

        <CollapsibleContent className="cursor-default">
          {img && (
            <img
              src={img}
              alt={title}
              className="my-2 rounded-lg max-w-sm md:max-w-md"
            />
          )}
          {link && (
            <Link href={link} target="_blank" className="mt-2">
              <Button variant="outline">
                {linkText || "Learn More"} <LuExternalLink size={16} />
              </Button>
            </Link>
          )}
        </CollapsibleContent>
      </Col>
    </Collapsible>
  );
}
