function parseArgs() {
  var query = window.location.search.slice(1);
  query  = decodeURI(query);
  var obj = {};
  if (query) {
    query = query.split('#')[0];
    var arr = query.split('&');
    for (var i=0; i<arr.length; i++) {
      var a = arr[i].split('=');
      obj[a[0]] = a[1];
    }
  }
  window.__args__ = obj;
  return obj;
}
function hasArgs() {
  var query = window.location.search.slice(1);
  var pass = false;
  if (query) {
    query = query.split('#')[0];
    var arr = query.split('&');
    for (var i=0; i<arr.length; i++) {
      pass = true;
    }
  }
  return pass;
}
module.exports = {
  parseArgs: parseArgs,
  hasArgs: hasArgs
}
