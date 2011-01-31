/* Jison generated parser */
var vava_proper = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"type_declaration":13,"class_declaration":14,"KEYWORD_CLASS":15,"class_body":16,"EMBRACE":17,"class_body_declarations":18,"UNBRACE":19,"class_body_declaration":20,"class_member_declaration":21,"field_declaration":22,"method_declaration":23,"type":24,"variable_declarators":25,"method_header":26,"method_body":27,"method_declarator":28,"KEYWORD_VOID":29,"LEFT_PAREN":30,"formal_parameter_list":31,"RIGHT_PAREN":32,"formal_parameter":33,"formal_parameters":34,"COMMA":35,"variable_declarator_id":36,"block":37,"variable_declarator":38,"OPERATOR_ASSIGNMENT":39,"variable_initializer":40,"expression":41,"primitive_type":42,"numeric_type":43,"PRIMITIVE_BOOLEAN":44,"integral_type":45,"floating_point_type":46,"PRIMITIVE_INTEGER":47,"PRIMITIVE_FLOAT":48,"block_statements":49,"block_statement":50,"local_variable_declaration_statement":51,"statement":52,"statement_without_trailing_substatement":53,"local_variable_declaration":54,"empty_statement":55,"expression_statement":56,"statement_expression":57,"assignment":58,"name":59,"simple_name":60,"left_hand_side":61,"assignment_operator":62,"assignment_expression":63,"conditional_expression":64,"conditional_or_expression":65,"conditional_and_expression":66,"inclusive_or_expression":67,"exclusive_or_expression":68,"and_expression":69,"equality_expression":70,"relational_expression":71,"shift_expression":72,"additive_expression":73,"multiplicative_expression":74,"OPERATOR_ADDITION":75,"OPERATOR_SUBTRACTION":76,"unary_expression":77,"OPERATOR_MULTIPLICATION":78,"postfix_expression":79,"primary":80,"literal":81,"boolean_literal":82,"integer_literal":83,"TRUE_LITERAL":84,"FALSE_LITERAL":85,"DECIMAL_INTEGER_LITERAL":86,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",15:"KEYWORD_CLASS",17:"EMBRACE",19:"UNBRACE",29:"KEYWORD_VOID",30:"LEFT_PAREN",32:"RIGHT_PAREN",34:"formal_parameters",35:"COMMA",39:"OPERATOR_ASSIGNMENT",44:"PRIMITIVE_BOOLEAN",47:"PRIMITIVE_INTEGER",48:"PRIMITIVE_FLOAT",62:"assignment_operator",75:"OPERATOR_ADDITION",76:"OPERATOR_SUBTRACTION",78:"OPERATOR_MULTIPLICATION",84:"TRUE_LITERAL",85:"FALSE_LITERAL",86:"DECIMAL_INTEGER_LITERAL"},
productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[13,1],[14,3],[16,3],[18,1],[18,2],[20,1],[21,1],[21,1],[22,3],[23,2],[26,2],[26,2],[28,4],[31,1],[31,3],[33,2],[27,1],[25,1],[25,3],[38,1],[38,3],[36,1],[40,1],[24,1],[42,1],[42,1],[43,1],[43,1],[45,1],[46,1],[37,2],[37,3],[49,1],[49,2],[50,1],[50,1],[52,1],[51,2],[53,1],[53,1],[54,2],[55,1],[56,2],[57,1],[59,1],[60,1],[58,3],[61,1],[41,1],[63,1],[64,1],[65,1],[65,1],[65,0],[65,1],[66,1],[67,1],[68,1],[69,1],[70,1],[71,1],[72,1],[73,1],[73,3],[73,3],[74,1],[74,3],[77,1],[79,1],[79,1],[80,1],[81,1],[81,1],[82,1],[82,1],[83,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return new yy.CompilationUnit(); 
break;
case 2: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-1]; return cu; 
break;
case 3: var cu = new yy.CompilationUnit(); cu.vavaImports = $$[$0-1]; return cu; 
break;
case 4: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-1]); return cu; 
break;
case 5: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2]; cu.vavaImports = $$[$0-1]; return cu; 
break;
case 6: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
break;
case 7: var cu = new yy.CompilationUnit(); cu.vavaImports = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
break;
case 8: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-3]; cu.vavaImports = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
break;
case 9: this.$ = $$[$0-1]; 
break;
case 10: this.$ = [$$[$0]]; 
break;
case 11: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 12: this.$ = $$[$0-1]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = $$[$0]; 
break;
case 15: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0]); 
break;
case 16: this.$ = $$[$0-1]; 
break;
case 17: this.$ = [$$[$0]]; 
break;
case 18: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 19: this.$ = $$[$0] 
break;
case 20: this.$ = $$[$0]; 
break;
case 21: this.$ = $$[$0]; 
break;
case 22: this.$ = new yy.FieldDeclaration($$[$0-2], $$[$0-1]); 
break;
case 23: this.$ = new yy.MethodDeclaration($$[$0-1], $$[$0]); 
break;
case 24: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
break;
case 25: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
break;
case 26: this.$ = {vavaIdentifier: $$[$0-3], vavaFormalParameters: $$[$0-1]}; 
break;
case 27: this.$ = [$$[$0]]; 
break;
case 28: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 29: this.$ = new yy.FormalParameter($$[$0-1], $$[$0]); 
break;
case 30: this.$ = $$[$0]; 
break;
case 31: this.$ = new yy.VariableDeclarators($$[$0]); 
break;
case 32: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
break;
case 33: this.$ = new yy.VariableDeclarator($$[$0]); 
break;
case 34: this.$ = new yy.VariableDeclarator($$[$0-2], $$[$0]); 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = $$[$0]; 
break;
case 37: this.$ = $$[$0]; 
break;
case 38: this.$ = $$[$0]; 
break;
case 39: this.$ = $$[$0]; 
break;
case 40: this.$ = $$[$0]; 
break;
case 41: this.$ = $$[$0]; 
break;
case 42: this.$ = $$[$0]; 
break;
case 43: this.$ = $$[$0]; 
break;
case 44: this.$ = new yy.Block(); 
break;
case 45: this.$ = new yy.Block($$[$0-1]); 
break;
case 46: this.$ = [$$[$0]]; 
break;
case 47: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 48: this.$ = $$[$0]; 
break;
case 49: this.$ = $$[$0]; 
break;
case 50: this.$ = $$[$0]; 
break;
case 51: this.$ = $$[$0-1]; 
break;
case 52: this.$ = $$[$0]; 
break;
case 53: this.$ = $$[$0]; 
break;
case 54: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
break;
case 55: this.$ = new yy.ASTNode(); 
break;
case 56: this.$ = $$[$0-1]; 
break;
case 57: this.$ = $$[$0];
break;
case 58: this.$ = new yy.Name($$[$0]); 
break;
case 59: this.$ = $$[$0]; 
break;
case 60: this.$ = $$[$0-2]; 
break;
case 61: this.$ = $$[$0]; 
break;
case 62: this.$ = $$[$0]; 
break;
case 63: this.$ = $$[$0]; 
break;
case 64: this.$ = $$[$0]; 
break;
case 65: this.$ = $$[$0]; 
break;
case 68: this.$ = new yy.OrExpression($$[$0], $$[$02]); 
break;
case 69: this.$ = $$[$0]; 
break;
case 70: this.$ = $$[$0]; 
break;
case 71: this.$ = $$[$0]; 
break;
case 72: this.$ = $$[$0]; 
break;
case 73: this.$ = $$[$0]; 
break;
case 74: this.$ = $$[$0]; 
break;
case 75: this.$ = $$[$0]; 
break;
case 76: this.$ = $$[$0]; 
break;
case 77: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
break;
case 78: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
break;
case 81: this.$ = $$[$0]; 
break;
case 82: this.$ = $$[$0]; 
break;
case 83: this.$ = $$[$0]; 
break;
case 84: this.$ = $$[$0]; 
break;
case 85: this.$ = $$[$0]; 
break;
case 86: this.$ = $$[$0]; 
break;
case 87: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 88: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 89: this.$ = new yy.IntegerLiteral($$[$0]); 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],13:8,14:10,15:[1,11]},{1:[3]},{1:[2,1]},{4:[1,12],6:13,7:14,11:7,12:[1,9],13:8,14:10,15:[1,11]},{4:[1,15],7:16,11:17,12:[1,9],13:8,14:10,15:[1,11]},{4:[1,18]},{9:[1,19]},{4:[2,10],12:[2,10],15:[2,10]},{4:[2,13]},{9:[1,20]},{4:[2,14]},{9:[1,21]},{1:[2,2]},{4:[1,22],7:23,11:17,12:[1,9],13:8,14:10,15:[1,11]},{4:[1,24]},{1:[2,3]},{4:[1,25]},{4:[2,11],12:[2,11],15:[2,11]},{1:[2,4]},{10:[1,26]},{10:[1,27]},{16:28,17:[1,29]},{1:[2,5]},{4:[1,30]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],15:[2,9]},{4:[2,12],12:[2,12],15:[2,12]},{4:[2,15]},{18:31,20:32,21:33,22:34,23:35,24:36,26:37,29:[1,39],42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{1:[2,8]},{19:[1,46],20:47,21:33,22:34,23:35,24:36,26:37,29:[1,39],42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{19:[2,17],29:[2,17],44:[2,17],47:[2,17],48:[2,17]},{19:[2,19],29:[2,19],44:[2,19],47:[2,19],48:[2,19]},{19:[2,20],29:[2,20],44:[2,20],47:[2,20],48:[2,20]},{19:[2,21],29:[2,21],44:[2,21],47:[2,21],48:[2,21]},{9:[1,51],25:48,28:49,36:52,38:50},{17:[1,55],27:53,37:54},{9:[2,37]},{9:[1,57],28:56},{9:[2,38]},{9:[2,39]},{9:[2,40]},{9:[2,41]},{9:[2,42]},{9:[2,43]},{4:[2,16]},{19:[2,18],29:[2,18],44:[2,18],47:[2,18],48:[2,18]},{10:[1,58],35:[1,59]},{17:[2,24]},{10:[2,31],35:[2,31]},{10:[2,35],30:[1,60],35:[2,35],39:[2,35]},{10:[2,33],35:[2,33],39:[1,61]},{19:[2,23],29:[2,23],44:[2,23],47:[2,23],48:[2,23]},{19:[2,30],29:[2,30],44:[2,30],47:[2,30],48:[2,30]},{9:[1,78],10:[1,72],19:[1,62],24:69,42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45],49:63,50:64,51:65,52:66,53:68,54:67,55:70,56:71,57:73,58:74,59:76,60:77,61:75},{17:[2,25]},{30:[1,60]},{19:[2,22],29:[2,22],44:[2,22],47:[2,22],48:[2,22]},{9:[1,80],36:52,38:79},{24:84,31:81,33:82,34:[1,83],42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{9:[1,78],10:[2,67],35:[2,67],40:85,41:86,59:102,60:77,63:87,64:88,65:89,66:90,67:91,68:92,69:93,70:94,71:95,72:96,73:97,74:98,77:99,79:100,80:101,81:103,82:104,83:105,84:[1,106],85:[1,107],86:[1,108]},{19:[2,44],29:[2,44],44:[2,44],47:[2,44],48:[2,44]},{9:[1,78],10:[1,72],19:[1,109],24:69,42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45],50:110,51:65,52:66,53:68,54:67,55:70,56:71,57:73,58:74,59:76,60:77,61:75},{9:[2,46],10:[2,46],19:[2,46],44:[2,46],47:[2,46],48:[2,46]},{9:[2,48],10:[2,48],19:[2,48],44:[2,48],47:[2,48],48:[2,48]},{9:[2,49],10:[2,49],19:[2,49],44:[2,49],47:[2,49],48:[2,49]},{10:[1,111]},{9:[2,50],10:[2,50],19:[2,50],44:[2,50],47:[2,50],48:[2,50]},{9:[1,80],25:112,36:52,38:50},{9:[2,52],10:[2,52],19:[2,52],44:[2,52],47:[2,52],48:[2,52]},{9:[2,53],10:[2,53],19:[2,53],44:[2,53],47:[2,53],48:[2,53]},{9:[2,55],10:[2,55],19:[2,55],44:[2,55],47:[2,55],48:[2,55]},{10:[1,113]},{10:[2,57]},{62:[1,114]},{62:[2,61]},{10:[2,58],35:[2,58],62:[2,58],75:[2,58],76:[2,58],78:[2,58]},{10:[2,59],35:[2,59],62:[2,59],75:[2,59],76:[2,59],78:[2,59]},{10:[2,32],35:[2,32]},{10:[2,35],32:[2,35],35:[2,35],39:[2,35]},{32:[1,115]},{32:[2,27]},{35:[1,116]},{9:[1,80],36:117},{10:[2,34],35:[2,34]},{10:[2,36],35:[2,36]},{10:[2,62],35:[2,62]},{10:[2,63],35:[2,63]},{10:[2,64],35:[2,64]},{10:[2,65],35:[2,65]},{10:[2,69],35:[2,69]},{10:[2,70],35:[2,70]},{10:[2,71],35:[2,71]},{10:[2,72],35:[2,72]},{10:[2,73],35:[2,73]},{10:[2,74],35:[2,74]},{10:[2,75],35:[2,75],75:[1,118],76:[1,119]},{10:[2,76],35:[2,76],75:[2,76],76:[2,76],78:[1,120]},{10:[2,79],35:[2,79],75:[2,79],76:[2,79],78:[2,79]},{10:[2,81],35:[2,81],75:[2,81],76:[2,81],78:[2,81]},{10:[2,82],35:[2,82],75:[2,82],76:[2,82],78:[2,82]},{10:[2,83],35:[2,83],75:[2,83],76:[2,83],78:[2,83]},{10:[2,84],35:[2,84],75:[2,84],76:[2,84],78:[2,84]},{10:[2,85],35:[2,85],75:[2,85],76:[2,85],78:[2,85]},{10:[2,86],35:[2,86],75:[2,86],76:[2,86],78:[2,86]},{10:[2,87],35:[2,87],75:[2,87],76:[2,87],78:[2,87]},{10:[2,88],35:[2,88],75:[2,88],76:[2,88],78:[2,88]},{10:[2,89],35:[2,89],75:[2,89],76:[2,89],78:[2,89]},{19:[2,45],29:[2,45],44:[2,45],47:[2,45],48:[2,45]},{9:[2,47],10:[2,47],19:[2,47],44:[2,47],47:[2,47],48:[2,47]},{9:[2,51],10:[2,51],19:[2,51],44:[2,51],47:[2,51],48:[2,51]},{10:[2,54],35:[1,59]},{9:[2,56],10:[2,56],19:[2,56],44:[2,56],47:[2,56],48:[2,56]},{9:[1,78],10:[2,67],59:102,60:77,63:121,64:88,65:89,66:90,67:91,68:92,69:93,70:94,71:95,72:96,73:97,74:98,77:99,79:100,80:101,81:103,82:104,83:105,84:[1,106],85:[1,107],86:[1,108]},{17:[2,26]},{24:84,33:122,42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{32:[2,29]},{9:[1,78],59:102,60:77,74:123,77:99,79:100,80:101,81:103,82:104,83:105,84:[1,106],85:[1,107],86:[1,108]},{9:[1,78],59:102,60:77,74:124,77:99,79:100,80:101,81:103,82:104,83:105,84:[1,106],85:[1,107],86:[1,108]},{9:[1,78],59:102,60:77,77:125,79:100,80:101,81:103,82:104,83:105,84:[1,106],85:[1,107],86:[1,108]},{10:[2,60]},{32:[2,28]},{10:[2,77],35:[2,77],75:[2,77],76:[2,77],78:[1,120]},{10:[2,78],35:[2,78],75:[2,78],76:[2,78],78:[1,120]},{10:[2,80],35:[2,80],75:[2,80],76:[2,80],78:[2,80]}],
defaultActions: {2:[2,1],8:[2,13],10:[2,14],12:[2,2],15:[2,3],18:[2,4],22:[2,5],24:[2,6],25:[2,7],28:[2,15],30:[2,8],38:[2,37],40:[2,38],41:[2,39],42:[2,40],43:[2,41],44:[2,42],45:[2,43],46:[2,16],49:[2,24],56:[2,25],74:[2,57],76:[2,61],82:[2,27],115:[2,26],117:[2,29],121:[2,60],122:[2,28]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
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

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
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
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
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

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column,
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
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
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
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
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match.length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 17; /* Basic Syntax */
break;
case 2:return 19;
break;
case 3:return 30;
break;
case 4:return 32;
break;
case 5:return 35;
break;
case 6:return 10;
break;
case 7:return 'MODIFIER_PUBLIC'; /* Modifier */
break;
case 8:return 'MODIFIER_PRIVATE';
break;
case 9:return 'MODIFIER_PROTECTED';
break;
case 10:return 'MODIFIER_STATIC';
break;
case 11:return 'MODIFIER_VOID';
break;
case 12:return 'MODIFIER_FINAL';
break;
case 13:return 8; /* Keywords */
break;
case 14:return 12;
break;
case 15:return 84;
break;
case 16:return 85;
break;
case 17:return 15;
break;
case 18:return 29;
break;
case 19:return 44; /* Primitive Types */
break;
case 20:return 47;
break;
case 21:return 48;
break;
case 22:return 39; /* Operators */
break;
case 23:return 75;
break;
case 24:return 76;
break;
case 25:return 78;
break;
case 26:return 'OPERATOR_DIVISON';
break;
case 27:return 'OPERATOR_MODULO';
break;
case 28:return 9; /* Varying form */
break;
case 29:return 86;
break;
case 30:return 'FLOAT_EXPRESSION';
break;
case 31:return 4;
break;
case 32:return 'INVALID';
break;
}
};
lexer.rules = [/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^true\b/,/^false\b/,/^class\b/,/^void\b/,/^boolean\b/,/^int\b/,/^float\b/,/^=/,/^\+/,/^-/,/^\*/,/^\//,/^%/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^[0-9]+/,/^[0-9]+.[0-9]*/,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
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
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}