import React from "react";
import { ScrollDiv, YoutubeEmbed } from "../../commonComponents";
import { MainContentDiv } from "../../commonComponents/mainContentDiv/mainContentDiv";
import { Tofu60Card } from "./tofu60Card";

export function Tofu60Page() {
  return (
    <ScrollDiv>
      <Tofu60Card toFullscreen />
      <MainContentDiv>
        <h2>My Custom Tofu60 Mechanical Keyboard</h2>
        <h4>Quick Summary</h4>
        <ul>
          <a
            href="https://kbdfans.com/products/kbdfans-tofu60-dz64-rgb-hot-swap-diy-kit"
            target="_blank"
          >
            <li>E-White Tofu60 from KBDfans</li>
          </a>
          <ul>
            <li>dz64rgb pcb</li>
            <li>Aluminum Plate</li>
          </ul>
          <a href="https://a.co/d/8k3nlzM" target="_blank">
            <li>Gateron Milky Yellow Switches</li>
          </a>
          <a
            href="https://www.amazon.com/dp/B08QV2DLP8?psc=1&ref=ppx_yo2ov_dt_b_product_details"
            target="_blank"
          >
            <li>PBT Olivia Keycaps - Cherry Profile</li>
          </a>
          <li>Masking Tap mod - 4 layers</li>
          <li>Foam</li>
          <ul>
            <li>Battery Slot</li>
            <li>Under PCB</li>
            <li>Between PCB and Aluminum Plate</li>
          </ul>
        </ul>
        <h3>Appearance</h3>
        <p>
          As my first custom mechanical keyboard build, I highly recommend the
          Tofu60 from KBDfans. It’s built with this incredibly solid aluminum
          case with a hefty weight to it. The side view, while simple, has a
          very elegant feel to it. And when paired with the white and pink
          accented Olivia keycaps set, it sits beautifully on my desk as a
          center piece to my workstation.
        </p>
        <h3>Sound</h3>
        <p>
          The outside looks incredible, but the most exciting aspect of the
          build is the typing sound that it produces. The Tofu60 comes with some
          sound dampening foam that slots in between the aluminum plate and the
          pcb, as well underneath the pcb to remove some hollow space to reduce
          potential pinging. The alphanumeric keys give off a lovely creamy
          sound and the larger keys find themselves with a satisfying thock.
          Unfortunately however, the Cherry Screw-in stabilizers rattle
          slightly, and no amount of lubing seems to fix this issue. Maybe one
          day, I’ll try and apply the hole-e mod to dampen the sound.
        </p>
        <h3>Modding</h3>
        <p>
          The pristine sound wasn’t achieved by accident however. I applied the
          tape mod and I lubed the Gateron Milky Yellow Switches and the
          stabilizers. The tape mod was by far the quickest and easiest mod that
          I came across. I simply put 4 layers of masking tape underneath the
          pcb to provide an extra thockiness. Lubing switches and stabilizers
          was the most tedious of processes, but definitely the most important.
          If you decide on lubing your own switches and stabilizers, be ready to
          be frustrated and sink hours into the journey. Take a listen to the
          results of all the modding.
        </p>
        <YoutubeEmbed embedId="rhe_ndNJJKU" />
        <h3>Final Thoughts</h3>
        <p>
          I was quite hesitant to pull the trigger on ordering the Tofu60. The
          price was not trivial and I was worried I wasn’t going to get the same
          sound quality as some of the more experienced hobbyists who were into
          mechanical keyboards. However, I’ve never been happier with this
          keyboard and would even be willing to buy another one for the office.{" "}
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
