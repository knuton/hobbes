/* Jison generated parser */
var vava_proper = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"type_declaration":13,"class_declaration":14,"KEYWORD_CLASS":15,"class_body":16,"EMBRACE":17,"class_body_declarations":18,"UNBRACE":19,"class_body_declaration":20,"class_member_declaration":21,"static_initializer":22,"constructor_declaration":23,"field_declaration":24,"method_declaration":25,"type":26,"variable_declarators":27,"variable_declarator":28,"variable_declarator_id":29,"OPERATOR_ASSIGNMENT":30,"variable_initializer":31,"expression":32,"primitive_type":33,"numeric_type":34,"PRIMITIVE_BOOLEAN":35,"integral_type":36,"floating_point_type":37,"PRIMITIVE_INTEGER":38,"PRIMITIVE_FLOAT":39,"INTEGER_EXPRESSION":40,"FLOAT_EXPRESSION":41,"$accept":0,"$end":1},
terminals_: {"2":"error","4":"EOF","8":"KEYWORD_PACKAGE","9":"IDENTIFIER","10":"LINE_TERMINATOR","12":"KEYWORD_IMPORT","15":"KEYWORD_CLASS","17":"EMBRACE","19":"UNBRACE","22":"static_initializer","23":"constructor_declaration","25":"method_declaration","30":"OPERATOR_ASSIGNMENT","35":"PRIMITIVE_BOOLEAN","38":"PRIMITIVE_INTEGER","39":"PRIMITIVE_FLOAT","40":"INTEGER_EXPRESSION","41":"FLOAT_EXPRESSION"},
productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[13,1],[14,3],[16,3],[18,1],[18,2],[20,1],[20,1],[20,1],[21,1],[21,1],[24,3],[27,1],[27,2],[28,1],[28,3],[29,1],[31,1],[26,1],[33,1],[33,1],[34,1],[34,1],[36,1],[37,1],[32,1],[32,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy) {

var $$ = arguments[5],$0=arguments[5].length;
switch(arguments[4]) {
case 1: return new yy.CompilationUnit(); 
break;
case 2: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2+1-1]; return cu; 
break;
case 3: var cu = new yy.CompilationUnit(); cu.vavaImports = $$[$0-2+1-1]; return cu; 
break;
case 4: var cu = new yy.CompilationUnit(); cu.children.push($$[$0-2+1-1]); return cu; 
break;
case 5: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-3+1-1]; cu.vavaImports = $$[$0-3+2-1]; return cu; 
break;
case 6: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-3+1-1]; cu.children.push($$[$0-3+2-1]); return cu; 
break;
case 7: var cu = new yy.CompilationUnit(); cu.vavaImports = $$[$0-3+1-1]; cu.children.push($$[$0-3+2-1]); return cu; 
break;
case 8: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-4+1-1]; cu.vavaImports = $$[$0-4+2-1]; cu.children.push($$[$0-4+3-1]); return cu; 
break;
case 9: this.$ = $$[$0-3+2-1]; 
break;
case 10: this.$ = [$$[$0-1+1-1]]; 
break;
case 11: $$[$0-2+1-1].push($$[$0-2+2-1]); this.$ = $$[$0-2+1-1]; 
break;
case 12: this.$ = $$[$0-3+2-1]; 
break;
case 13: this.$ = $$[$0-1+1-1]; 
break;
case 14: this.$ = $$[$0-1+1-1]; 
break;
case 15: this.$ = new yy.ClassDeclaration($$[$0-3+2-1], $$[$0-3+3-1]); 
break;
case 16: this.$ = $$[$0-3+2-1]; 
break;
case 17: this.$ = [$$[$0-1+1-1]]; 
break;
case 18: $$[$0-2+1-1].push($$[$0-2+2-1]); this.$ = $$[$0-2+1-1]; 
break;
case 19: this.$ = $$[$0-1+1-1] 
break;
case 20: this.$ = $$[$0-1+1-1]; 
break;
case 21: this.$ = $$[$0-1+1-1]; 
break;
case 22: this.$ = $$[$0-1+1-1]; 
break;
case 23: this.$ = $$[$0-1+1-1]; 
break;
case 24: this.$ = yy.FieldDeclaration($$[$0-3+1-1], $$[$0-3+2-1]); 
break;
case 25: this.$ = [$$[$0-1+1-1]]; 
break;
case 26: $$[$0-2+1-1].push($$[$0-2+2-1]); this.$ = $$[$0-2+1-1]; 
break;
case 27: this.$ = yy.VariableDeclarator($$[$0-1+1-1]); 
break;
case 28: this.$ = yy.VariableDeclarator($$[$0-3+1-1], $$[$0-3+3-1]); 
break;
case 29: this.$ = $$[$0-1+1-1]; 
break;
case 30: this.$ = $$[$0-1+1-1]; 
break;
case 31: this.$ = $$[$0-1+1-1]; 
break;
case 32: this.$ = $$[$0-1+1-1]; 
break;
case 33: this.$ = $$[$0-1+1-1]; 
break;
case 34: this.$ = $$[$0-1+1-1]; 
break;
case 35: this.$ = $$[$0-1+1-1]; 
break;
case 36: this.$ = $$[$0-1+1-1]; 
break;
case 37: this.$ = $$[$0-1+1-1]; 
break;
case 38: this.$ = Number(yytext); 
break;
case 39: this.$ = Number(yytext); 
break;
}
},
table: [{"3":1,"4":[1,2],"5":3,"6":4,"7":5,"8":[1,6],"11":7,"12":[1,9],"13":8,"14":10,"15":[1,11]},{"1":[3]},{"1":[2,1]},{"4":[1,12],"6":13,"7":14,"11":7,"12":[1,9],"13":8,"14":10,"15":[1,11]},{"4":[1,15],"7":16,"11":17,"12":[1,9],"13":8,"14":10,"15":[1,11]},{"4":[1,18]},{"9":[1,19]},{"4":[2,10],"12":[2,10],"15":[2,10]},{"4":[2,13]},{"9":[1,20]},{"4":[2,14]},{"9":[1,21]},{"1":[2,2]},{"4":[1,22],"7":23,"11":17,"12":[1,9],"13":8,"14":10,"15":[1,11]},{"4":[1,24]},{"1":[2,3]},{"4":[1,25]},{"4":[2,11],"12":[2,11],"15":[2,11]},{"1":[2,4]},{"10":[1,26]},{"10":[1,27]},{"16":28,"17":[1,29]},{"1":[2,5]},{"4":[1,30]},{"1":[2,6]},{"1":[2,7]},{"4":[2,9],"12":[2,9],"15":[2,9]},{"4":[2,12],"12":[2,12],"15":[2,12]},{"4":[2,15]},{"18":31,"20":32,"21":33,"22":[1,34],"23":[1,35],"24":36,"25":[1,37],"26":38,"33":39,"34":40,"35":[1,41],"36":42,"37":43,"38":[1,44],"39":[1,45]},{"1":[2,8]},{"19":[1,46],"20":47,"21":33,"22":[1,34],"23":[1,35],"24":36,"25":[1,37],"26":38,"33":39,"34":40,"35":[1,41],"36":42,"37":43,"38":[1,44],"39":[1,45]},{"19":[2,17],"22":[2,17],"23":[2,17],"25":[2,17],"35":[2,17],"38":[2,17],"39":[2,17]},{"19":[2,19],"22":[2,19],"23":[2,19],"25":[2,19],"35":[2,19],"38":[2,19],"39":[2,19]},{"19":[2,20],"22":[2,20],"23":[2,20],"25":[2,20],"35":[2,20],"38":[2,20],"39":[2,20]},{"19":[2,21],"22":[2,21],"23":[2,21],"25":[2,21],"35":[2,21],"38":[2,21],"39":[2,21]},{"19":[2,22],"22":[2,22],"23":[2,22],"25":[2,22],"35":[2,22],"38":[2,22],"39":[2,22]},{"19":[2,23],"22":[2,23],"23":[2,23],"25":[2,23],"35":[2,23],"38":[2,23],"39":[2,23]},{"9":[1,51],"27":48,"28":49,"29":50},{"9":[2,31]},{"9":[2,32]},{"9":[2,33]},{"9":[2,34]},{"9":[2,35]},{"9":[2,36]},{"9":[2,37]},{"4":[2,16]},{"19":[2,18],"22":[2,18],"23":[2,18],"25":[2,18],"35":[2,18],"38":[2,18],"39":[2,18]},{"9":[1,51],"10":[1,52],"28":53,"29":50},{"9":[2,25],"10":[2,25]},{"9":[2,27],"10":[2,27],"30":[1,54]},{"9":[2,29],"10":[2,29],"30":[2,29]},{"19":[2,24],"22":[2,24],"23":[2,24],"25":[2,24],"35":[2,24],"38":[2,24],"39":[2,24]},{"9":[2,26],"10":[2,26]},{"31":55,"32":56,"40":[1,57],"41":[1,58]},{"9":[2,28],"10":[2,28]},{"9":[2,30],"10":[2,30]},{"9":[2,38],"10":[2,38]},{"9":[2,39],"10":[2,39]}],
defaultActions: {"2":[2,1],"8":[2,13],"10":[2,14],"12":[2,2],"15":[2,3],"18":[2,4],"22":[2,5],"24":[2,6],"25":[2,7],"28":[2,15],"30":[2,8],"39":[2,31],"40":[2,32],"41":[2,33],"42":[2,34],"43":[2,35],"44":[2,36],"45":[2,37],"46":[2,16]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        shifts = 0,
        reductions = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;

    var parseError = this.yy.parseError = typeof this.yy.parseError == 'function' ? this.yy.parseError : this.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
    }

    function checkRecover (st) {
        for (var p in table[st]) if (p == TERROR) {
            return true;
        }
        return false;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected, recovered = false;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                if (this.lexer.showPosition) {
                    parseError.call(this, 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', '),
                        {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, expected: expected});
                } else {
                    parseError.call(this, 'Parse error on line '+(yylineno+1)+": Unexpected '"+(this.terminals_[symbol] || symbol)+"'",
                        {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, expected: expected});
                }
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw 'Parsing halted.'
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if (checkRecover(state)) {
                    break;
                }
                if (state == 0) {
                    throw 'Parsing halted.'
                }
                popStack(1);
                state = stack[stack.length-1];
            }
            
            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        a = action; 

        switch (a[0]) {

            case 1: // shift
                shifts++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext); // semantic values or junk only, no terminals
                stack.push(a[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                reductions++;

                len = this.productions_[a[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, a[1], vstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                }

                stack.push(this.productions_[a[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept

                this.reductionCount = reductions;
                this.shiftCount = shifts;
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:"",
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        for (var i=0;i < this.rules.length; i++) {
            match = this._input.match(this.rules[i]);
            if (match) {
                lines = match[0].match(/\n/g);
                if (lines) this.yylineno += lines.length;
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, i);
                if (token) return token;
                else return;
            }
        }
        if (this._input == this.EOF) {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function () {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    }});
lexer.performAction = function anonymous(yy,yy_) {

switch(arguments[2]) {
case 0:/* skip whitespace */
break;
case 1:return 17; /* Basic Syntax */
break;
case 2:return 19;
break;
case 3:return 'COMMA';
break;
case 4:return 10;
break;
case 5:return 'MODIFIER_PUBLIC'; /* Modifier */
break;
case 6:return 'MODIFIER_PRIVATE';
break;
case 7:return 'MODIFIER_PROTECTED';
break;
case 8:return 'MODIFIER_STATIC';
break;
case 9:return 'MODIFIER_VOID';
break;
case 10:return 'MODIFIER_FINAL';
break;
case 11:return 8; /* Keywords */
break;
case 12:return 12;
break;
case 13:return 15;
break;
case 14:return 9; /* Varying form */
break;
case 15:return 40;
break;
case 16:return 41;
break;
case 17:return 35; /* Primitive Types */
break;
case 18:return 38;
break;
case 19:return 39;
break;
case 20:return 30;
break;
case 21:return 4;
break;
case 22:return 'INVALID';
break;
}
};
lexer.rules = [/^\s+/,/^\{/,/^\}/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^class\b/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^[0-9]+/,/^[0-9]+.[0-9]*/,/^boolean\b/,/^int\b/,/^float\b/,/^=/,/^$/,/^./];return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined') {
exports.parser = vava_proper;
exports.parse = function () { return vava_proper.parse.apply(vava_proper, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}