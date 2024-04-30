import Gate from "./gate";
import { layout, trace } from "./utils";

let x1 = new Gate("x_1", 2);
let w1 = new Gate("w_1", 3);
let x2 = new Gate("x_2", 1);
let w2 = new Gate("w_2", 2);
let b = new Gate("b", 2);

let x1w1 = x1.mul(w1);
let x2w2 = x2.mul(w2);
let Wx = x1w1.mul(x2w2, "Wx");
let Wxb = Wx.add(b, "Wx+b");
let relu = Wxb.relu();
relu.backward();

const { nodes, edges } = trace(relu);
const layoutNodes = layout(nodes, edges);

export { edges as defaultEdges, layoutNodes as defaultNodes, relu as root };
