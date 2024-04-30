import Gate from "./gate";
import { layout, trace } from "./utils";

let x1 = new Gate("x_1", -1);
let w1 = new Gate("w_1", 2);
let x2 = new Gate("x_2", 3);
let w2 = new Gate("w_2", 4);
let b = new Gate("b", -8);

let x1w1 = x1.mul(w1);
let x2w2 = x2.mul(w2);
let Wx = x1w1.mul(x2w2, "Wx");
let Wxb = Wx.add(b, "Wx+b");
let sigma = Wxb.sigmoid("\\sigma \\text{ gate}");
sigma.backward();

const { nodes, edges } = trace(sigma);
const layoutNodes = layout(nodes, edges);

export { edges as defaultEdges, layoutNodes as defaultNodes, sigma as root };
