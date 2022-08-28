import watermelon from "../../../assets/images/watermelon.png";

export function Logo() {
  require("./styles.css");
  return (
    <div className="row">
      <img className="logo" src={watermelon} />
      <h4 className="tertiary" style={{ marginLeft: 10 }}>
        Gao
      </h4>
    </div>
  );
}
