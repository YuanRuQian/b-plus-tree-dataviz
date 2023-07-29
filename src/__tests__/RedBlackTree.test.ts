import exp from "constants";
import { RedBlackTree } from "../utils/RedBlackTree";

describe("RedBlackTree", () => {
  let rbTree: RedBlackTree;

  beforeEach(() => {
    rbTree = new RedBlackTree();
  });

  it("should insert elements correctly", () => {
    rbTree.insert(10);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(5);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(15);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Test the size after insertion
    expect(rbTree.size).toBe(3);

    // Test if elements are inserted correctly
    expect(rbTree.find(10)).toBe(10);
    expect(rbTree.find(5)).toBe(5);
    expect(rbTree.find(15)).toBe(15);
    expect(rbTree.find(7)).toBeUndefined();

    const json = {
      name: "10",
      color: "black",
      children: [
        {
          name: "5",
          color: "red",
          children: [],
        },
        {
          name: "15",
          color: "red",
          children: [],
        },
      ],
    };

    const traversalPathString = JSON.stringify(
      rbTree.getInOrderTraversalPath(),
    );
    const jsonString = JSON.stringify(json);
    expect(traversalPathString).toBe(jsonString);
  });

  it("should delete elements correctly", () => {
    rbTree.insert(10);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(5);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(15);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Test the size before deletion
    expect(rbTree.size).toBe(3);

    rbTree.delete(5);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Test the size after deletion
    expect(rbTree.size).toBe(2);

    // Test if elements are deleted correctly
    expect(rbTree.find(5)).toBeUndefined();
    expect(rbTree.find(10)).toBe(10);
    expect(rbTree.find(15)).toBe(15);

    const json = {
      name: "10",
      color: "black",
      children: [
        {
          name: "15",
          color: "red",
          children: [],
        },
      ],
    };
    const traversalPathString = JSON.stringify(
      rbTree.getInOrderTraversalPath(),
    );
    const jsonString = JSON.stringify(json);
    expect(traversalPathString).toBe(jsonString);
  });

  it("should perform rotations correctly", () => {
    rbTree.insert(10);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(5);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(15);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(3);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(7);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Test the size after insertion
    expect(rbTree.size).toBe(5);

    // The next rotation to be tested is the right rotation
    rbTree.insert(8);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Check if elements are still accessible
    expect(rbTree.find(10)).toBe(10);
    expect(rbTree.find(5)).toBe(5);
    expect(rbTree.find(15)).toBe(15);
    expect(rbTree.find(3)).toBe(3);
    expect(rbTree.find(7)).toBe(7);
    expect(rbTree.find(8)).toBe(8);

    // Perform another left rotation
    rbTree.insert(6);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Check if elements are still accessible
    expect(rbTree.find(10)).toBe(10);
    expect(rbTree.find(5)).toBe(5);
    expect(rbTree.find(15)).toBe(15);
    expect(rbTree.find(3)).toBe(3);
    expect(rbTree.find(7)).toBe(7);
    expect(rbTree.find(8)).toBe(8);
    expect(rbTree.find(6)).toBe(6);

    const json = {
      name: "10",
      color: "black",
      children: [
        {
          name: "5",
          color: "red",
          children: [
            {
              name: "3",
              color: "black",
              children: [],
            },
            {
              name: "7",
              color: "black",
              children: [
                {
                  name: "6",
                  color: "red",
                  children: [],
                },
                {
                  name: "8",
                  color: "red",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: "15",
          color: "black",
          children: [],
        },
      ],
    };

    const traversalPathString = JSON.stringify(
      rbTree.getInOrderTraversalPath(),
    );

    const jsonString = JSON.stringify(json);

    expect(traversalPathString).toBe(jsonString);
  });

  it("should be balanced after insertion and deletion", () => {
    // Test case to check if the tree remains balanced after multiple insertions and deletions

    rbTree.insert(10);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(5);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(15);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(3);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(7);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Perform a deletion
    rbTree.delete(3);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Perform more insertions and deletions
    rbTree.insert(12);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(20);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(25);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.delete(5);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    rbTree.insert(22);
    expect(rbTree.checkIfIsRedBlackTree()).toBe(true);

    // Check if elements are still accessible
    expect(rbTree.find(3)).toBeUndefined(); // 3 should have been deleted
    expect(rbTree.find(10)).toBe(10);
    expect(rbTree.find(5)).toBeUndefined(); // 5 should have been deleted
    expect(rbTree.find(15)).toBe(15);
    expect(rbTree.find(7)).toBe(7);
    expect(rbTree.find(12)).toBe(12);
    expect(rbTree.find(20)).toBe(20);
    expect(rbTree.find(25)).toBe(25);
    expect(rbTree.find(22)).toBe(22);

    const json = {
      name: "10",
      color: "black",
      children: [
        {
          name: "7",
          color: "black",
          children: [],
        },
        {
          name: "15",
          color: "red",
          children: [
            {
              name: "12",
              color: "black",
              children: [],
            },
            {
              name: "22",
              color: "black",
              children: [
                {
                  name: "20",
                  color: "red",
                  children: [],
                },
                {
                  name: "25",
                  color: "red",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };

    const traversalPathString = JSON.stringify(
      rbTree.getInOrderTraversalPath(),
    );

    const jsonString = JSON.stringify(json);

    expect(traversalPathString).toBe(jsonString);
  });

  it("should construct a deep copy from a RedBlackTree instance", () => {
    
    // random insert 100 numbers into the tree
    for (let i = 0; i < 100; i++) {
      rbTree.insert(Math.floor(Math.random() * 100));
    }

    // deep copy the tree
    const rbTreeCopy = new RedBlackTree(rbTree);

    // check if two trees have the same size
    expect(rbTree.size).toBe(rbTreeCopy.size);

    // check if the two trees have the same traversal path
    const traversalPathString = JSON.stringify(
      rbTree.getInOrderTraversalPath(),
    );

    const traversalPathStringCopy = JSON.stringify(
      rbTreeCopy.getInOrderTraversalPath(),
    );

    expect(traversalPathString).toBe(traversalPathStringCopy);
  });

  it("could clear the tree", () => {
    // randomly generate 10 numbers as an array
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.floor(Math.random() * 100));
    }

    // insert the numbers into the tree
    randomNumbers.forEach((number) => {
      rbTree.insert(number);
    });

    expect(rbTree.size).toBe(randomNumbers.length);

    rbTree.clear();

    // all nodes should be deleted
    randomNumbers.forEach((number) => {
      expect(rbTree.find(number)).toBeUndefined();
    });

    expect(rbTree.size).toBe(0);
    expect(rbTree._root.isNIL).toBe(true);

    const traversalPathString = JSON.stringify( rbTree.getInOrderTraversalPath() );
    const jsonString = JSON.stringify(null);

    expect(traversalPathString).toBe(jsonString);
  });
});
