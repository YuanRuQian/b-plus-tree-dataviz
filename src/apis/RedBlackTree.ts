import { Node } from "./Node";

export class RedBlackTree {
  _root: Node;
  _size: number;

  constructor() {
    this._root = Node.NIL;
    this._size = 0;
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

    if (!node.isNIL) {
      this._insertNode(new Node(key));
    }

    return this;
  }

  delete(key: number): boolean {
    const node = this._findNode(key);
    const result = this._deleteNode(node);
    
    if(!node.isNIL) {
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
    let child, parent;
    let isRed;

    if (!node._left.isNIL && !node._right.isNIL) {
      const next = this._firstNode(node._right);
      if (node === this._root) {
        this._root = next;
      } else {
        if (node === node._parent._left) {
          node._parent._left = next;
        } else {
          node._parent._right = next;
        }
        child = next._right;
        parent = next._parent;
        isRed = next.isRed;
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
        next.setBlack = node.isBlack;
        next._left._parent = next;
        if (isRed) {
          return true;
        }
      }
    } else {
      if (!node._left.isNIL) {
        child = node._left;
      } else {
        child = node._right;
      }
      parent = node._parent;
      isRed = node.isRed;
      if (!child.isNIL) {
        child._parent = parent;
      }
      if (node === this._root) {
        this._root = child;
      } else {
        if (node === parent._left) {
          parent._left = child;
        } else {
          parent._right = child;
        }
        if (isRed) {
          return true;
        }
      }

      node = child;

      while (node !== this._root && node.isBlack) {
        if (node === parent._left) {
          let other = parent._right;
          if (other.isRed) {
            other.setBlack = parent.setRed = true;
            this._leftRotate(parent);
            other = parent._right;
          }

          if (other._left.isBlack && other._right.isBlack) {
            other.setRed = true;
            node = parent;
            parent = node._parent;
            continue;
          }

          if (other._right.isBlack) {
            other._left.setBlack = other.setRed = true;
            this._rightRotate(other);
            other = parent._right;
          }

          other.setBlack = parent.isBlack;
          parent.setBlack = other._right.setBlack = true;
          this._leftRotate(parent);
          node = this._root;
          break;
        } else {
          let other = parent._left;
          if (other.isRed) {
            other.setBlack = parent.setRed = true;
            this._rightRotate(parent);
            other = parent._left;
          }

          if (other._left.isBlack && other._right.isBlack) {
            other.setRed = true;
            node = parent;
            parent = node._parent;
            continue;
          }

          if (other._left.isBlack) {
            other._right.setBlack = other.setRed = true;
            this._leftRotate(other);
            other = parent._left;
          }

          other.setBlack = parent.isBlack;
          parent.setBlack = other._left.setBlack = true;
          this._rightRotate(parent);
          node = this._root;
          break;
        }
      }
    }
    if (!node.isNIL) {
      node.setBlack = true;
    }
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
  _findNode(key: number): Node {
    let current = this._root;
    while (!current.isNIL && current.key !== key) {
      if (current.key > key) {
        current = current._left;
      } else {
        current = current._right;
      }
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
      n = n.key > node.key ? n._left : n._right;
    }
    node._parent = parent;

    if (parent.key > node.key) {
      parent._left = node;
    } else {
      parent._right = node;
    }
    node.setRed = true;
    // reinstate the red-black properties after inserting

    while (node._parent.isRed) {
      parent = node._parent;
      const grandParent = parent._parent;
      if (parent === grandParent._left) {
        if (grandParent._right.isRed) {
          parent.setBlack =
            grandParent._right.setBlack =
            grandParent.setRed =
              true;
          node = grandParent;
          continue;
        }

        if (node === parent._right) {
          this._leftRotate(parent);
          [parent, node] = [node, parent];
        }
        parent.setBlack = grandParent.setRed = true;
        this._rightRotate(grandParent);
        continue;
      }

      if (grandParent._left.isRed) {
        parent.setBlack =
          grandParent._left.setBlack =
          grandParent.setRed =
            true;
        node = grandParent;
        continue;
      }

      if (node === parent._left) {
        this._rightRotate(parent);
        [parent, node] = [node, parent];
      }

      parent.setBlack = grandParent.setRed = true;
      this._leftRotate(grandParent);
    }
    this._root.setBlack = true;
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
    } else if (node === node._parent._left) {
      node._parent._left = child;
    } else {
      node._parent._right = child;
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
}
