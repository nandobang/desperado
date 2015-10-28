$D = {};
$D.Utils = {};

$D.Utils.queryToObject = function (q) {
  if (q) {
    var pairs = q.split('&');
    var obj = {};

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');

      obj[pair[0]] = pair[1];
    }

    return obj;
  } else {
    return {};
  }
};

Object.prototype.do = function (f) {
  f.call(this);
};

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

String.prototype.startsWith = function (str) {
  return this.indexOf(str) == 0;
};

String.prototype.endsWith = function (str) {
  return this.reverse().indexOf(str.reverse()) == 0;
};
