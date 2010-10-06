/* Jison generated parser */
hobbes.parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"class":3,"class_expression":4,"EOF":5,"KEYWORD_CLASS":6,"IDENTIFIER":7,"{":8,"class_body":9,"}":10,"main_method":11,"MODIFIER_PUBLIC":12,"MODIFIER_STATIC":13,"MODIFIER_VOID":14,"(":15,")":16,"expression_statements":17,"e":18,";":19,"+":20,"-":21,"*":22,"/":23,"NUMBER":24,"$accept":0,"$end":1},
terminals_: {"2":"error","5":"EOF","6":"KEYWORD_CLASS","7":"IDENTIFIER","8":"{","10":"}","12":"MODIFIER_PUBLIC","13":"MODIFIER_STATIC","14":"MODIFIER_VOID","15":"(","16":")","19":";","20":"+","21":"-","22":"*","23":"/","24":"NUMBER"},
productions_: [0,[3,2],[4,5],[9,1],[11,11],[17,2],[18,3],[18,3],[18,3],[18,3],[18,2],[18,3],[18,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy) {

var $$ = arguments[5],$0=arguments[5].length;
switch(arguments[4]) {
case 1:print($$[$0-2+1-1]); return $$[$0-2+1-1];
break;
case 2:return $$[$0-5+4-1];
break;
case 3:return $$[$0-1+1-1];
break;
case 4:return $$[$0-11+10-1];
break;
case 5:return $$[$0-2+1-1];
break;
case 6:this.$ = $$[$0-3+1-1]+$$[$0-3+3-1];
break;
case 7:this.$ = $$[$0-3+1-1]-$$[$0-3+3-1];
break;
case 8:this.$ = $$[$0-3+1-1]*$$[$0-3+3-1];
break;
case 9:this.$ = $$[$0-3+1-1]/$$[$0-3+3-1];
break;
case 10:this.$ = -$$[$0-2+2-1];
break;
case 11:this.$ = $$[$0-3+2-1];
break;
case 12:this.$ = Number(yytext);
break;
}
},
table: [{"3":1,"4":2,"6":[1,3]},{"1":[3]},{"5":[1,4]},{"7":[1,5]},{"1":[2,1]},{"8":[1,6]},{"9":7,"11":8,"12":[1,9]},{"10":[1,10]},{"10":[2,3]},{"13":[1,11]},{"5":[2,2]},{"14":[1,12]},{"7":[1,13]},{"15":[1,14]},{"7":[1,15]},{"7":[1,16]},{"16":[1,17]},{"8":[1,18]},{"15":[1,22],"17":19,"18":20,"21":[1,21],"24":[1,23]},{"10":[1,24]},{"19":[1,25],"20":[1,26],"21":[1,27],"22":[1,28],"23":[1,29]},{"15":[1,22],"18":30,"21":[1,21],"24":[1,23]},{"15":[1,22],"18":31,"21":[1,21],"24":[1,23]},{"16":[2,12],"19":[2,12],"20":[2,12],"21":[2,12],"22":[2,12],"23":[2,12]},{"10":[2,4]},{"10":[2,5]},{"15":[1,22],"18":32,"21":[1,21],"24":[1,23]},{"15":[1,22],"18":33,"21":[1,21],"24":[1,23]},{"15":[1,22],"18":34,"21":[1,21],"24":[1,23]},{"15":[1,22],"18":35,"21":[1,21],"24":[1,23]},{"16":[2,10],"19":[2,10],"20":[2,10],"21":[2,10],"22":[2,10],"23":[2,10]},{"16":[1,36],"20":[1,26],"21":[1,27],"22":[1,28],"23":[1,29]},{"16":[2,6],"19":[2,6],"20":[2,6],"21":[2,6],"22":[1,28],"23":[1,29]},{"16":[2,7],"19":[2,7],"20":[2,7],"21":[2,7],"22":[1,28],"23":[1,29]},{"16":[2,8],"19":[2,8],"20":[2,8],"21":[2,8],"22":[2,8],"23":[2,8]},{"16":[2,9],"19":[2,9],"20":[2,9],"21":[2,9],"22":[2,9],"23":[2,9]},{"16":[2,11],"19":[2,11],"20":[2,11],"21":[2,11],"22":[2,11],"23":[2,11]}],
defaultActions: {"4":[2,1],"8":[2,3],"10":[2,2],"24":[2,4],"25":[2,5]},
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
case 1:return 12;
break;
case 2:return 'MODIFIER_PRIVATE';
break;
case 3:return 'MODIFIER_PROTECTED';
break;
case 4:return 13;
break;
case 5:return 14;
break;
case 6:return 'MODIFIER_FINAL';
break;
case 7:return 6;
break;
case 8:return 7;
break;
case 9:return 24;
break;
case 10:return 22;
break;
case 11:return 23;
break;
case 12:return 21;
break;
case 13:return 20;
break;
case 14:return 15;
break;
case 15:return 16;
break;
case 16:return 8;
break;
case 17:return 10;
break;
case 18:return 19;
break;
case 19:return 5;
break;
case 20:return 'INVALID';
break;
}
};
lexer.rules = [/^\s+/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^class\b/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^[0-9]+(\.[0-9]+)?\b\b/,/^\*/,/^\//,/^-/,/^\+/,/^\(/,/^\)/,/^\{/,/^\}/,/^;/,/^$/,/^./];return lexer;})()
parser.lexer = lexer;
return parser;
})();
if ('undefined' !== 'undefined') {
exports.parser = vava;
exports.parse = function () { return vava.parse.apply(vava, arguments); }
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
