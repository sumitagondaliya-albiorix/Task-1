let array = [1, 2, 3, 4];
let a = array.forEach(function (element) {
  console.log(element);
  return element * 2;
});
console.log(a, "a");
