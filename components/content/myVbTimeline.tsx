import { H3, P, TimelineItemProps, PostImg } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const vbTimelineData: TimelineItemProps[] = [
  {
    label: "Nov 2025",
    title: "(2nd) Gobble Gobble Tournament",
    description: "15 total teams. B Divison. Houston, TX.",
    img: "/assets/images/vb/2025_gobble_gobble.png",
  },
  {
    label: "Oct 2025",
    title: "(2nd, All Star) NAGVA Dallas",
    description: "52 total teams. B Divison. Houston, TX.",
    img: "/assets/images/vb/2025_nagva_dallas.JPEG",
  },
  {
    label: "Aug 2025",
    title: "Joined UH A Team",
    description: "Utility player.",
    img: "/assets/images/vb/2025_uh_club.jpg",
  },
  {
    label: "Jul 2025",
    title: "(1st) Friendship Tournament",
    description: "15 total teams. B Division.",
    img: "/assets/images/vb/2025_friendship.PNG",
  },
  {
    label: "Apr 2025",
    title: "(17th) USAV Nationals",
    description: "52 total teams. B Divison.",
    img: "/assets/images/vb/2025_usav.JPEG",
  },
  // {
  //   label: "Apr 2025",
  //   title: "(17th) NAGVA Houston",
  //   description: "52 total teams. B Divison.",
  //   img: "/assets/images/vb/2025_nagva_houston.JPEG",
  // },
  {
    label: "Nov 2024",
    title: "(5th) NAGVA San Antonio",
    description: "52 total teams. B Division.",
    img: "/assets/images/vb/2024_nagva_san_antonio.JPEG",
  },
  {
    label: "Aug 2023",
    title: "Rice University Womens Club",
    description: "Head Coach",
    img: "/assets/images/vb/2023_rice.JPEG",
    color: "primary",
  },
];

export function MyVbTimeline() {
  return (
    <Carousel
      className="w-[90%] lg:w-full self-center"
      plugins={[
        Autoplay({
          delay: 7000,
        }),
      ]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {vbTimelineData.map((item, idx) => (
          <CarouselItem
            key={idx}
            className="pl-2 md:pl-4 md:basis-[45%] lg:basis-[30%]"
          >
            <Card>
              <CardContent className="flex flex-col p-6">
                <P className="text-sm md:text-lg text-muted-foreground mb-2">
                  {item.label}
                </P>
                <H3 className="text-xl font-semibold mb-2 truncate">
                  {item.title}
                </H3>
                <P className="text-muted-foreground">{item.description}</P>
                {item.img && (
                  <PostImg src={item.img} alt={item.title} aspectRatio="1/1" />
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
