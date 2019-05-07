const utils = {
  typeDecide(o, type) {
    return Object.prototype.toString.call(o) === `[object ${type}]`;
  },
  serializeObj(obj) {
    let parames = '';
    Object.keys(obj).forEach((name) => {
      if (utils.typeDecide(obj[name], 'Object')) {
        parames += `${name}=${utils.stringify(obj[name])}`;
      } else {
        parames += `${name}=${obj[name]}^`;
      }
    });
    return encodeURIComponent(parames.substr(0, parames.length - 1));
  },
  stringify(obj) {
    if (window.JSON && window.JSON.stringify) {
      return JSON.stringify(obj);
    }
    let t = typeof (obj);
    if (t != 'object' || obj === null) {
      // simple data type
      if (t == 'string') obj = `"${obj}"`;
      return String(obj);
    }
    // recurse array or object
    let n,
      v,
      json = [],
      arr = (obj && obj.constructor == Array);

    // fix.
    const self = arguments.callee;

    for (n in obj) {
      if (obj.hasOwnProperty(n)) {
        v = obj[n];
        t = typeof (v);
        if (obj.hasOwnProperty(n)) {
          if (t == 'string') v = `"${v}"`;
          else if (t == 'object' && v !== null)
          // v = jQuery.stringify(v);
          { v = self(v); }
          json.push((arr ? '' : `"${n}":`) + String(v));
        }
      }
    }
    return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
  },
  assignObject(obj1, obj2) {
    for (const name in obj2) {
      if (obj2.hasOwnProperty(name)) {
        obj1[name] = obj2[name];
      }
    }
    return obj1;
  },
};

export default utils;
