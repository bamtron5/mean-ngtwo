var a = function(){ return Math.random().toString(36) };
var b = [a,a,a,a,a];
var c = '';
var d = b.map(function(val){ c += val();  return c; });
module.exports = c;