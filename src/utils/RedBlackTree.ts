import { RawNodeDatum } from "react-d3-tree";
import { Node, NodeColor } from "./RedBlackTreeNode";
import { isNull, isUndefined } from "./utils";

/**
 * Credits
 *
 * The implementation of Red Black Tree in this project was adapted from the rbts project, created by Daniel Ly and contributors.
 * This implementation is simplified and modified to fit the needs of this project.
 *
 * rbts - Typescript red-black tree
 * GitHub Repository: https://github.com/nalply/rbts
 *
 * Original ISC License:
 *
 * The ISC License (as of 2019)
 *
 * Copyright © Daniel Ly and contributors.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

export class RedBlackTree {
  _root: Node;
  _size: number;

  // construct a new tree from an existing tree's in-order traversal path
  constructor(tree?: RedBlackTree) {
    if (isUndefined(tree)) {
      this._root = Node.NIL;
      this._size = 0;
    } else {
      this._root = Node.NIL;
      this._size = 0;

      if (tree._root.isNIL) {
        return;
      }

      const path = tree.getInOrderTraversalPath();

      if (!isNull(path)) {
        this._root = this.constructTreeFromJSON(path);
        this._size = tree._size;
      }
    }
  }

  // construct tree with the exact left / right subtree with the given node ( same color )
  constructTreeFromJSON(node: RawNodeDatum | undefined): Node {
    if (isUndefined(node)) {
      return Node.NIL;
    }

    const newNode = new Node(parseInt(node.name));
    newNode._black = node.attributes!.color === NodeColor.BLACK;
    newNode._left = this.constructTreeFromJSON(node.children?.[0]);
    newNode._right = this.constructTreeFromJSON(node.children?.[1]);

    if (!newNode._left.isNIL) {
      newNode._left._parent = newNode;
    }

    if (!newNode._right.isNIL) {
      newNode._right._parent = newNode;
    }

    return newNode;
  }

  get size(): number {
    return this._size;
  }

  find(key: number): number | undefined {
    const node = this._findNode(key);
    return node.isNIL ? undefined : node.key;
  }

  insert(key: number): this {
    const node = this._findNode(key);

    if (node.isNIL) {
      this._insertNode(new Node(key));
    }

    return this;
  }

  delete(key: number): boolean {
    const node = this._findNode(key);
    const result = this._deleteNode(node);

    if (!node.isNIL) {
      node._parent = node._left = node._right = Node.NIL;
    }
    return result;
  }

  clear() {
    this._root = Node.NIL;
    this._size = 0;
  }

  _deleteNode(node: Node): boolean {
    if (node.isNIL) {
      return false;
    }

    this._size--;

    let child: Node, parent: Node, isRed: boolean;
    if (!node._left.isNIL && !node._right.isNIL) {
      const next = this._firstNode(node._right);
      next._left = node._left;
      if (node === this._root) {
        this._root = next;
      } else {
        if (node === node._parent._left) {
          node._parent._left = next;
        } else {
          node._parent._right = next;
        }
      }
      child = next._right;
      parent = next._parent;
      isRed = next._red;
      if (node === parent) {
        parent = next;
      } else {
        if (!child.isNIL) {
          child._parent = parent;
        }
        parent._left = child;
        next._right = node._right;
        node._right._parent = next;
      }
      next._parent = node._parent;
      next._black = node._black;
      node._left._parent = next;
      if (isRed) {
        return true;
      }
    } else {
      !node._left.isNIL ? (child = node._left) : (child = node._right);
      parent = node._parent;
      isRed = node._red;
      if (!child.isNIL) {
        child._parent = parent;
      }
      if (node === this._root) {
        this._root = child;
      } else {
        if (parent._left === node) {
          parent._left = child;
        } else {
          parent._right = child;
        }
      }
      if (isRed) {
        return true;
      }
    }

    // Reinstate the red-black tree invariants after the delete
    node = child;
    while (node !== this._root && node._black) {
      if (node === parent._left) {
        let brother = parent._right;
        if (brother._red) {
          brother._black = parent._red = true;
          this._leftRotate(parent);
          brother = parent._right;
        }
        if (brother._left._black && brother._right._black) {
          brother._red = true;
          node = parent;
          parent = node._parent;
          continue;
        }
        if (brother._right._black) {
          brother._left._black = brother._red = true;
          this._rightRotate(brother);
          brother = parent._right;
        }
        brother._black = parent._black;
        parent._black = brother._right._black = true;
        this._leftRotate(parent);
        node = this._root;
        break;
      } else {
        let brother = parent._left;
        if (brother._red) {
          brother._black = parent._red = true;
          this._rightRotate(parent);
          brother = parent._left;
        }
        if (brother._left._black && brother._right._black) {
          brother._red = true;
          node = parent;
          parent = node._parent;
          continue;
        }
        if (brother._left._black) {
          brother._right._black = brother._red = true;
          this._leftRotate(brother);
          brother = parent._left;
        }
        brother._black = parent._black;
        parent._black = brother._left._black = true;
        this._rightRotate(parent);
        node = this._root;
        break;
      }
    }
    if (!node.isNIL) node._black = true;
    return true;
  }

  // find the leftmost node
  _firstNode(node: Node = this._root): Node {
    while (!node._left.isNIL) {
      node = node._left;
    }

    return node;
  }

  // find the rightmost node
  _lastNode(node: Node = this._root): Node {
    while (!node._right.isNIL) {
      node = node._right;
    }
    return node;
  }

  // if find the key return node or return NIL
  _findNode(key: number, path?: Set<number>): Node {
    let current = this._root;

    while (!current.isNIL && current.key !== key) {
      if (path) {
        path.add(current.key);
      }

      if (current.key > key) {
        current = current._left;
      } else {
        current = current._right;
      }
    }

    if (!current.isNIL && path && current.key === key) {
      path.add(current.key);
    }

    return current.key === key ? current : Node.NIL;
  }

  _insertNode(node: Node): this {
    if (node.isNIL) {
      return this;
    }

    node._parent = node._left = node._right = Node.NIL;
    this._size++;

    // if there is no node, set the node as root
    if (this._root.isNIL) {
      this._root = node;
      return this;
    }

    let parent, n;
    parent = n = this._root;
    while (!n.isNIL) {
      parent = n;
      if (n.key > node.key) {
        n = n._left;
      } else {
        n = n._right;
      }
    }
    node._parent = parent;

    if (parent.key > node.key) {
      parent._left = node;
    } else {
      parent._right = node;
    }
    node._red = true;
    // reinstate the red-black properties after inserting

    while (node._parent._red) {
      parent = node._parent;
      const grandParent = parent._parent;
      if (parent === grandParent._left) {
        if (grandParent._right._red) {
          parent._black = grandParent._right._black = grandParent._red = true;
          node = grandParent;
          continue;
        }

        if (node === parent._right) {
          this._leftRotate(parent);
          [parent, node] = [node, parent];
        }
        parent._black = grandParent._red = true;
        this._rightRotate(grandParent);
        continue;
      }

      if (grandParent._left._red) {
        parent._black = grandParent._left._black = grandParent._red = true;
        node = grandParent;
        continue;
      }

      if (node === parent._left) {
        this._rightRotate(parent);
        [parent, node] = [node, parent];
      }

      parent._black = grandParent._red = true;
      this._leftRotate(grandParent);
    }
    this._root._black = true;
    return this;
  }

  _leftRotate(node: Node) {
    const child = node._right;
    node._right = child._left;
    if (!child._left.isNIL) {
      child._left._parent = node;
    }
    child._parent = node._parent;
    if (node === this._root) {
      this._root = child;
    } else {
      if (node === node._parent._left) {
        node._parent._left = child;
      } else {
        node._parent._right = child;
      }
    }
    node._parent = child;
    child._left = node;
  }

  _rightRotate(node: Node) {
    const child = node._left;
    node._left = child._right;
    if (!child._right.isNIL) {
      child._right._parent = node;
    }
    child._parent = node._parent;
    if (node === this._root) {
      this._root = child;
    } else if (node === node._parent._left) {
      node._parent._left = child;
    } else {
      node._parent._right = child;
    }
    node._parent = child;
    child._right = node;
  }

  // In-order traversal method to return the tree data in JSON format
  getInOrderTraversalPath(
    node: Node = this._root,
    findPath?: Set<number>,
  ): RawNodeDatum | null {
    if (node.isNIL) {
      return null;
    }

    const returnData = {
      name: node.key.toString(),
      attributes: {
        color: node._black ? NodeColor.BLACK : NodeColor.RED,
      },
      children: [
        this.getInOrderTraversalPath(node._left, findPath),
        this.getInOrderTraversalPath(node._right, findPath),
      ].filter((child) => !isNull(child)) as RawNodeDatum[] | undefined,
    };

    if (isUndefined(findPath)) {
      return { ...returnData };
    } else {
      return {
        ...returnData,
        attributes: {
          ...returnData.attributes,
          isOnFindPath: findPath.has(node.key),
        },
      };
    }
  }

  getInOrderTraversalPathWithFindPath(key: number): RawNodeDatum | null {
    const path = new Set<number>();
    const node = this._findNode(key, path);
    if (node.isNIL) {
      return null;
    }

    return this.getInOrderTraversalPath(this._root, path);
  }

  // There cannot be 2 consecutive red nodes.
  // Helper function to check if every red node has two black children and a black parent
  checkNoTwoConsecutiveRedNodes(node: Node): boolean {
    if (node.isNIL) {
      return true;
    }

    if (node._red) {
      if (!node._left._black || !node._right._black) {
        return false;
      }
    }

    return (
      this.checkNoTwoConsecutiveRedNodes(node._left) &&
      this.checkNoTwoConsecutiveRedNodes(node._right)
    );
  }

  // Returns the number of black nodes in a subtree of the given node
  // or -1 if it is not a red black tree.
  computeBlackHeight(node: Node): number {
    if (node.isNIL) {
      return 0;
    }

    const leftHeight = this.computeBlackHeight(node._left);
    const rightHeight = this.computeBlackHeight(node._right);

    const add = node._black ? 1 : 0;

    if (leftHeight === -1 || rightHeight === -1 || leftHeight !== rightHeight) {
      return -1;
    } else {
      return leftHeight + add;
    }
  }

  checkIfBlackHeightIsValid(node: Node): boolean {
    return this.computeBlackHeight(node) !== -1;
  }

  checkIfIsRedBlackTree(): boolean {
    // The root is black
    if (!this._root._black) {
      return false;
    }

    // There cannot be 2 consecutive red nodes.
    if (!this.checkNoTwoConsecutiveRedNodes(this._root)) {
      return false;
    }

    // Every path from a node to a descendant leaf contains the same number of black nodes.
    if (!this.checkIfBlackHeightIsValid(this._root)) {
      return false;
    }

    return true;
  }
}
