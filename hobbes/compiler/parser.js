/* Jison generated parser */
var vava_proper = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"name":13,"type_declaration":14,"class_declaration":15,"KEYWORD_CLASS":16,"class_body":17,"MODIFIER_PUBLIC":18,"EMBRACE":19,"class_body_declarations":20,"UNBRACE":21,"class_body_declaration":22,"class_member_declaration":23,"field_declaration":24,"method_declaration":25,"type":26,"variable_declarators":27,"method_header":28,"method_body":29,"method_declarator":30,"MODIFIER_STATIC":31,"MODIFIER_VOID":32,"LEFT_PAREN":33,"formal_parameter_list":34,"RIGHT_PAREN":35,"STRING_TYPE":36,"LEFT_BRACKET":37,"RIGHT_BRACKET":38,"formal_parameter":39,"formal_parameters":40,"COMMA":41,"variable_declarator_id":42,"block":43,"variable_declarator":44,"OPERATOR_ASSIGNMENT":45,"variable_initializer":46,"expression":47,"primitive_type":48,"numeric_type":49,"PRIMITIVE_BOOLEAN":50,"integral_type":51,"floating_point_type":52,"PRIMITIVE_INTEGER":53,"PRIMITIVE_FLOAT":54,"PRIMITIVE_DOUBLE":55,"block_statements":56,"block_statement":57,"local_variable_declaration_statement":58,"statement":59,"local_variable_declaration":60,"statement_without_trailing_substatement":61,"if_then_else_statement":62,"if_then_statement":63,"while_statement":64,"empty_statement":65,"expression_statement":66,"KEYWORD_IF":67,"statement_no_short_if":68,"KEYWORD_ELSE":69,"labeled_statement_no_short_if":70,"if_then_else_statement_no_short_if":71,"while_statement_no_short_if":72,"for_statement_no_short_if":73,"KEYWORD_WHILE":74,"statement_expression":75,"assignment":76,"method_invocation":77,"simple_name":78,"qualified_name":79,"SEPARATOR_DOT":80,"left_hand_side":81,"conditional_expression":82,"assignment_expression":83,"conditional_or_expression":84,"conditional_and_expression":85,"inclusive_or_expression":86,"exclusive_or_expression":87,"and_expression":88,"equality_expression":89,"relational_expression":90,"OPERATOR_EQUAL":91,"OPERATOR_NOT_EQUAL":92,"shift_expression":93,"additive_expression":94,"multiplicative_expression":95,"OPERATOR_ADDITION":96,"OPERATOR_SUBTRACTION":97,"unary_expression":98,"OPERATOR_MULTIPLICATION":99,"OPERATOR_DIVISON":100,"OPERATOR_MODULO":101,"unary_expression_not_plus_minus":102,"postfix_expression":103,"primary":104,"literal":105,"integer_literal":106,"floating_point_literal":107,"boolean_literal":108,"string_literal":109,"argument_list":110,"TRUE_LITERAL":111,"FALSE_LITERAL":112,"DECIMAL_INTEGER_LITERAL":113,"FLOATING_POINT_LITERAL":114,"STRING_LITERAL":115,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",16:"KEYWORD_CLASS",18:"MODIFIER_PUBLIC",19:"EMBRACE",21:"UNBRACE",31:"MODIFIER_STATIC",32:"MODIFIER_VOID",33:"LEFT_PAREN",35:"RIGHT_PAREN",36:"STRING_TYPE",37:"LEFT_BRACKET",38:"RIGHT_BRACKET",40:"formal_parameters",41:"COMMA",45:"OPERATOR_ASSIGNMENT",50:"PRIMITIVE_BOOLEAN",53:"PRIMITIVE_INTEGER",54:"PRIMITIVE_FLOAT",55:"PRIMITIVE_DOUBLE",67:"KEYWORD_IF",69:"KEYWORD_ELSE",70:"labeled_statement_no_short_if",71:"if_then_else_statement_no_short_if",72:"while_statement_no_short_if",73:"for_statement_no_short_if",74:"KEYWORD_WHILE",80:"SEPARATOR_DOT",91:"OPERATOR_EQUAL",92:"OPERATOR_NOT_EQUAL",96:"OPERATOR_ADDITION",97:"OPERATOR_SUBTRACTION",99:"OPERATOR_MULTIPLICATION",100:"OPERATOR_DIVISON",101:"OPERATOR_MODULO",111:"TRUE_LITERAL",112:"FALSE_LITERAL",113:"DECIMAL_INTEGER_LITERAL",114:"FLOATING_POINT_LITERAL",115:"STRING_LITERAL"},
productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[14,1],[15,3],[15,4],[17,3],[20,1],[20,2],[22,1],[23,1],[23,1],[24,3],[25,2],[28,2],[28,4],[30,4],[30,7],[34,1],[34,3],[39,2],[29,1],[27,1],[27,3],[44,1],[44,3],[42,1],[46,1],[26,1],[48,1],[48,1],[49,1],[49,1],[51,1],[52,1],[52,1],[43,2],[43,3],[56,1],[56,2],[57,1],[57,1],[58,2],[60,2],[59,1],[59,1],[59,1],[59,1],[61,1],[61,1],[61,1],[63,5],[62,7],[68,1],[68,1],[68,1],[68,1],[68,1],[64,5],[65,1],[66,2],[75,1],[75,1],[13,1],[13,1],[78,1],[79,3],[76,3],[81,1],[47,1],[83,1],[83,1],[82,1],[84,1],[84,1],[84,0],[84,1],[85,1],[86,1],[87,1],[88,1],[89,1],[89,3],[89,3],[90,1],[93,1],[94,1],[94,3],[94,3],[95,1],[95,3],[95,3],[95,3],[98,2],[98,2],[98,1],[102,1],[103,1],[103,1],[104,1],[104,1],[105,1],[105,1],[105,1],[105,1],[77,3],[77,4],[110,1],[110,3],[108,1],[108,1],[106,1],[107,1],[109,1]],
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
case 28: this.$ = {vavaIdentifier: $$[$0-6], vavaFormalParameters: []}; 
break;
case 29: this.$ = [$$[$0]]; 
break;
case 30: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 31: this.$ = new yy.FormalParameter($$[$0-1], $$[$0]); 
break;
case 32: this.$ = $$[$0]; 
break;
case 33: this.$ = new yy.VariableDeclarators($$[$0]); 
break;
case 34: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
break;
case 35: this.$ = new yy.VariableDeclarator($$[$0]); 
break;
case 36: this.$ = new yy.VariableDeclarator($$[$0-2], $$[$0]); 
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
case 45: this.$ = $$[$0]; 
break;
case 46: this.$ = $$[$0]; 
break;
case 47: this.$ = new yy.Block(); 
break;
case 48: this.$ = new yy.Block($$[$0-1]); 
break;
case 49: this.$ = [$$[$0]]; 
break;
case 50: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 51: this.$ = $$[$0]; 
break;
case 52: this.$ = $$[$0]; 
break;
case 53: this.$ = $$[$0-1]; 
break;
case 54: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
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
case 60: this.$ = $$[$0]; 
break;
case 61: this.$ = $$[$0]; 
break;
case 62: this.$ = new yy.IfThen($$[$0-2], $$[$0]); 
break;
case 63: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0]); 
break;
case 64: this.$ = $$[$0]; 
break;
case 65: this.$ = $$[$0]; 
break;
case 66: this.$ = $$[$0]; 
break;
case 67: this.$ = $$[$0]; 
break;
case 68: this.$ = $$[$0]; 
break;
case 69: this.$ = new yy.WhileLoop($$[$0-2], $$[$0]); 
break;
case 70: this.$ = new yy.ASTNode(); 
break;
case 71: this.$ = new yy.ExpressionStatement($$[$0-1]); 
break;
case 72: this.$ = $$[$0]; 
break;
case 73: this.$ = $$[$0]; 
break;
case 74: this.$ = $$[$0]; 
break;
case 75: this.$ = $$[$0]; 
break;
case 76: this.$ = new yy.Name($$[$0]); 
break;
case 77: this.$ = new yy.Name($$[$0-2].qualified() + '.' + $$[$0]); 
break;
case 78: this.$ = new yy.Assignment($$[$0-2], $$[$0]); 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = $$[$0]; 
break;
case 81: this.$ = $$[$0]; 
break;
case 82: this.$ = $$[$0]; 
break;
case 83: this.$ = $$[$0]; 
break;
case 84: this.$ = $$[$0]; 
break;
case 87: this.$ = new yy.OrOrExpression($$[$0], $$[$02]); 
break;
case 88: this.$ = $$[$0]; 
break;
case 89: this.$ = $$[$0]; 
break;
case 90: this.$ = $$[$0]; 
break;
case 91: this.$ = $$[$0]; 
break;
case 92: this.$ = $$[$0]; 
break;
case 93: this.$ = new yy.Equals($$[$0-2], $$[$0]); 
break;
case 94: this.$ = new yy.NotEquals($$[$0-2], $$[$0]); 
break;
case 95: this.$ = $$[$0]; 
break;
case 96: this.$ = $$[$0]; 
break;
case 97: this.$ = $$[$0]; 
break;
case 98: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
break;
case 99: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
break;
case 100: this.$ = $$[$0]; 
break;
case 101: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
break;
case 102: this.$ = new yy.Division($$[$0-2], $$[$0]); 
break;
case 103: this.$ = new yy.Modulo($$[$0-2], $$[$0]); 
break;
case 104: this.$ = new yy.UnaryMinus($$[$0]); 
break;
case 105: this.$ = new yy.UnaryPlus($$[$0]); 
break;
case 106: this.$ = $$[$0]; 
break;
case 107: this.$ = $$[$0]; 
break;
case 108: this.$ = $$[$0]; 
break;
case 109: this.$ = $$[$0]; 
break;
case 110: this.$ = $$[$0]; 
break;
case 111: this.$ = $$[$0]; 
break;
case 112: this.$ = $$[$0]; 
break;
case 113: this.$ = $$[$0]; 
break;
case 114: this.$ = $$[$0]; 
break;
case 115: this.$ = $$[$0]; 
break;
case 116: this.$ = new yy.MethodInvocation($$[$0-2]); 
break;
case 117: this.$ = new yy.MethodInvocation($$[$0-3], $$[$0-1]); 
break;
case 118: this.$ = new yy.ArgumentList($$[$0]); 
break;
case 119: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
break;
case 120: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 121: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 122: this.$ = new yy.IntegerLiteral($$[$0]); 
break;
case 123: this.$ = new yy.FloatingPointLiteral($$[$0]); 
break;
case 124: this.$ = new yy.StringLiteral($$[$0]); 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{1:[3]},{1:[2,1]},{4:[1,13],6:14,7:15,11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,16],7:17,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,19]},{9:[1,20]},{4:[2,10],12:[2,10],16:[2,10],18:[2,10]},{4:[2,13]},{9:[1,24],13:21,78:22,79:23},{4:[2,14]},{9:[1,25]},{16:[1,26]},{1:[2,2]},{4:[1,27],7:28,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,29]},{1:[2,3]},{4:[1,30]},{4:[2,11],12:[2,11],16:[2,11],18:[2,11]},{1:[2,4]},{10:[1,31]},{10:[1,32],80:[1,33]},{10:[2,74],33:[2,74],35:[2,74],41:[2,74],45:[2,74],80:[2,74],91:[2,74],92:[2,74],96:[2,74],97:[2,74],99:[2,74],100:[2,74],101:[2,74]},{10:[2,75],33:[2,75],35:[2,75],41:[2,75],45:[2,75],80:[2,75],91:[2,75],92:[2,75],96:[2,75],97:[2,75],99:[2,75],100:[2,75],101:[2,75]},{10:[2,76],33:[2,76],35:[2,76],41:[2,76],45:[2,76],80:[2,76],91:[2,76],92:[2,76],96:[2,76],97:[2,76],99:[2,76],100:[2,76],101:[2,76]},{17:34,19:[1,35]},{9:[1,36]},{1:[2,5]},{4:[1,37]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],16:[2,9],18:[2,9]},{4:[2,12],12:[2,12],16:[2,12],18:[2,12]},{9:[1,38]},{4:[2,15]},{18:[1,47],20:39,22:40,23:41,24:42,25:43,26:44,28:45,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54]},{17:55,19:[1,35]},{1:[2,8]},{10:[2,77],33:[2,77],35:[2,77],41:[2,77],45:[2,77],80:[2,77],91:[2,77],92:[2,77],96:[2,77],97:[2,77],99:[2,77],100:[2,77],101:[2,77]},{18:[1,47],21:[1,56],22:57,23:41,24:42,25:43,26:44,28:45,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54]},{18:[2,18],21:[2,18],50:[2,18],53:[2,18],54:[2,18],55:[2,18]},{18:[2,20],21:[2,20],50:[2,20],53:[2,20],54:[2,20],55:[2,20]},{18:[2,21],21:[2,21],50:[2,21],53:[2,21],54:[2,21],55:[2,21]},{18:[2,22],21:[2,22],50:[2,22],53:[2,22],54:[2,22],55:[2,22]},{9:[1,61],27:58,30:59,42:62,44:60},{19:[1,65],29:63,43:64},{9:[2,39]},{31:[1,66]},{9:[2,40]},{9:[2,41]},{9:[2,42]},{9:[2,43]},{9:[2,44]},{9:[2,45]},{9:[2,46]},{4:[2,16]},{4:[2,17]},{18:[2,19],21:[2,19],50:[2,19],53:[2,19],54:[2,19],55:[2,19]},{10:[1,67],41:[1,68]},{19:[2,25]},{10:[2,33],41:[2,33]},{10:[2,37],33:[1,69],41:[2,37],45:[2,37]},{10:[2,35],41:[2,35],45:[1,70]},{18:[2,24],21:[2,24],50:[2,24],53:[2,24],54:[2,24],55:[2,24]},{18:[2,32],21:[2,32],50:[2,32],53:[2,32],54:[2,32],55:[2,32]},{9:[1,24],10:[1,87],13:92,19:[1,65],21:[1,71],26:81,43:82,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:72,57:73,58:74,59:75,60:76,61:77,62:78,63:79,64:80,65:83,66:84,67:[1,85],74:[1,86],75:88,76:89,77:90,78:22,79:23,81:91},{32:[1,93]},{18:[2,23],21:[2,23],50:[2,23],53:[2,23],54:[2,23],55:[2,23]},{9:[1,95],42:62,44:94},{26:100,34:96,36:[1,97],39:98,40:[1,99],48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54]},{9:[1,24],10:[2,86],13:120,41:[2,86],46:101,47:102,77:122,78:22,79:23,82:103,84:104,85:105,86:106,87:107,88:108,89:109,90:110,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[2,47],10:[2,47],18:[2,47],19:[2,47],21:[2,47],50:[2,47],53:[2,47],54:[2,47],55:[2,47],67:[2,47],69:[2,47],74:[2,47]},{9:[1,24],10:[1,87],13:92,19:[1,65],21:[1,132],26:81,43:82,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],57:133,58:74,59:75,60:76,61:77,62:78,63:79,64:80,65:83,66:84,67:[1,85],74:[1,86],75:88,76:89,77:90,78:22,79:23,81:91},{9:[2,49],10:[2,49],19:[2,49],21:[2,49],50:[2,49],53:[2,49],54:[2,49],55:[2,49],67:[2,49],74:[2,49]},{9:[2,51],10:[2,51],19:[2,51],21:[2,51],50:[2,51],53:[2,51],54:[2,51],55:[2,51],67:[2,51],74:[2,51]},{9:[2,52],10:[2,52],19:[2,52],21:[2,52],50:[2,52],53:[2,52],54:[2,52],55:[2,52],67:[2,52],74:[2,52]},{10:[1,134]},{9:[2,55],10:[2,55],19:[2,55],21:[2,55],50:[2,55],53:[2,55],54:[2,55],55:[2,55],67:[2,55],74:[2,55]},{9:[2,56],10:[2,56],19:[2,56],21:[2,56],50:[2,56],53:[2,56],54:[2,56],55:[2,56],67:[2,56],74:[2,56]},{9:[2,57],10:[2,57],19:[2,57],21:[2,57],50:[2,57],53:[2,57],54:[2,57],55:[2,57],67:[2,57],74:[2,57]},{9:[2,58],10:[2,58],19:[2,58],21:[2,58],50:[2,58],53:[2,58],54:[2,58],55:[2,58],67:[2,58],74:[2,58]},{9:[1,95],27:135,42:62,44:60},{9:[2,59],10:[2,59],19:[2,59],21:[2,59],50:[2,59],53:[2,59],54:[2,59],55:[2,59],67:[2,59],69:[2,59],74:[2,59]},{9:[2,60],10:[2,60],19:[2,60],21:[2,60],50:[2,60],53:[2,60],54:[2,60],55:[2,60],67:[2,60],69:[2,60],74:[2,60]},{9:[2,61],10:[2,61],19:[2,61],21:[2,61],50:[2,61],53:[2,61],54:[2,61],55:[2,61],67:[2,61],69:[2,61],74:[2,61]},{33:[1,136]},{33:[1,137]},{9:[2,70],10:[2,70],19:[2,70],21:[2,70],50:[2,70],53:[2,70],54:[2,70],55:[2,70],67:[2,70],69:[2,70],74:[2,70]},{10:[1,138]},{10:[2,72]},{10:[2,73]},{45:[1,139]},{33:[1,140],45:[2,79],80:[1,33]},{9:[1,142],30:141},{10:[2,34],41:[2,34]},{10:[2,37],35:[2,37],41:[2,37],45:[2,37]},{35:[1,143]},{37:[1,144]},{35:[2,29]},{41:[1,145]},{9:[1,95],42:146},{10:[2,36],41:[2,36]},{10:[2,38],41:[2,38]},{10:[2,80],35:[2,80],41:[2,80]},{10:[2,83],35:[2,83],41:[2,83]},{10:[2,84],35:[2,84],41:[2,84]},{10:[2,88],35:[2,88],41:[2,88]},{10:[2,89],35:[2,89],41:[2,89]},{10:[2,90],35:[2,90],41:[2,90]},{10:[2,91],35:[2,91],41:[2,91],91:[1,147],92:[1,148]},{10:[2,92],35:[2,92],41:[2,92],91:[2,92],92:[2,92]},{10:[2,95],35:[2,95],41:[2,95],91:[2,95],92:[2,95]},{10:[2,96],35:[2,96],41:[2,96],91:[2,96],92:[2,96],96:[1,149],97:[1,150]},{10:[2,97],35:[2,97],41:[2,97],91:[2,97],92:[2,97],96:[2,97],97:[2,97],99:[1,151],100:[1,152],101:[1,153]},{10:[2,100],35:[2,100],41:[2,100],91:[2,100],92:[2,100],96:[2,100],97:[2,100],99:[2,100],100:[2,100],101:[2,100]},{9:[1,24],13:120,77:122,78:22,79:23,96:[1,116],97:[1,115],98:154,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,96:[1,116],97:[1,115],98:155,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{10:[2,106],35:[2,106],41:[2,106],91:[2,106],92:[2,106],96:[2,106],97:[2,106],99:[2,106],100:[2,106],101:[2,106]},{10:[2,107],35:[2,107],41:[2,107],91:[2,107],92:[2,107],96:[2,107],97:[2,107],99:[2,107],100:[2,107],101:[2,107]},{10:[2,108],35:[2,108],41:[2,108],91:[2,108],92:[2,108],96:[2,108],97:[2,108],99:[2,108],100:[2,108],101:[2,108]},{10:[2,109],33:[1,140],35:[2,109],41:[2,109],80:[1,33],91:[2,109],92:[2,109],96:[2,109],97:[2,109],99:[2,109],100:[2,109],101:[2,109]},{10:[2,110],35:[2,110],41:[2,110],91:[2,110],92:[2,110],96:[2,110],97:[2,110],99:[2,110],100:[2,110],101:[2,110]},{10:[2,111],35:[2,111],41:[2,111],91:[2,111],92:[2,111],96:[2,111],97:[2,111],99:[2,111],100:[2,111],101:[2,111]},{10:[2,112],35:[2,112],41:[2,112],91:[2,112],92:[2,112],96:[2,112],97:[2,112],99:[2,112],100:[2,112],101:[2,112]},{10:[2,113],35:[2,113],41:[2,113],91:[2,113],92:[2,113],96:[2,113],97:[2,113],99:[2,113],100:[2,113],101:[2,113]},{10:[2,114],35:[2,114],41:[2,114],91:[2,114],92:[2,114],96:[2,114],97:[2,114],99:[2,114],100:[2,114],101:[2,114]},{10:[2,115],35:[2,115],41:[2,115],91:[2,115],92:[2,115],96:[2,115],97:[2,115],99:[2,115],100:[2,115],101:[2,115]},{10:[2,122],35:[2,122],41:[2,122],91:[2,122],92:[2,122],96:[2,122],97:[2,122],99:[2,122],100:[2,122],101:[2,122]},{10:[2,123],35:[2,123],41:[2,123],91:[2,123],92:[2,123],96:[2,123],97:[2,123],99:[2,123],100:[2,123],101:[2,123]},{10:[2,120],35:[2,120],41:[2,120],91:[2,120],92:[2,120],96:[2,120],97:[2,120],99:[2,120],100:[2,120],101:[2,120]},{10:[2,121],35:[2,121],41:[2,121],91:[2,121],92:[2,121],96:[2,121],97:[2,121],99:[2,121],100:[2,121],101:[2,121]},{10:[2,124],35:[2,124],41:[2,124],91:[2,124],92:[2,124],96:[2,124],97:[2,124],99:[2,124],100:[2,124],101:[2,124]},{9:[2,48],10:[2,48],18:[2,48],19:[2,48],21:[2,48],50:[2,48],53:[2,48],54:[2,48],55:[2,48],67:[2,48],69:[2,48],74:[2,48]},{9:[2,50],10:[2,50],19:[2,50],21:[2,50],50:[2,50],53:[2,50],54:[2,50],55:[2,50],67:[2,50],74:[2,50]},{9:[2,53],10:[2,53],19:[2,53],21:[2,53],50:[2,53],53:[2,53],54:[2,53],55:[2,53],67:[2,53],74:[2,53]},{10:[2,54],41:[1,68]},{9:[1,24],13:120,35:[2,86],47:156,77:122,78:22,79:23,82:103,84:104,85:105,86:106,87:107,88:108,89:109,90:110,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,35:[2,86],47:157,77:122,78:22,79:23,82:103,84:104,85:105,86:106,87:107,88:108,89:109,90:110,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[2,71],10:[2,71],19:[2,71],21:[2,71],50:[2,71],53:[2,71],54:[2,71],55:[2,71],67:[2,71],69:[2,71],74:[2,71]},{9:[1,24],10:[2,86],13:120,77:122,78:22,79:23,82:158,84:104,85:105,86:106,87:107,88:108,89:109,90:110,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,35:[1,159],41:[2,86],47:161,77:122,78:22,79:23,82:103,84:104,85:105,86:106,87:107,88:108,89:109,90:110,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,110:160,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{19:[2,26]},{33:[1,69]},{19:[2,27]},{38:[1,162]},{26:100,39:163,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54]},{35:[2,31]},{9:[1,24],13:120,77:122,78:22,79:23,90:164,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,90:165,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,95:166,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,95:167,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,96:[1,116],97:[1,115],98:168,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,96:[1,116],97:[1,115],98:169,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{9:[1,24],13:120,77:122,78:22,79:23,96:[1,116],97:[1,115],98:170,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{10:[2,104],35:[2,104],41:[2,104],91:[2,104],92:[2,104],96:[2,104],97:[2,104],99:[2,104],100:[2,104],101:[2,104]},{10:[2,105],35:[2,105],41:[2,105],91:[2,105],92:[2,105],96:[2,105],97:[2,105],99:[2,105],100:[2,105],101:[2,105]},{35:[1,171]},{35:[1,172]},{10:[2,78]},{10:[2,116],35:[2,116],41:[2,116],91:[2,116],92:[2,116],96:[2,116],97:[2,116],99:[2,116],100:[2,116],101:[2,116]},{35:[1,173],41:[1,174]},{35:[2,118],41:[2,118]},{9:[1,175]},{35:[2,30]},{10:[2,93],35:[2,93],41:[2,93],91:[2,93],92:[2,93]},{10:[2,94],35:[2,94],41:[2,94],91:[2,94],92:[2,94]},{10:[2,98],35:[2,98],41:[2,98],91:[2,98],92:[2,98],96:[2,98],97:[2,98],99:[1,151],100:[1,152],101:[1,153]},{10:[2,99],35:[2,99],41:[2,99],91:[2,99],92:[2,99],96:[2,99],97:[2,99],99:[1,151],100:[1,152],101:[1,153]},{10:[2,101],35:[2,101],41:[2,101],91:[2,101],92:[2,101],96:[2,101],97:[2,101],99:[2,101],100:[2,101],101:[2,101]},{10:[2,102],35:[2,102],41:[2,102],91:[2,102],92:[2,102],96:[2,102],97:[2,102],99:[2,102],100:[2,102],101:[2,102]},{10:[2,103],35:[2,103],41:[2,103],91:[2,103],92:[2,103],96:[2,103],97:[2,103],99:[2,103],100:[2,103],101:[2,103]},{9:[1,24],10:[1,87],13:92,19:[1,65],43:82,59:177,61:178,62:78,63:79,64:80,65:83,66:84,67:[1,85],68:176,70:[1,179],71:[1,180],72:[1,181],73:[1,182],74:[1,86],75:88,76:89,77:90,78:22,79:23,81:91},{9:[1,24],10:[1,87],13:92,19:[1,65],43:82,59:183,61:77,62:78,63:79,64:80,65:83,66:84,67:[1,85],74:[1,86],75:88,76:89,77:90,78:22,79:23,81:91},{10:[2,117],35:[2,117],41:[2,117],91:[2,117],92:[2,117],96:[2,117],97:[2,117],99:[2,117],100:[2,117],101:[2,117]},{9:[1,24],13:120,35:[2,86],41:[2,86],47:184,77:122,78:22,79:23,82:103,84:104,85:105,86:106,87:107,88:108,89:109,90:110,93:111,94:112,95:113,96:[1,116],97:[1,115],98:114,102:117,103:118,104:119,105:121,106:123,107:124,108:125,109:126,111:[1,129],112:[1,130],113:[1,127],114:[1,128],115:[1,131]},{35:[1,185]},{69:[1,186]},{9:[2,62],10:[2,62],19:[2,62],21:[2,62],50:[2,62],53:[2,62],54:[2,62],55:[2,62],67:[2,62],74:[2,62]},{9:[2,64],10:[2,64],19:[2,64],21:[2,64],50:[2,64],53:[2,64],54:[2,64],55:[2,64],67:[2,64],69:[2,64],74:[2,64]},{69:[2,65]},{69:[2,66]},{69:[2,67]},{69:[2,68]},{9:[2,69],10:[2,69],19:[2,69],21:[2,69],50:[2,69],53:[2,69],54:[2,69],55:[2,69],67:[2,69],74:[2,69]},{35:[2,119],41:[2,119]},{19:[2,28]},{9:[1,24],10:[1,87],13:92,19:[1,65],43:82,59:187,61:77,62:78,63:79,64:80,65:83,66:84,67:[1,85],74:[1,86],75:88,76:89,77:90,78:22,79:23,81:91},{9:[2,63],10:[2,63],19:[2,63],21:[2,63],50:[2,63],53:[2,63],54:[2,63],55:[2,63],67:[2,63],74:[2,63]}],
defaultActions: {2:[2,1],8:[2,13],10:[2,14],13:[2,2],16:[2,3],19:[2,4],27:[2,5],29:[2,6],30:[2,7],34:[2,15],37:[2,8],46:[2,39],48:[2,40],49:[2,41],50:[2,42],51:[2,43],52:[2,44],53:[2,45],54:[2,46],55:[2,16],56:[2,17],59:[2,25],89:[2,72],90:[2,73],98:[2,29],141:[2,26],143:[2,27],146:[2,31],158:[2,78],163:[2,30],179:[2,65],180:[2,66],181:[2,67],182:[2,68],185:[2,28]},
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
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
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
                    last_column: lstack[lstack.length-1].last_column
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
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
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
case 0:/* skip comments */
break;
case 1:/* skip whitespace */
break;
case 2:return 19; /* Basic Syntax */
break;
case 3:return 21;
break;
case 4:return 33;
break;
case 5:return 35;
break;
case 6:return 37;
break;
case 7:return 38;
break;
case 8:return 41;
break;
case 9:return 10;
break;
case 10:return 18; /* Modifier */
break;
case 11:return 'MODIFIER_PRIVATE';
break;
case 12:return 'MODIFIER_PROTECTED';
break;
case 13:return 31;
break;
case 14:return 32;
break;
case 15:return 'MODIFIER_FINAL';
break;
case 16:return 8; /* Keywords */
break;
case 17:return 12;
break;
case 18:return 67;
break;
case 19:return 69;
break;
case 20:return 74;
break;
case 21:return 111;
break;
case 22:return 112;
break;
case 23:return 16;
break;
case 24:return 50;
break;
case 25:return 53;
break;
case 26:return 54;
break;
case 27:return 55;
break;
case 28:return 36;
break;
case 29:return 91;
break;
case 30:return 92;
break;
case 31:return 45;
break;
case 32:return 96;
break;
case 33:return 97;
break;
case 34:return 99;
break;
case 35:return 100;
break;
case 36:return 101;
break;
case 37:return 9; /* Varying form */
break;
case 38:return 114;
break;
case 39:return 113;
break;
case 40:return 115;
break;
case 41:return 80;
break;
case 42:return 4;
break;
case 43:return 'INVALID';
break;
}
};
lexer.rules = [/^\/\/.*/,/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^\[/,/^\]/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^if\b/,/^else\b/,/^while\b/,/^true\b/,/^false\b/,/^class\b/,/^boolean\b/,/^int\b/,/^float\b/,/^double\b/,/^String\b/,/^==/,/^!=/,/^=/,/^\+/,/^-/,/^\*/,/^\//,/^%/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^((0|[1-9][0-9]*)\.(0|[1-9][0-9]*)?([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|\.(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD])\b\b/,/^(0|[1-9][0-9]*)\b\b/,/^".*"/,/^\./,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43],"inclusive":true}};return lexer;})()
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