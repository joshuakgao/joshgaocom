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
          <Col>
            <Row className="justify-between items-start md:max-w-xl">
              <P className="font-semibold text-sm md:text-lg">{title}</P>

              {open ? (
                <Row>
                  <MdOutlineExpandLess size={"16"} className="text-gray-500" />
                </Row>
              ) : (
                <Row>
                  <MdOutlineExpandMore size={"16"} className="text-gray-500" />
                </Row>
              )}
            </Row>
            <Small
              className={`md:max-w-lg ${
                open ? "line-clamp-none" : "line-clamp-1"
              }`}
            >
              {description}
            </Small>
          </Col>
        </CollapsibleTrigger>

        <CollapsibleContent className="cursor-default">
          {img && (
            <img
              src={img}
              alt={title}
              className="my-2 rounded-lg  md:max-w-lg"
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
