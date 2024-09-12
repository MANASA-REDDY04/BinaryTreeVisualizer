class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  traverseAndDraw(node, x, y, angle, depth, parentX, parentY) {
    if (node === null) return;

    const nodeElement = document.createElement("div");
    nodeElement.className = "node";
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;
    nodeElement.innerText = node.value;
    document.getElementById("treeContainer").appendChild(nodeElement);

    if (parentX !== null && parentY !== null) {
      const lineElement = document.createElement("div");
      lineElement.className = "line";

      const nodeWidth = 50;
      const nodeHeight = 50;

      const startX = parentX + nodeWidth / 2;
      const startY = parentY + nodeHeight / 2;
      const endX = x + nodeWidth / 2;
      const endY = y + nodeHeight / 2;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angleRad = Math.atan2(deltaY, deltaX);

      lineElement.style.width = `${length}px`;
      lineElement.style.transform = `rotate(${angleRad}rad)`;
      lineElement.style.left = `${startX}px`;
      lineElement.style.top = `${startY}px`;

      document.getElementById("treeContainer").appendChild(lineElement);
    }

    this.traverseAndDraw(
      node.left,
      x - angle / depth,
      y + 70,
      angle,
      depth + 1,
      x,
      y
    );
    this.traverseAndDraw(
      node.right,
      x + angle / depth,
      y + 70,
      angle,
      depth + 1,
      x,
      y
    );
  }

  draw() {
    document.getElementById("treeContainer").innerHTML = "";
    this.traverseAndDraw(
      this.root,
      window.innerWidth / 2,
      50,
      300,
      1,
      null,
      null
    );
  }

  // In-Order Traversal
  inorder(node, result = []) {
    if (node !== null) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
    return result;
  }

  // Pre-Order Traversal
  preorder(node, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  // Post-Order Traversal
  postorder(node, result = []) {
    if (node !== null) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.value);
    }
    return result;
  }
}

const binaryTree = new BinaryTree();

function addNode() {
  const value = parseInt(document.getElementById("nodeValue").value);
  if (!isNaN(value)) {
    binaryTree.add(value);
    binaryTree.draw();
  }
  document.getElementById("nodeValue").value = "";
}

function displayOutput(output) {
  document.getElementById("output").innerText = output.join(", ");
}

function inorderTraversal() {
  const result = binaryTree.inorder(binaryTree.root);
  displayOutput(result);
}

function preorderTraversal() {
  const result = binaryTree.preorder(binaryTree.root);
  displayOutput(result);
}

function postorderTraversal() {
  const result = binaryTree.postorder(binaryTree.root);
  displayOutput(result);
}
