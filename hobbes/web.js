exports.setup = function (ioElem) {

  var sources = getElementsByClass('hobbesecutable');

  ioElem = typeof ioElem === 'string' ? document.getElementById(ioElem) : ioElem;

  for (var i = 0; i < sources.length; i++) {
    var sourceElem = sources[i];
    var sourceElemStyle = window.getComputedStyle(sourceElem, null);
    var outerContainer = sourceElem.parentNode;
    var sourceContainer = document.createElement('div');
    sourceContainer.setAttribute('style', 'position: relative; padding: 0; margin: auto;');
    var linkContainer = document.createElement('p');
    linkContainer.setAttribute('style', 'width:' + sourceElemStyle.width + '; position: absolute; top: 3px; right: 3px; text-align:right;');
    var execButton = document.createElement('a');
    execButton.innerHTML = 'Run';
    execButton.setAttribute('href', '#run');
    execButton.setAttribute('class', 'runner');
    linkContainer.appendChild(execButton);
    outerContainer.replaceChild(sourceContainer, sourceElem);
    sourceContainer.appendChild(sourceElem);
    sourceContainer.appendChild(linkContainer);
    execButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      } 
      exports.execute(sourceElem, ioElem);
    }, null);
  }

};

exports.execute = function (srcOrElem, ioElem) {
  var source;
  if (typeof srcOrElem === 'string') {
    source = srcOrElem;
  } else {
    source = srcOrElem.value || srcOrElem.innerHTML;
  }

  if (!ioElem) {
    ioElem = srcOrElem;
  }

  var log = function (msg) {
    if (ioElem && typeof ioElem.innerHTML !== 'undefined') {
      ioElem.innerHTML += msg;
    } else if (console && console.log) {
      console.log(msg);
    } else {
      alert(msg);
    }
  }

  //// Shadow parts that need to be customized
  // Need to shadow stdlib
  var F = function () {};
  F.prototype = hobbes.stdlib;
  var stdlib = new F();
  // Need to shadow stdlib.java
  F.prototype = stdlib.java;
  var java = new F();
  // Need to shadow stdlib.java.lang
  F.prototype = stdlib.java.lang;
  var lang = new F();
  // Overwrite shadowed stdlib.java.lang's System with one bound to ioElem
  lang.System = hobbes.stdlib.java.lang.System(ioElem);
  java.lang = lang;
  stdlib.java = java;
  // Call compiler with modified stdlib
  try {
    hobbes.compiler.run(source, {stdlib: stdlib});
  } catch (err) {
    if (err.type === 'ParseError' || err.type === 'CompileTimeError') {
      for (var i = 0; i < err.length; i++) {
        log(err[i]);
      }
      log(err.summary + '\n');
    } else if (err.type === 'NoSuchMethodError') {
      log(err.message + '\n');
    } else {
      throw err;
    }
  }

};

/*** Helper functions ***/
function getElementsByClass(className,node,tag) {
  var classElements = [];
  node = node || document;
  tag  = tag  || '*';

  var tagElems = node.getElementsByTagName(tag);
  var numTagElems = tagElems.length;
  var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");

  for (i = 0, j = 0; i < numTagElems; i++) {
    if (pattern.test(tagElems[i].className)) {
      classElements[j++] = tagElems[i];
    }
  }
  return classElements;
}

