hobbes.browser = function () {
  
  /**
   * Given an HTML element wraps it to provide a runtime environment.
   *
   * @constructor
   * @param elem HTML element
   */
  var ElementEnv = function (elem) {
    /**
     * The Vava System class
     * Needs to be defined inline to have access to the elem for IO
     */
    this.System = {
      out : {
        print : function (string) {
          elem.innerHTML += string;
        },
        println : function (string) {
          this.print(string + "\n");
        }
      } // end of `out` 'stream'
    };

  }; // end base definition of element environment
  
  /**
   * Prototype for a Vava variable
   * @constructor
   */
  ElementEnv.prototype._VavaVariable = function (type) {
    this.type = type || null;
    this.value = null;
  };
  
  ElementEnv.prototype._VavaVariable.prototype.getValue = function () {
    return this.value;
  };
  
  ElementEnv.prototype._VavaVariable.prototype.setValue = function (value) {
    if (value.type !== this.type) throw new TypeError('Value needs to be compatible');
    this.value = value;
    return this.value;
  };
  
  /**
   * Given an ID or element returns an execution scope bound to the
   * element of the element identified by the ID.
   *
   * @param elemOrID DOM element or ID of DOM element
   * @throws TypeError If no argument has been given
   * @throws Error If ID has been given, but no such element was found
   * @returns Scope object bound to referenced element
   */
  var outputScope = function (elemOrID) {
    if (!elemOrID) throw new TypeError('Expected element reference but none given');
    if (typeof elemOrID === 'string') elemOrID = document.getElementById(elemOrID);
    if (!elemOrID) throw new Error('ID was given, but no such element found');
    if (!elemOrID.hasOwnProperty('innerHTML')) throw new Error('Referenced object is not a DOM element');
    
    return new ElementEnv(elemOrID);
  };

  return {
    outputScope : outputScope
  };

}();
