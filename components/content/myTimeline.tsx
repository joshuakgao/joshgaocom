import {
  Col,
  H4,
  PostImg,
  Small,
  Row,
  Collapsible,
  P,
  CollapsibleContent,
  CollapsibleTrigger,
  TimelineItemCollapsible,
  TimelineItemProps,
} from "@/components/ui";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Link from "next/link";

export const timelineData: TimelineItemProps[] = [
  {
    label: "2025",
    title: "Published ICCV'25 Workshop Paper - ViewDelta",
    description:
      "Published research on text-prompted change detection in unaligned images, presented at ICCV 2025 SEA Workshop.",
    img: "/assets/projects/2025/viewdelta/thumbnail2.png",
    link: "https://joshuakgao.github.io/viewdelta/",
    linkText: "ViewDelta",
    icon: "research",
    color: "warning",
  },
  {
    label: "2024",
    title: "Joined SAIL Research Lab",
    description:
      "Conducting research on vision-language AI and their applications in civil engineering.",
    img: "/assets/images/sail.png",
    link: "https://sail.cive.uh.edu/",
    linkText: "SAIL",
    color: "grey",
  },
  {
    label: "2021",
    title: "Head of AI Development - SVS",
    description:
      "Developed AI medical simulation prototype that secured $1.3M Defense Health Agency research funding. Engineered a secure AI deployment pipeline for U.S. Navy Fleet Readiness Center and established company-wide DevOps infrastructure.",
    img: "/assets/projects/2023/svs-medical-simulation/thumbnail.png",
    link: "https://www.sbir.gov/awards/206325",
    linkText: "SBIR Award",
    color: "grey",
  },
];

export function MyTimeline({ className }: { className?: string }) {
  return (
    <Timeline className={className} position="right">
      {timelineData.map((item, idx) => (
        <TimelineItem key={idx}>
          <TimelineOppositeContent
            className="relative top-[2px] md:top-[-2px]"
            color="text.secondary"
            sx={{ flex: 0.1, minWidth: 70 }}
          >
            <P className="text-sm md:text-lg">{item.label}</P>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={item.color || "grey"} />
            {idx < timelineData.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent
            className="relative top-[1px] md:top-[-1px]"
            sx={{ flex: 1 }}
          >
            <TimelineItemCollapsible {...item} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
