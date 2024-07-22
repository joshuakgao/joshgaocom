import drinkImages from "../assets/images/drinksMenu";
import {
  MainContentDiv,
  Row,
  ScrollDiv,
  Spacer,
} from "../components/commonComponents";
import { DrinkMenuItem } from "../components/customComponents";

export function MenuPage() {
  const drinks: {
    title: string;
    description: string;
    image: string;
    isPremium: boolean;
  }[][] = [
    [
      {
        title: "Matcha Latte",
        description:
          "A vibrant and earthy beverage that blends matcha with milk and honey, creating a smooth and creamy drink.",
        image: drinkImages.matchaLatte,
        isPremium: true,
      },
      {
        title: "Thai Tea",
        description:
          "A refreshing blend of Assam black tea and condensed milk creating a perfect balance between bold and sweet.",
        image: drinkImages.thaiTea,
        isPremium: false,
      },
    ],
    [
      {
        title: "Milk Tea",
        description:
          "Savor the classic taste of our Milk Tea, a delightful fusion of a tea of your choice and velvety smooth milk.",
        image: drinkImages.milkTea,
        isPremium: false,
      },
      {
        title: "Vietnamese Coffee",
        description:
          "Experience the rich and bold flavors of traditional Vietnamese drip coffee sweetened with condensed milk.",
        image: drinkImages.vietnameseCoffee,
        isPremium: false,
      },
    ],
  ];

  return (
    <ScrollDiv>
      <MainContentDiv>
        <h1>Drinks Menu</h1>
        {drinks.map((drinkPair, i) => (
          <>
            <Spacer size={128} />
            <Row>
              {console.log(drinkPair)}
              <DrinkMenuItem
                title={drinkPair[0].title}
                description={drinkPair[0].description}
                image={drinkPair[0].image}
                isPremium={drinkPair[0].isPremium}
              />
              <Spacer horizontal size={64} />
              <DrinkMenuItem
                title={drinkPair[1].title}
                description={drinkPair[1].description}
                image={drinkPair[1].image}
                isPremium={drinkPair[1].isPremium}
              />
            </Row>
          </>
        ))}
        <Spacer size={100} />
      </MainContentDiv>
    </ScrollDiv>
  );
}
