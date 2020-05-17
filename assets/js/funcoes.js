function sum(a, b) {
  return a + b;
}

console.log(sum(5, 6));

function compareNumber(a, b) {
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - b;
}

console.log(compareNumber(1, 1));
console.log(compareNumber(1, 2));
console.log(compareNumber(2, 1));

function superSum(from, upTo) {
  var sum = 0;

  for (var i = from; i <= upTo; i++) {
    sum += i;
  }

  return sum;
}

console.log(superSum(1, 10));
console.log(superSum(9, 100));
console.log(superSum(200, 1000));
