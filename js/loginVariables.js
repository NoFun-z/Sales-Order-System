let pattern = {"Dave Kendell":"Prog1180", "Wendy":"Prog1180", "Sam":"Prog1180"};

console.log(pattern);

var s = localStorage.getItem("newPass");
var u = localStorage.getItem("changed");
pattern[u] = s; 

console.log(pattern);