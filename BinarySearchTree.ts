
type CallBack = (any:any) => void

function BinarySearchTree(value: number) {
  this.value = value;
  this.left = null;
  this.right = null;
    
}
  
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