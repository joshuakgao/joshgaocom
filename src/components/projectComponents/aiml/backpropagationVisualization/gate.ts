class Gate {
  public label: string;
  public value: number;
  public children: Gate[];
  public gradient: number;
  public _backward: () => void;
  public operation: "+" | "*" | "sigmoid" | "";

  constructor(
    label: string,
    value: number,
    children: Gate[] = [],
    operation: "+" | "*" | "sigmoid" | "" = ""
  ) {
    this.label = label;
    this.value = value;
    this.children = children;
    this.gradient = 0;
    this._backward = () => {};
    this.operation = operation;
  }

  add(other: Gate, label = this.label + "+" + other.label) {
    const outputNode = new Gate(
      label,
      this.value + other.value,
      [this, other],
      "+"
    );

    outputNode._backward = () => {
      this.gradient += outputNode.gradient;
      other.gradient += outputNode.gradient;
    };

    return outputNode;
  }

  mul(other: Gate, label = this.label + other.label) {
    const outputNode = new Gate(
      label,
      this.value * other.value,
      [this, other],
      "*"
    );

    outputNode._backward = () => {
      this.gradient += other.value * outputNode.gradient;
      other.gradient += this.value * outputNode.gradient;
    };

    return outputNode;
  }

  sigmoid(label = "\\sigma(x)") {
    const sigmoidFunction = (n: number) => 1 / (1 + Math.exp(-n));
    const sigmoidGradientFunction = (n: number) => (1 - n) * n;

    const outputNode = new Gate(
      label,
      sigmoidFunction(this.value),
      [this],
      "sigmoid"
    );

    outputNode._backward = () => {
      this.gradient = sigmoidGradientFunction(outputNode.value);
      console.log(outputNode.value, this.gradient);
    };

    return outputNode;
  }

  backward() {
    const topo: Gate[] = [];
    const visited = new Set();
    const build_topo = (v: Gate) => {
      if (!visited.has(v)) {
        visited.add(v);
        for (const child of v.children) {
          build_topo(child);
        }
        topo.push(v);
      }
    };

    build_topo(this);

    this.gradient = 1.0;

    topo
      .slice()
      .reverse()
      .forEach((v: Gate) => {
        v._backward();
      });
  }

  parent(root: Gate, resetGrad: boolean) {
    const child = this;
    let parent = null;
    const visited = new Set();

    function search(v: Gate) {
      if (!visited.has(v)) {
        visited.add(v);
        for (const c of v.children) {
          if (resetGrad) {
            c.gradient = 0;
          }

          if (c.label === child.label) {
            parent = v;
            if (!resetGrad) break;
          }

          if (c.children.length > 0) {
            search(c);
          }
        }
      }
    }

    search(root);
    return parent || new Gate("", 0);
  }

  update(val: number, root: Gate) {
    function forward(v: Gate, d: number) {
      if (v.label === root.label) {
        v.value = d;
        v.gradient = 0.0;
        return;
      }

      v.value = d;
      const parent = v.parent(root, true);
      let newData = d;
      const [child1, child2] = parent.children;
      if (parent.operation === "+") {
        newData = child1.value + child2.value;
      } else if (parent.operation === "*") {
        newData = child1.value * child2.value;
      } else if (parent.operation === "sigmoid") {
        newData = 1 / (1 + Math.exp(-child1.value));
      }

      forward(parent, newData);
    }

    forward(this, val);
    root.backward();
  }
}

export default Gate;
