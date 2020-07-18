# BST

This is a TypeScript version of an Binary Search Tree function.
It has 4 methods that I'm adding to its prototype:

`Insert`: Inserts a new node to our tree

```javascript
BinarySearchTree.prototype.insert = function(value: number):void {
    if(value < this.value) {
      if(this.left === null) {
        var newTree = new BinarySearchTree(value);
        this.left = newTree;
      } else {
        this.left.insert(value);
      }
    } else {
      if(this.right === null) {
        var newTree = new BinarySearchTree(value);
        this.right = newTree;
      } else {
        this.right.insert(value);
      
      }
    }
  }
```

`Contains`: Searchs for a given value in our tree.

```javascript
BinarySearchTree.prototype.contains = function(value: number): any {
    if (this.value === value) {
      return true;
    }
    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    }
  
  }
```

`Depth First`: It reads our tree from the root to the deepest level on every branch and returns an array with each value.

```javascript
BinarySearchTree.prototype.depthFirstForEach = function(cb:CallBack, option: string): any {
    if (option === "pre-order") {
      cb(this.value);
      if (this.left !== null) {
        this.left.depthFirstForEach(cb, option);
      }
      if (this.right !== null) {
        this.right.depthFirstForEach(cb, option);
      }
    } else if (option === "post-order") {
      if (this.left !== null) {
        this.left.depthFirstForEach(cb, option);
      }
      if (this.right !== null) {
        this.right.depthFirstForEach(cb, option);
      }
      cb(this.value);
    } else {
      if (this.left !== null) {
        this.left.depthFirstForEach(cb, option);
      }
      cb(this.value);
      if (this.right !== null) {
        this.right.depthFirstForEach(cb, option);
      }
    }
  }
```

`Breadth First`: It reads our tree from the root to the deepest level, from left to rigth on every level.

```javascript
BinarySearchTree.prototype.breadthFirstForEach = function(cb: CallBack, array: any[]): any {
    if (array == null){
      var array: any[] = [];
    }
    if (this.left !== null) {
      array.push(this.left);
    }
    if (this.right !== null) {
      array.push(this.right);
    }
    cb(this.value);
    if (array.length > 0) {
      array.shift().breadthFirstForEach(cb, array);
    }
  }
```

`Size`: It counts how many nodes has our tree.

```javascript
BinarySearchTree.prototype.size = function(): number {
  if (this.left === null && this.right === null) {
    return 1;
  }
  if (this.left === null) {
    return this.right.size() + 1;
  }
  if (this.right === null) {
    return this.left.size() + 1;
  }
  return this.left.size() + this.right.size() + 1;
}
```