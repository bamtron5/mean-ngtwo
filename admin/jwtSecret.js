var a = function(){ return Math.random().toString(36) };
var b = [a,a,a,a,a];
var c = '';
var d = b.map(function(val){ c += val();  return c; });
module.exports = 'ISeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYmFtdHJvbjUiLCJpYXQiOjE0NTY3NDA1NjJ9.dDDlA8QpALM7ye6tVK0oYuWV_O06efD9FmVdoJQ-DKc';