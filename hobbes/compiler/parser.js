/* Jison generated parser */
var vava_proper = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"name":13,"type_declaration":14,"class_declaration":15,"KEYWORD_CLASS":16,"class_body":17,"MODIFIER_PUBLIC":18,"EMBRACE":19,"class_body_declarations":20,"UNBRACE":21,"class_body_declaration":22,"class_member_declaration":23,"field_declaration":24,"method_declaration":25,"type":26,"variable_declarators":27,"method_header":28,"method_body":29,"method_declarator":30,"MODIFIER_STATIC":31,"MODIFIER_VOID":32,"LEFT_PAREN":33,"formal_parameter_list":34,"RIGHT_PAREN":35,"formal_parameter":36,"formal_parameters":37,"COMMA":38,"variable_declarator_id":39,"block":40,"variable_declarator":41,"OPERATOR_ASSIGNMENT":42,"variable_initializer":43,"expression":44,"primitive_type":45,"numeric_type":46,"PRIMITIVE_BOOLEAN":47,"integral_type":48,"floating_point_type":49,"PRIMITIVE_INTEGER":50,"PRIMITIVE_FLOAT":51,"block_statements":52,"block_statement":53,"local_variable_declaration_statement":54,"statement":55,"local_variable_declaration":56,"statement_without_trailing_substatement":57,"if_then_else_statement":58,"if_then_statement":59,"while_statement":60,"empty_statement":61,"expression_statement":62,"KEYWORD_IF":63,"statement_no_short_if":64,"KEYWORD_ELSE":65,"labeled_statement_no_short_if":66,"if_then_else_statement_no_short_if":67,"while_statement_no_short_if":68,"for_statement_no_short_if":69,"KEYWORD_WHILE":70,"statement_expression":71,"assignment":72,"method_invocation":73,"simple_name":74,"qualified_name":75,"SEPARATOR_DOT":76,"left_hand_side":77,"conditional_expression":78,"assignment_expression":79,"conditional_or_expression":80,"conditional_and_expression":81,"inclusive_or_expression":82,"exclusive_or_expression":83,"and_expression":84,"equality_expression":85,"relational_expression":86,"OPERATOR_EQUAL":87,"OPERATOR_NOT_EQUAL":88,"shift_expression":89,"additive_expression":90,"multiplicative_expression":91,"OPERATOR_ADDITION":92,"OPERATOR_SUBTRACTION":93,"unary_expression":94,"OPERATOR_MULTIPLICATION":95,"OPERATOR_DIVISON":96,"OPERATOR_MODULO":97,"postfix_expression":98,"primary":99,"literal":100,"boolean_literal":101,"integer_literal":102,"string_literal":103,"argument_list":104,"TRUE_LITERAL":105,"FALSE_LITERAL":106,"DECIMAL_INTEGER_LITERAL":107,"STRING_LITERAL":108,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",16:"KEYWORD_CLASS",18:"MODIFIER_PUBLIC",19:"EMBRACE",21:"UNBRACE",31:"MODIFIER_STATIC",32:"MODIFIER_VOID",33:"LEFT_PAREN",35:"RIGHT_PAREN",37:"formal_parameters",38:"COMMA",42:"OPERATOR_ASSIGNMENT",47:"PRIMITIVE_BOOLEAN",50:"PRIMITIVE_INTEGER",51:"PRIMITIVE_FLOAT",63:"KEYWORD_IF",65:"KEYWORD_ELSE",66:"labeled_statement_no_short_if",67:"if_then_else_statement_no_short_if",68:"while_statement_no_short_if",69:"for_statement_no_short_if",70:"KEYWORD_WHILE",76:"SEPARATOR_DOT",87:"OPERATOR_EQUAL",88:"OPERATOR_NOT_EQUAL",92:"OPERATOR_ADDITION",93:"OPERATOR_SUBTRACTION",95:"OPERATOR_MULTIPLICATION",96:"OPERATOR_DIVISON",97:"OPERATOR_MODULO",105:"TRUE_LITERAL",106:"FALSE_LITERAL",107:"DECIMAL_INTEGER_LITERAL",108:"STRING_LITERAL"},
productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[14,1],[15,3],[15,4],[17,3],[20,1],[20,2],[22,1],[23,1],[23,1],[24,3],[25,2],[28,2],[28,4],[30,4],[34,1],[34,3],[36,2],[29,1],[27,1],[27,3],[41,1],[41,3],[39,1],[43,1],[26,1],[45,1],[45,1],[46,1],[46,1],[48,1],[49,1],[40,2],[40,3],[52,1],[52,2],[53,1],[53,1],[54,2],[56,2],[55,1],[55,1],[55,1],[55,1],[57,1],[57,1],[57,1],[59,5],[58,7],[64,1],[64,1],[64,1],[64,1],[64,1],[60,5],[61,1],[62,2],[71,1],[71,1],[13,1],[13,1],[74,1],[75,3],[72,3],[77,1],[44,1],[79,1],[79,1],[78,1],[80,1],[80,1],[80,0],[80,1],[81,1],[82,1],[83,1],[84,1],[85,1],[85,3],[85,3],[86,1],[89,1],[90,1],[90,3],[90,3],[91,1],[91,3],[91,3],[91,3],[94,1],[98,1],[98,1],[99,1],[99,1],[100,1],[100,1],[100,1],[73,3],[73,4],[104,1],[104,3],[101,1],[101,1],[102,1],[103,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return new yy.CompilationUnit(); 
break;
case 2: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-1]; return cu; 
break;
case 3: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-1]); return cu; 
break;
case 4: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-1]); return cu; 
break;
case 5: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
break;
case 6: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
break;
case 7: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-2]); cu.appendChild($$[$0-1]); return cu; 
break;
case 8: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-3]; cu.appendChild($$[$0-2]); cu.appendChild($$[$0-1]); return cu; 
break;
case 9: this.$ = $$[$0-1]; 
break;
case 10: this.$ = new yy.ImportDeclarations($$[$0]); 
break;
case 11: $$[$0-1].appendChild($$[$0]); this.$ = $$[$0-1]; 
break;
case 12: this.$ = new yy.ImportDeclaration($$[$0-1]); 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = $$[$0]; 
break;
case 15: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0]); 
break;
case 16: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0]); 
break;
case 17: this.$ = $$[$0-1]; 
break;
case 18: this.$ = [$$[$0]]; 
break;
case 19: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 20: this.$ = $$[$0] 
break;
case 21: this.$ = $$[$0]; 
break;
case 22: this.$ = $$[$0]; 
break;
case 23: this.$ = new yy.FieldDeclaration($$[$0-2], $$[$0-1]); 
break;
case 24: this.$ = new yy.MethodDeclaration($$[$0-1], $$[$0]); 
break;
case 25: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
break;
case 26: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
break;
case 27: this.$ = {vavaIdentifier: $$[$0-3], vavaFormalParameters: $$[$0-1]}; 
break;
case 28: this.$ = [$$[$0]]; 
break;
case 29: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 30: this.$ = new yy.FormalParameter($$[$0-1], $$[$0]); 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = new yy.VariableDeclarators($$[$0]); 
break;
case 33: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
break;
case 34: this.$ = new yy.VariableDeclarator($$[$0]); 
break;
case 35: this.$ = new yy.VariableDeclarator($$[$0-2], $$[$0]); 
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
case 44: this.$ = $$[$0]; 
break;
case 45: this.$ = new yy.Block(); 
break;
case 46: this.$ = new yy.Block($$[$0-1]); 
break;
case 47: this.$ = [$$[$0]]; 
break;
case 48: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 49: this.$ = $$[$0]; 
break;
case 50: this.$ = $$[$0]; 
break;
case 51: this.$ = $$[$0-1]; 
break;
case 52: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
break;
case 53: this.$ = $$[$0]; 
break;
case 54: this.$ = $$[$0]; 
break;
case 55: this.$ = $$[$0]; 
break;
case 56: this.$ = $$[$0]; 
break;
case 57: this.$ = $$[$0]; 
break;
case 58: this.$ = $$[$0]; 
break;
case 59: this.$ = $$[$0]; 
break;
case 60: this.$ = new yy.IfThen($$[$0-2], $$[$0]); 
break;
case 61: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0]); 
break;
case 62: this.$ = $$[$0]; 
break;
case 63: this.$ = $$[$0]; 
break;
case 64: this.$ = $$[$0]; 
break;
case 65: this.$ = $$[$0]; 
break;
case 66: this.$ = $$[$0]; 
break;
case 67: this.$ = new yy.WhileLoop($$[$0-2], $$[$0]); 
break;
case 68: this.$ = new yy.ASTNode(); 
break;
case 69: this.$ = new yy.ExpressionStatement($$[$0-1]); 
break;
case 70: this.$ = $$[$0]; 
break;
case 71: this.$ = $$[$0]; 
break;
case 72: this.$ = $$[$0]; 
break;
case 73: this.$ = $$[$0]; 
break;
case 74: this.$ = new yy.Name($$[$0]); 
break;
case 75: this.$ = new yy.Name($$[$0-2].qualified() + '.' + $$[$0]); 
break;
case 76: this.$ = new yy.Assignment($$[$0-2], $$[$0]); 
break;
case 77: this.$ = $$[$0]; 
break;
case 78: this.$ = $$[$0]; 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = $$[$0]; 
break;
case 81: this.$ = $$[$0]; 
break;
case 82: this.$ = $$[$0]; 
break;
case 85: this.$ = new yy.OrOrExpression($$[$0], $$[$02]); 
break;
case 86: this.$ = $$[$0]; 
break;
case 87: this.$ = $$[$0]; 
break;
case 88: this.$ = $$[$0]; 
break;
case 89: this.$ = $$[$0]; 
break;
case 90: this.$ = $$[$0]; 
break;
case 91: this.$ = new yy.Equals($$[$0-2], $$[$0]); 
break;
case 92: this.$ = new yy.NotEquals($$[$0-2], $$[$0]); 
break;
case 93: this.$ = $$[$0]; 
break;
case 94: this.$ = $$[$0]; 
break;
case 95: this.$ = $$[$0]; 
break;
case 96: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
break;
case 97: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
break;
case 98: this.$ = $$[$0]; 
break;
case 99: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
break;
case 100: this.$ = new yy.Division($$[$0-2], $$[$0]); 
break;
case 101: this.$ = new yy.Modulo($$[$0-2], $$[$0]); 
break;
case 102: this.$ = $$[$0]; 
break;
case 103: this.$ = $$[$0]; 
break;
case 104: this.$ = $$[$0]; 
break;
case 105: this.$ = $$[$0]; 
break;
case 106: this.$ = $$[$0]; 
break;
case 107: this.$ = $$[$0]; 
break;
case 108: this.$ = $$[$0]; 
break;
case 109: this.$ = $$[$0]; 
break;
case 110: this.$ = new yy.MethodInvocation($$[$0-2]); 
break;
case 111: this.$ = new yy.MethodInvocation($$[$0-3], $$[$0-1]); 
break;
case 112: this.$ = new yy.ArgumentList($$[$0]); 
break;
case 113: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
break;
case 114: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 115: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 116: this.$ = new yy.IntegerLiteral($$[$0]); 
break;
case 117: this.$ = new yy.StringLiteral($$[$0]); 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{1:[3]},{1:[2,1]},{4:[1,13],6:14,7:15,11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,16],7:17,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,19]},{9:[1,20]},{4:[2,10],12:[2,10],16:[2,10],18:[2,10]},{4:[2,13]},{9:[1,24],13:21,74:22,75:23},{4:[2,14]},{9:[1,25]},{16:[1,26]},{1:[2,2]},{4:[1,27],7:28,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,29]},{1:[2,3]},{4:[1,30]},{4:[2,11],12:[2,11],16:[2,11],18:[2,11]},{1:[2,4]},{10:[1,31]},{10:[1,32],76:[1,33]},{10:[2,72],33:[2,72],35:[2,72],38:[2,72],42:[2,72],76:[2,72],87:[2,72],88:[2,72],92:[2,72],93:[2,72],95:[2,72],96:[2,72],97:[2,72]},{10:[2,73],33:[2,73],35:[2,73],38:[2,73],42:[2,73],76:[2,73],87:[2,73],88:[2,73],92:[2,73],93:[2,73],95:[2,73],96:[2,73],97:[2,73]},{10:[2,74],33:[2,74],35:[2,74],38:[2,74],42:[2,74],76:[2,74],87:[2,74],88:[2,74],92:[2,74],93:[2,74],95:[2,74],96:[2,74],97:[2,74]},{17:34,19:[1,35]},{9:[1,36]},{1:[2,5]},{4:[1,37]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],16:[2,9],18:[2,9]},{4:[2,12],12:[2,12],16:[2,12],18:[2,12]},{9:[1,38]},{4:[2,15]},{18:[1,47],20:39,22:40,23:41,24:42,25:43,26:44,28:45,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{17:54,19:[1,35]},{1:[2,8]},{10:[2,75],33:[2,75],35:[2,75],38:[2,75],42:[2,75],76:[2,75],87:[2,75],88:[2,75],92:[2,75],93:[2,75],95:[2,75],96:[2,75],97:[2,75]},{18:[1,47],21:[1,55],22:56,23:41,24:42,25:43,26:44,28:45,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{18:[2,18],21:[2,18],47:[2,18],50:[2,18],51:[2,18]},{18:[2,20],21:[2,20],47:[2,20],50:[2,20],51:[2,20]},{18:[2,21],21:[2,21],47:[2,21],50:[2,21],51:[2,21]},{18:[2,22],21:[2,22],47:[2,22],50:[2,22],51:[2,22]},{9:[1,60],27:57,30:58,39:61,41:59},{19:[1,64],29:62,40:63},{9:[2,38]},{31:[1,65]},{9:[2,39]},{9:[2,40]},{9:[2,41]},{9:[2,42]},{9:[2,43]},{9:[2,44]},{4:[2,16]},{4:[2,17]},{18:[2,19],21:[2,19],47:[2,19],50:[2,19],51:[2,19]},{10:[1,66],38:[1,67]},{19:[2,25]},{10:[2,32],38:[2,32]},{10:[2,36],33:[1,68],38:[2,36],42:[2,36]},{10:[2,34],38:[2,34],42:[1,69]},{18:[2,24],21:[2,24],47:[2,24],50:[2,24],51:[2,24]},{18:[2,31],21:[2,31],47:[2,31],50:[2,31],51:[2,31]},{9:[1,24],10:[1,86],13:91,19:[1,64],21:[1,70],26:80,40:81,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53],52:71,53:72,54:73,55:74,56:75,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{32:[1,92]},{18:[2,23],21:[2,23],47:[2,23],50:[2,23],51:[2,23]},{9:[1,94],39:61,41:93},{26:98,34:95,36:96,37:[1,97],45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{9:[1,24],10:[2,84],13:115,38:[2,84],43:99,44:100,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[2,45],10:[2,45],18:[2,45],19:[2,45],21:[2,45],47:[2,45],50:[2,45],51:[2,45],63:[2,45],65:[2,45],70:[2,45]},{9:[1,24],10:[1,86],13:91,19:[1,64],21:[1,125],26:80,40:81,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53],53:126,54:73,55:74,56:75,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{9:[2,47],10:[2,47],19:[2,47],21:[2,47],47:[2,47],50:[2,47],51:[2,47],63:[2,47],70:[2,47]},{9:[2,49],10:[2,49],19:[2,49],21:[2,49],47:[2,49],50:[2,49],51:[2,49],63:[2,49],70:[2,49]},{9:[2,50],10:[2,50],19:[2,50],21:[2,50],47:[2,50],50:[2,50],51:[2,50],63:[2,50],70:[2,50]},{10:[1,127]},{9:[2,53],10:[2,53],19:[2,53],21:[2,53],47:[2,53],50:[2,53],51:[2,53],63:[2,53],70:[2,53]},{9:[2,54],10:[2,54],19:[2,54],21:[2,54],47:[2,54],50:[2,54],51:[2,54],63:[2,54],70:[2,54]},{9:[2,55],10:[2,55],19:[2,55],21:[2,55],47:[2,55],50:[2,55],51:[2,55],63:[2,55],70:[2,55]},{9:[2,56],10:[2,56],19:[2,56],21:[2,56],47:[2,56],50:[2,56],51:[2,56],63:[2,56],70:[2,56]},{9:[1,94],27:128,39:61,41:59},{9:[2,57],10:[2,57],19:[2,57],21:[2,57],47:[2,57],50:[2,57],51:[2,57],63:[2,57],65:[2,57],70:[2,57]},{9:[2,58],10:[2,58],19:[2,58],21:[2,58],47:[2,58],50:[2,58],51:[2,58],63:[2,58],65:[2,58],70:[2,58]},{9:[2,59],10:[2,59],19:[2,59],21:[2,59],47:[2,59],50:[2,59],51:[2,59],63:[2,59],65:[2,59],70:[2,59]},{33:[1,129]},{33:[1,130]},{9:[2,68],10:[2,68],19:[2,68],21:[2,68],47:[2,68],50:[2,68],51:[2,68],63:[2,68],65:[2,68],70:[2,68]},{10:[1,131]},{10:[2,70]},{10:[2,71]},{42:[1,132]},{33:[1,133],42:[2,77],76:[1,33]},{9:[1,135],30:134},{10:[2,33],38:[2,33]},{10:[2,36],35:[2,36],38:[2,36],42:[2,36]},{35:[1,136]},{35:[2,28]},{38:[1,137]},{9:[1,94],39:138},{10:[2,35],38:[2,35]},{10:[2,37],38:[2,37]},{10:[2,78],35:[2,78],38:[2,78]},{10:[2,81],35:[2,81],38:[2,81]},{10:[2,82],35:[2,82],38:[2,82]},{10:[2,86],35:[2,86],38:[2,86]},{10:[2,87],35:[2,87],38:[2,87]},{10:[2,88],35:[2,88],38:[2,88]},{10:[2,89],35:[2,89],38:[2,89],87:[1,139],88:[1,140]},{10:[2,90],35:[2,90],38:[2,90],87:[2,90],88:[2,90]},{10:[2,93],35:[2,93],38:[2,93],87:[2,93],88:[2,93]},{10:[2,94],35:[2,94],38:[2,94],87:[2,94],88:[2,94],92:[1,141],93:[1,142]},{10:[2,95],35:[2,95],38:[2,95],87:[2,95],88:[2,95],92:[2,95],93:[2,95],95:[1,143],96:[1,144],97:[1,145]},{10:[2,98],35:[2,98],38:[2,98],87:[2,98],88:[2,98],92:[2,98],93:[2,98],95:[2,98],96:[2,98],97:[2,98]},{10:[2,102],35:[2,102],38:[2,102],87:[2,102],88:[2,102],92:[2,102],93:[2,102],95:[2,102],96:[2,102],97:[2,102]},{10:[2,103],35:[2,103],38:[2,103],87:[2,103],88:[2,103],92:[2,103],93:[2,103],95:[2,103],96:[2,103],97:[2,103]},{10:[2,104],33:[1,133],35:[2,104],38:[2,104],76:[1,33],87:[2,104],88:[2,104],92:[2,104],93:[2,104],95:[2,104],96:[2,104],97:[2,104]},{10:[2,105],35:[2,105],38:[2,105],87:[2,105],88:[2,105],92:[2,105],93:[2,105],95:[2,105],96:[2,105],97:[2,105]},{10:[2,106],35:[2,106],38:[2,106],87:[2,106],88:[2,106],92:[2,106],93:[2,106],95:[2,106],96:[2,106],97:[2,106]},{10:[2,107],35:[2,107],38:[2,107],87:[2,107],88:[2,107],92:[2,107],93:[2,107],95:[2,107],96:[2,107],97:[2,107]},{10:[2,108],35:[2,108],38:[2,108],87:[2,108],88:[2,108],92:[2,108],93:[2,108],95:[2,108],96:[2,108],97:[2,108]},{10:[2,109],35:[2,109],38:[2,109],87:[2,109],88:[2,109],92:[2,109],93:[2,109],95:[2,109],96:[2,109],97:[2,109]},{10:[2,114],35:[2,114],38:[2,114],87:[2,114],88:[2,114],92:[2,114],93:[2,114],95:[2,114],96:[2,114],97:[2,114]},{10:[2,115],35:[2,115],38:[2,115],87:[2,115],88:[2,115],92:[2,115],93:[2,115],95:[2,115],96:[2,115],97:[2,115]},{10:[2,116],35:[2,116],38:[2,116],87:[2,116],88:[2,116],92:[2,116],93:[2,116],95:[2,116],96:[2,116],97:[2,116]},{10:[2,117],35:[2,117],38:[2,117],87:[2,117],88:[2,117],92:[2,117],93:[2,117],95:[2,117],96:[2,117],97:[2,117]},{9:[2,46],10:[2,46],18:[2,46],19:[2,46],21:[2,46],47:[2,46],50:[2,46],51:[2,46],63:[2,46],65:[2,46],70:[2,46]},{9:[2,48],10:[2,48],19:[2,48],21:[2,48],47:[2,48],50:[2,48],51:[2,48],63:[2,48],70:[2,48]},{9:[2,51],10:[2,51],19:[2,51],21:[2,51],47:[2,51],50:[2,51],51:[2,51],63:[2,51],70:[2,51]},{10:[2,52],38:[1,67]},{9:[1,24],13:115,35:[2,84],44:146,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,35:[2,84],44:147,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[2,69],10:[2,69],19:[2,69],21:[2,69],47:[2,69],50:[2,69],51:[2,69],63:[2,69],65:[2,69],70:[2,69]},{9:[1,24],10:[2,84],13:115,73:117,74:22,75:23,78:148,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,35:[1,149],38:[2,84],44:151,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,104:150,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{19:[2,26]},{33:[1,68]},{19:[2,27]},{26:98,36:152,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{35:[2,30]},{9:[1,24],13:115,73:117,74:22,75:23,86:153,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,86:154,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,91:155,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,91:156,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,94:157,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,94:158,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,94:159,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{35:[1,160]},{35:[1,161]},{10:[2,76]},{10:[2,110],35:[2,110],38:[2,110],87:[2,110],88:[2,110],92:[2,110],93:[2,110],95:[2,110],96:[2,110],97:[2,110]},{35:[1,162],38:[1,163]},{35:[2,112],38:[2,112]},{35:[2,29]},{10:[2,91],35:[2,91],38:[2,91],87:[2,91],88:[2,91]},{10:[2,92],35:[2,92],38:[2,92],87:[2,92],88:[2,92]},{10:[2,96],35:[2,96],38:[2,96],87:[2,96],88:[2,96],92:[2,96],93:[2,96],95:[1,143],96:[1,144],97:[1,145]},{10:[2,97],35:[2,97],38:[2,97],87:[2,97],88:[2,97],92:[2,97],93:[2,97],95:[1,143],96:[1,144],97:[1,145]},{10:[2,99],35:[2,99],38:[2,99],87:[2,99],88:[2,99],92:[2,99],93:[2,99],95:[2,99],96:[2,99],97:[2,99]},{10:[2,100],35:[2,100],38:[2,100],87:[2,100],88:[2,100],92:[2,100],93:[2,100],95:[2,100],96:[2,100],97:[2,100]},{10:[2,101],35:[2,101],38:[2,101],87:[2,101],88:[2,101],92:[2,101],93:[2,101],95:[2,101],96:[2,101],97:[2,101]},{9:[1,24],10:[1,86],13:91,19:[1,64],40:81,55:165,57:166,58:77,59:78,60:79,61:82,62:83,63:[1,84],64:164,66:[1,167],67:[1,168],68:[1,169],69:[1,170],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{9:[1,24],10:[1,86],13:91,19:[1,64],40:81,55:171,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{10:[2,111],35:[2,111],38:[2,111],87:[2,111],88:[2,111],92:[2,111],93:[2,111],95:[2,111],96:[2,111],97:[2,111]},{9:[1,24],13:115,35:[2,84],38:[2,84],44:172,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{65:[1,173]},{9:[2,60],10:[2,60],19:[2,60],21:[2,60],47:[2,60],50:[2,60],51:[2,60],63:[2,60],70:[2,60]},{9:[2,62],10:[2,62],19:[2,62],21:[2,62],47:[2,62],50:[2,62],51:[2,62],63:[2,62],65:[2,62],70:[2,62]},{65:[2,63]},{65:[2,64]},{65:[2,65]},{65:[2,66]},{9:[2,67],10:[2,67],19:[2,67],21:[2,67],47:[2,67],50:[2,67],51:[2,67],63:[2,67],70:[2,67]},{35:[2,113],38:[2,113]},{9:[1,24],10:[1,86],13:91,19:[1,64],40:81,55:174,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{9:[2,61],10:[2,61],19:[2,61],21:[2,61],47:[2,61],50:[2,61],51:[2,61],63:[2,61],70:[2,61]}],
defaultActions: {2:[2,1],8:[2,13],10:[2,14],13:[2,2],16:[2,3],19:[2,4],27:[2,5],29:[2,6],30:[2,7],34:[2,15],37:[2,8],46:[2,38],48:[2,39],49:[2,40],50:[2,41],51:[2,42],52:[2,43],53:[2,44],54:[2,16],55:[2,17],58:[2,25],88:[2,70],89:[2,71],96:[2,28],134:[2,26],136:[2,27],138:[2,30],148:[2,76],152:[2,29],167:[2,63],168:[2,64],169:[2,65],170:[2,66]},
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
case 1:return 19; /* Basic Syntax */
break;
case 2:return 21;
break;
case 3:return 33;
break;
case 4:return 35;
break;
case 5:return 38;
break;
case 6:return 10;
break;
case 7:return 18; /* Modifier */
break;
case 8:return 'MODIFIER_PRIVATE';
break;
case 9:return 'MODIFIER_PROTECTED';
break;
case 10:return 31;
break;
case 11:return 32;
break;
case 12:return 'MODIFIER_FINAL';
break;
case 13:return 8; /* Keywords */
break;
case 14:return 12;
break;
case 15:return 63;
break;
case 16:return 65;
break;
case 17:return 70;
break;
case 18:return 105;
break;
case 19:return 106;
break;
case 20:return 16;
break;
case 21:return 47;
break;
case 22:return 50;
break;
case 23:return 51;
break;
case 24:return 87;
break;
case 25:return 88;
break;
case 26:return 42;
break;
case 27:return 92;
break;
case 28:return 93;
break;
case 29:return 95;
break;
case 30:return 96;
break;
case 31:return 97;
break;
case 32:return 76;
break;
case 33:return 9; /* Varying form */
break;
case 34:return 107;
break;
case 35:return 'FLOAT_EXPRESSION';
break;
case 36:return 108;
break;
case 37:/*skip comments*/
break;
case 38:return 4;
break;
case 39:return 'INVALID';
break;
}
};
lexer.rules = [/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^if\b/,/^else\b/,/^while\b/,/^true\b/,/^false\b/,/^class\b/,/^boolean\b/,/^int\b/,/^float\b/,/^==/,/^!=/,/^=/,/^\+/,/^-/,/^\*/,/^\//,/^%/,/^\./,/^[a-zA-Z][a-zA-Z0-9_]*/,/^[0-9]+/,/^[0-9]+.[0-9]*/,/^".*"/,/^\/\/./,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"inclusive":true}};return lexer;})()
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