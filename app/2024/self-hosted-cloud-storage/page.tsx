"use client";

import { posts } from "@/components/content";
import {
  ExtraSmall,
  H1,
  H2,
  InlineCode,
  List,
  MultilineCode,
  P,
  PostImg,
  PostWrapper,
  Small,
} from "@/components/ui";
import { usePathname } from "next/navigation";
import { getPostMetadata } from "@/components/content";

export default function SelfHostedCloud() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <P>
        Have you run out of storage in your Google Drive? Do you not want to pay
        the pricy subscription fee just to save your photos? Try self hosting
        Nextcloud as your cloud storage solution!
      </P>
      <P className="italic">
        I'll walk you through how a 1 liter PC can give you up to 8TB of cloud
        storage!
      </P>
      <H1>Raspberry Pi 5</H1>
      <PostImg
        src={`${assetsPath}/raspberrypi5.jpg`}
        alt="raspberrypi 5"
        className="max-w-[300px]"
      />
      <P>
        For most people, a small and inexpensive computer will suffice for
        reading and writing data from a storage device. I chose the $75
        Raspberry Pi 5 with 8GB of RAM for self hosting. The Pi5 was perfect
        since it was the first Pi to support NVMe SSD's, which are much
        preferred over the bulky and noisy hard drives.
      </P>
      <P>
        Unfortunately, the Pi5 doesn't support an NVMe connection out of the
        box, and requires some sort of Pi hat for this to work. That's where the
        Pironman 5 comes in.
      </P>
      <H1>Pironman 5 Case</H1>
      <PostImg src={`${assetsPath}/pironman5.png`} alt="pironman5" />
      <P>
        I'm going be honest, I could have just bought $8 basic NVMe hat instead
        of this $79 PC case, and everything would have worked fine. But despite
        all the good points .my girlfriend made about saving money, LOOK HOW
        COOL IT LOOKS 🤩. Between the finished aluminum case, the acrylic
        panels, LED lights, industrial looking heat sink, and the mini display,
        it was $79 dollars well spent.
      </P>
      <P>
        Other than the price, the only real downside of the case is that it acts
        like a faraday cage with all the metal surrounding the wifi module on
        the Pi itself. I 100% recommend buying a USB wifi dongle, or ideally
        just have a wired LAN connection.
      </P>
      <H1>Nextcloud</H1>
      <P>
        Nextcloud is a free and open source self hosted platform that offers a
        suite of features such as file management, notes, password management,
        communication and more. However, I'm most interested in its file
        management system.
      </P>
      <PostImg src={`${assetsPath}/nextcloudFiles.png`} alt="nextcloud files" />
      <P>
        My absolute favorite feature is the ability to sync your iPhone photos
        to Nextcloud just by downloading the mobile Nextcloud app. Now I don't
        even need to pay for iCloud storage that locks you in so easily.
      </P>
      <PostImg
        src={`${assetsPath}/nextcloudPhotos.png`}
        alt="nextcloud photos"
      />

      <H1>Technical Setup Details</H1>
      <P>
        If you're trying to set this up yourself, this is the section for you.
      </P>
      <P>There are better ways to set up Nextcloud, but I chose to:</P>
      <List>
        <li>Create a subdomain of this website</li>
        <li>Containerize Nextcloud with Docker</li>
        <li>Expose the Pi's ip with Ngrok</li>
      </List>
      <H2>Setting Up a Subdomain</H2>
      <P>
        You don't have to set up a subdomain, you can just use any website url
        you own. I went with cloud.joshgao.com since I already own
        www.joshgao.com. If you don't have a domain, you can get one with any
        domain name provider like Squarespace or GoDaddy.
      </P>
      <P className="italic">
        Note: If you only want to access Nextcloud through own network and not
        expose it to the internet, you don't have to get a domain.
      </P>
      <H2>Install and Containerize Docker</H2>
      <P>On your Pi, run the following to install Nextcloud and Docker:</P>
      <MultilineCode>
        <Small>sudo snap install nextcloud</Small>
        <Small>sudo apt-install docker docker-compose</Small>
      </MultilineCode>
      <P>Then you need to edit the Nextcloud config:</P>
      <MultilineCode>
        <Small className="text-green-700">
          # change the following path if need be
        </Small>
        <Small>sudo nano ~/nextcloud/config/config.php</Small>
      </MultilineCode>
      <P>
        Then add <InlineCode>1 ={">"} your.domainnamehere.com</InlineCode> to
        "trusted_domains". Change the url in "overwrite.cli.uri" to{" "}
        <InlineCode>https://your.domainnamehere.com</InlineCode>. Finally change
        "overwriteprotocol" to "https".
      </P>
      <P>
        After you've configured Nextcloud, we need to setup the container with
        Docker. This container will spin up automatically on boot.
      </P>
      <MultilineCode>
        <Small>
          sudo docker run -d -p 8080:80 --name nextcloud --restart
          unless-stopped \
        </Small>
        <Small>-v /home/tugonbob/nextcloud/nextcloud:/var/www/html \ </Small>
        <Small>
          -v /home/tugonbob/nextcloud/apps:/var/www/html/custom_apps \{" "}
        </Small>
        <Small>
          -v /home/tugonbob/nextcloud/config:/var/www/html/config \{" "}
        </Small>
        <Small>-v /home/tugonbob/nextcloud/data:/var/www/html/data \ </Small>
        <Small>
          -v /home/tugonbob/nextcloud/theme:/var/www/html/themes nextcloud
        </Small>
      </MultilineCode>
      <H2>Expose Nextcloud to Internet</H2>
      <P>
        If you want to access your Nextcloud from anywhere, you need to expose
        it to the internet. I used Ngrok for this, but you can also use a
        reverse proxy like Nginx or Traefik.
      </P>
      <P>
        Ngrok is $10 a month, which I know, totally defeats the purpose of this
        project. But it's still cheaper than cloud storage, and you can scale it
        to as many TB's as you want.
      </P>
      <P>
        After you install Ngrok and follow their instructions to adjust your
        domain's DNS, simply run:
      </P>
      <MultilineCode>
        <Small>nohup ngrok http --domain=your.domainnamehere.com 8080 &</Small>
      </MultilineCode>

      <H1>Cost</H1>
      <P>
        Here's a breakdown of the costs for this self-hosted cloud storage
        setup:
        <List>
          <li>
            <b>Raspberry Pi 5 (8GB RAM):</b> $75
          </li>
          <li>
            <b>Pironman 5 Case:</b> $79
          </li>
          <li>
            <b>NVMe SSD (1TB - 8TB):</b> ~$50 - $400 (depending on capacity)
          </li>
          <li>
            <b>USB WiFi Dongle (optional):</b> ~$10
          </li>
          <li>
            <b>Ngrok Subscription (optional, for remote access):</b> $10/month
          </li>
          <li>
            <b>Domain Name (optional, for remote access):</b> ~$10/year
          </li>
        </List>
        <P>
          <b>Estimated one-time hardware cost:</b> $214 - $564+ (depending on
          SSD size and optional accessories)
        </P>
        <P>
          <b>Estimated recurring cost:</b> $10/month (Ngrok), $10/year (domain)
        </P>
      </P>
      <P>
        I chose a 2TB NVMe SSD, which cost me $120, which is a great balance
        between price and storage capacity.
      </P>
      <P>
        This all does seem pricey for something that was meant to save money. I
        went for the cool factor which is absolutely not necessary. You can skip
        the Pironman 5 Case for a pi hat and a cheap RaspberryPi case, or even
        just skip the case all together. This would bring your cost down around
        ~$70.
      </P>
      <P>
        You could also get an older Pi and just hook it up to a regular SSD with
        an adapter. Not only can you get Raspberry Pi 4 for just $35, but also
        non-NVMe SSDs are much cheaper than their NVMe counter parts.
      </P>
      <P>
        Additionally, you can skip the Ngrok subscription if you figure out how
        to use Nginx. I never really figured out how it works, and Ngrok made it
        really easy and saved me a ton of time.
      </P>
      <P>
        So the cheapest you could set up self hosted Nextcloud would be around
        just 50 bucks. Not bad at all.
      </P>
      <H1>Conclusion</H1>
      <P>
        Self-hosting your own cloud storage with Nextcloud is not only a fun and
        rewarding project—it also gives you full control over your data, removes
        reliance on big tech subscriptions, and can be surprisingly affordable
        if you go the budget route. Whether you're doing it for privacy, cost
        savings, or just the satisfaction of building your own infrastructure,
        setting up a Raspberry Pi-powered cloud server is a fantastic step
        toward digital independence. Happy hosting!
      </P>
    </PostWrapper>
  );
}
