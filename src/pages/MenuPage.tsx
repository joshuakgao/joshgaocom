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
  }[] = [
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
  ];

  return (
    <ScrollDiv>
      <MainContentDiv>
        <h1>Drinks Menu</h1>
        <Row
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {drinks.map((drink, i) => (
            <DrinkMenuItem
              title={drink.title}
              description={drink.description}
              image={drink.image}
              isPremium={drink.isPremium}
            />
          ))}
        </Row>

        <Spacer size={100} />
      </MainContentDiv>
    </ScrollDiv>
  );
}
