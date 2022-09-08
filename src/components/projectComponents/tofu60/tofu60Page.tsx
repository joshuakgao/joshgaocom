import React from "react";
import { ScrollDiv } from "../../commonComponents";
import { Tofu60Card } from "./tofu60Card";

export function Tofu60Page() {
  return (
    <ScrollDiv>
      <Tofu60Card toFullscreen />
      <main style={styles.content}>
        <h2>Building a Custom Tofu60 Mechanical Keyboard</h2>
        <h3>Required Materials</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
          viverra mi. In sed malesuada nisl. Fusce vel ex id dui dapibus auctor
          nec et leo. Morbi ex ante, tempus vitae malesuada non, eleifend eget
          elit. Aenean ut libero lacus. Sed blandit lectus tellus, vitae
          interdum nisl auctor sit amet. Nam nec suscipit mauris. Nulla
          vulputate id magna a mattis. Aenean imperdiet ac nibh in pulvinar. Sed
          vulputate diam ac lacinia consectetur.{" "}
        </p>
        <h4>Keycaps</h4>
        <p>
          Sed ut massa vitae lectus pellentesque lobortis a ac sapien.
          Vestibulum nibh eros, volutpat nec nisl eget, dictum sodales quam.
          Donec sodales dictum consectetur. Donec eu sem neque. Mauris sit amet
          feugiat arcu. Mauris et vulputate orci. Vestibulum imperdiet vel nisl
          ac tincidunt. Aliquam enim nulla, ullamcorper a quam laoreet, gravida
          tempus ante.{" "}
        </p>
        <h4>Plate</h4>
        <p>
          Sed a hendrerit urna, vitae condimentum libero. Suspendisse lacinia
          nec arcu eu consequat. Cras convallis tincidunt felis, tempor semper
          eros. Donec eros magna, tempor eu egestas luctus, bibendum eget mi.
          Quisque nec massa lectus. Integer finibus iaculis neque vitae
          malesuada. Morbi mattis dolor mauris. Phasellus condimentum lacus
          nisl, volutpat blandit erat lacinia a.
        </p>
        <h3>Modding</h3>
        <p>
          Duis neque felis, sollicitudin ac orci sit amet, lacinia auctor quam.
          Quisque fringilla finibus congue. In convallis, odio ut dapibus
          facilisis, arcu elit consectetur lorem, eu fringilla ante lectus at
          felis. Pellentesque vel nisl eros. Donec at felis placerat, faucibus
          augue sed, porttitor orci. Praesent ut nibh sagittis, egestas metus
          ut, interdum sapien. Ut dictum risus ac faucibus lobortis. Nulla nec
          tristique urna. Sed pellentesque at sem luctus malesuada. Nulla
          facilisi. Phasellus id euismod turpis, at tristique justo. Aliquam
          quis dapibus mi, vitae aliquet neque. Morbi fermentum est ut fringilla
          vulputate. Cras commodo condimentum purus a gravida. Donec pretium
          blandit turpis, imperdiet sollicitudin arcu fringilla at
        </p>
        <p>
          Curabitur consectetur arcu sit amet facilisis mollis. Nunc at quam
          eget velit volutpat lacinia porttitor id urna. Pellentesque id felis
          mattis, rhoncus magna vel, malesuada risus. Etiam lobortis tortor
          libero, sed tincidunt enim bibendum ac. Curabitur ut lacus nulla.
          Vestibulum et molestie nunc, vel commodo est. Ut sed sodales ligula.
          Morbi molestie, mauris ut aliquet aliquet, mi sapien dictum arcu, ut
          euismod leo risus sit amet ex. Aenean eget nisl dui. Nulla porttitor
          congue turpis sit amet posuere. Fusce ultricies euismod mollis. Duis
          augue ipsum, efficitur ut risus ac, sollicitudin gravida nisl.
          Suspendisse pretium sem volutpat, porta odio cursus, porta ipsum.
          Suspendisse mattis odio dapibus, lacinia nibh sit amet, fringilla
          ligula. Quisque imperdiet sem in laoreet elementum.
        </p>
      </main>
    </ScrollDiv>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  content: {
    paddingLeft: "calc(30vw - 64px)",
    paddingRight: "calc(30vw - 64px)",
  },
};
