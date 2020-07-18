const BinarySearchTree = require('../BinarySearchTree');
  
  describe('binarySearchTree', function() {
    var tree,
        testArr,
        valuesToInsert = [15, 25, 5, 17, 21, 28, 0, 14, 50, 1, 45, 13, 12, 11, 30, 35, 33, 31, 34];
  
    beforeEach(function() {
      tree = new BinarySearchTree(20);
      testArr = [];
    });
  
    it('has methods called `insert`, `contains`, `depthFirstForEach`, `breadthFirstForEach` and `size` ', function() {
      expect(typeof tree.insert).toBe('function');
      expect(typeof tree.contains).toBe('function');
      expect(typeof tree.depthFirstForEach).toBe('function');
      expect(typeof tree.breadthFirstForEach).toBe('function');
      expect(typeof tree.size).toBe('function');
    });
  
    it('takes values and reports the right size', function () {
      tree.insert(12);
      expect(tree.size()).toBe(2);
    });
  
    it('inserts nodes in the correct branch', function () {
      tree.insert(12);
      tree.insert(22);
      expect(tree.left.value).toBe(12);
      expect(tree.right.value).toBe(22);
    });
  
    it('ordains values when they are added', function() {
      expect(tree.value).toBe(20);
      tree.insert(15);
      expect(tree.left.value).toBe(15);
      tree.insert(25);
      expect(tree.right.value).toBe(25);
      tree.insert(5);
      expect(tree.left.left.value).toBe(5);
      tree.insert(17);
      tree.insert(21);
      tree.insert(28);
      tree.insert(0);
      tree.insert(14);
      tree.insert(50);
      tree.insert(1);
      tree.insert(45);
      tree.insert(13);
      tree.insert(12);
      tree.insert(11);
      expect(tree.left.left.right.left.left.left.value).toBe(11);
      tree.insert(30);
      tree.insert(35);
      tree.insert(33);
      tree.insert(31);
      tree.insert(34);
      expect(tree.right.right.right.left.left.right.left.right.value).toBe(34);
    });
  
    it('`contains` returns true if the value is on the tree', function() {
      valuesToInsert.forEach(function(value){
          tree.insert(value);
      });
      valuesToInsert.forEach(function(value){
          expect(tree.contains(value)).toBe(true);
      });
    });
  
    it('`contains` returns false if the value is not on the tree', function() {
      valuesToInsert.forEach(function(value){
          tree.insert(value);
      });
      [6, 23, 37, 51].forEach(function(value){
          expect(tree.contains(value)).toBe(false);
      });
    });
  
    // obvious advantage: values are processed by their logic order
    it('runs depth-first (using an "in-order" path) when depthFirstForEach() is executed without any option or using the "in-order" option', function() {
      valuesToInsert.forEach(function(value){
          tree.insert(value);
      });
      tree.depthFirstForEach(function(val){ testArr.push(val); });
      expect(testArr).toEqual([ 0, 1, 5, 11, 12, 13, 14, 15, 17, 20, 21, 25, 28, 30, 31, 33, 34, 35, 45, 50 ]);
      testArr = [];
      tree.depthFirstForEach(function(val){ testArr.push(val); }, 'in-order');
      expect(testArr).toEqual([ 0, 1, 5, 11, 12, 13, 14, 15, 17, 20, 21, 25, 28, 30, 31, 33, 34, 35, 45, 50 ]);
    });
  
    // case of use: copying the tree (it starts by processing the root first)
    it('runs depth-first (using a "pre-order" path) when depthFirstForEach() is executed with the "pre-order" option', function() {
      valuesToInsert.forEach(function(value){
          tree.insert(value);
      });
      tree.depthFirstForEach(function(val){ testArr.push(val); }, 'pre-order');
      expect(testArr).toEqual([20, 15, 5, 0, 1, 14, 13, 12, 11, 17, 25, 21, 28, 50, 45, 30, 35, 33, 31, 34]);
    });
  
    // case of use: deleting a tree, it starts by processing the leaves first
    it('runs depth-first (using a "post-order" path) when depthFirstForEach() is executed with the "post-order" option', function() {
      valuesToInsert.forEach(function(value){
          tree.insert(value);
      });
      tree.depthFirstForEach(function(val){ testArr.push(val); }, 'post-order');
      expect(testArr).toEqual([ 1, 0, 11, 12, 13, 14, 5, 17, 15, 21, 31, 34, 33, 35, 30, 45, 50, 28, 25, 20 ]);
    });
  
    // useful when each level of the tree has a meaning (org chart? DOM elements?)
    it('runs breadth-first when breadthFirstForEach() is executed', function() {
      valuesToInsert.forEach(function(value){
          tree.insert(value);
      });
      var depth = [];
      tree.breadthFirstForEach(function(val){ depth.push(val); });
      expect(depth).toEqual([20, 15, 25, 5, 17, 21, 28, 0, 14, 50, 1, 13, 45, 12, 30, 11, 35, 33, 31, 34]);
    });
  });