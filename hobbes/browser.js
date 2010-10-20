hobbes.browser = function () {
  
  /**
   * Given an ID or element returns an execution scope bound to the
   * element of the element identified by the ID.
   *
   * @params elemOrID DOM element or ID of DOM element
   * @throws TypeError If no argument has been given
   * @throws Error If ID has been given, but no such element was found
   * @returns Scope object bound to referenced element
   */
  var outputScope = function (elemOrID) {
    if (!elemOrID) throw new TypeError('Expected element reference but none given');
    if (typeof elemOrID === 'string') elemOrID = document.getElementById(elemOrID);
    if (!elemOrID) throw new Error('ID was given, but no such element found');
    if (!elemOrID.innerHTML) throw new Error('Referenced object is not a DOM element');
  };

  return {
    outputScope : outputScope
  };

}();
