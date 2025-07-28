import { Node } from "./node.js";

class Tree {
  constructor(array = []) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    return this.buildBST([...new Set(array)].sort((a, b) => a - b));
  }

  buildBST(array) {
    if (array.length === 0) return null;
    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);
    root.left = this.buildBST(array.slice(0, mid));
    root.right = this.buildBST(array.slice(mid + 1));
    return root;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    let current = this.root;
    let prev;
    while (current) {
      prev = current;
      if (value > current.data) {
        current = current.right;
      } else if (value < current.data) {
        current = current.left;
      } else {
        return;
      }
    }
    if (value > prev.data) {
      prev.right = new Node(value);
    } else {
      prev.left = new Node(value);
    }
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  delete(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(root, value) {
    if (!root) return null;

    if (value < root.data) {
      root.left = this._deleteRec(root.left, value);
    } else if (value > root.data) {
      root.right = this._deleteRec(root.right, value);
    } else {
      if (!root.left && !root.right) return null;
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      const successor = this.findMin(root.right);
      root.data = successor.data;
      root.right = this._deleteRec(root.right, successor.data);
    }

    return root;
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value > current.data) {
        current = current.right;
      } else if (value < current.data) {
        current = current.left;
      } else {
        return current;
      }
    }
    return null;
  }

  levelOrderForEach(callback = null) {
    if (callback === null) {
      throw new Error("Must be called with a callback.");
    }
    let queue = [this.root];
    while (queue.length) {
      let current = queue.shift();
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrder(node, res = null) {
    if (res === null) {
      res = [];
    }

    if (node) {
      this.inOrder(node.left, res);
      res.push(node);
      this.inOrder(node.right, res);
    }
    return res;
  }

  inOrderForEach(callback = null) {
    if (callback === null) {
      throw new Error("Must be called with a callback.");
    }
    let inOrderNodes = this.inOrder(this.root);
    for (let node of inOrderNodes) {
      callback(node);
    }
  }

  preOrder(node, res = null) {
    if (res === null) {
      res = [];
    }

    if (node) {
      res.push(node);
      this.preOrder(node.left, res);
      this.preOrder(node.right, res);
    }
    return res;
  }

  preOrderForEach(callback = null) {
    if (callback === null) {
      throw new Error("Must be called with a callback.");
    }
    let preOrderNodes = this.preOrder(this.root);
    for (let node of preOrderNodes) {
      callback(node);
    }
  }

  postOrder(node, res = null) {
    if (res === null) {
      res = [];
    }

    if (node) {
      this.postOrder(node.left, res);
      this.postOrder(node.right, res);
      res.push(node);
    }
    return res;
  }

  postOrderForEach(callback = null) {
    if (callback === null) {
      throw new Error("Must be called with a callback.");
    }
    let postOrderNodes = this.postOrder(this.root);
    for (let node of postOrderNodes) {
      callback(node);
    }
  }

  height(value) {
    let node = this.find(value);
    if (!node) return null;
    const heightHelper = (node) => {
      if (!node) return -1;
      return 1 + Math.max(heightHelper(node.left), heightHelper(node.right));
    };
    return heightHelper(node);
  }

  depth(value) {
    let current = this.root;
    let d = 0;
    while (current) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return d;
      }
      d++;
    }
    return null;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const height = (n) => {
      if (!n) return -1;
      return 1 + Math.max(height(n.left), height(n.right));
    };

    let heightLeft = height(node.left);
    let heightRight = height(node.right);

    return (
      Math.abs(heightLeft - heightRight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    let nodes = this.inOrder(this.root);
    let array = nodes.map((node) => node.data);
    this.root = this.buildTree(array);
    return this.root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

export { Tree };
