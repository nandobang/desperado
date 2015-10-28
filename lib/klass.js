$D.Klass = function Klass(k) {
  k.prototype.do(function () {
    this.getClassName = function () {
      return this.constructor.name;
    };
  });

  k.do(function () {
    this.getClassName = function () {
      return this.name;
    };

    this.extends = function (k) {
      var staticScope = k;
      var instanceScope = new k();

      for (var p in k) {
        this[p] = k[p];
      }

      for (var p in k.prototype) {
        this.prototype[p] = k.prototype[p];
      }
    };
  });

  return k;
};
