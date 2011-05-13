/* Jison generated parser */
var vava_proper = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"name":13,"type_declaration":14,"class_declaration":15,"KEYWORD_CLASS":16,"class_body":17,"MODIFIER_PUBLIC":18,"EMBRACE":19,"class_body_declarations":20,"UNBRACE":21,"class_body_declaration":22,"class_member_declaration":23,"field_declaration":24,"method_declaration":25,"type":26,"variable_declarators":27,"method_header":28,"method_body":29,"method_declarator":30,"MODIFIER_STATIC":31,"MODIFIER_VOID":32,"LEFT_PAREN":33,"formal_parameter_list":34,"RIGHT_PAREN":35,"STRING_TYPE":36,"LEFT_BRACKET":37,"RIGHT_BRACKET":38,"formal_parameter":39,"formal_parameters":40,"COMMA":41,"variable_declarator_id":42,"block":43,"variable_declarator":44,"OPERATOR_ASSIGNMENT":45,"variable_initializer":46,"expression":47,"primitive_type":48,"numeric_type":49,"PRIMITIVE_BOOLEAN":50,"integral_type":51,"floating_point_type":52,"PRIMITIVE_BYTE":53,"PRIMITIVE_SHORT":54,"PRIMITIVE_INTEGER":55,"PRIMITIVE_LONG":56,"PRIMITIVE_CHAR":57,"PRIMITIVE_FLOAT":58,"PRIMITIVE_DOUBLE":59,"block_statements":60,"block_statement":61,"local_variable_declaration_statement":62,"statement":63,"local_variable_declaration":64,"statement_without_trailing_substatement":65,"if_then_else_statement":66,"if_then_statement":67,"while_statement":68,"empty_statement":69,"expression_statement":70,"KEYWORD_IF":71,"statement_no_short_if":72,"KEYWORD_ELSE":73,"labeled_statement_no_short_if":74,"if_then_else_statement_no_short_if":75,"while_statement_no_short_if":76,"for_statement_no_short_if":77,"KEYWORD_WHILE":78,"statement_expression":79,"assignment":80,"method_invocation":81,"simple_name":82,"qualified_name":83,"SEPARATOR_DOT":84,"left_hand_side":85,"conditional_expression":86,"assignment_expression":87,"conditional_or_expression":88,"conditional_and_expression":89,"inclusive_or_expression":90,"exclusive_or_expression":91,"and_expression":92,"equality_expression":93,"relational_expression":94,"OPERATOR_EQUAL":95,"OPERATOR_NOT_EQUAL":96,"shift_expression":97,"additive_expression":98,"multiplicative_expression":99,"OPERATOR_ADDITION":100,"OPERATOR_SUBTRACTION":101,"unary_expression":102,"OPERATOR_MULTIPLICATION":103,"OPERATOR_DIVISON":104,"OPERATOR_MODULO":105,"unary_expression_not_plus_minus":106,"postfix_expression":107,"cast_expression":108,"primary":109,"literal":110,"integer_literal":111,"char_literal":112,"floating_point_literal":113,"boolean_literal":114,"string_literal":115,"null_literal":116,"argument_list":117,"TRUE_LITERAL":118,"FALSE_LITERAL":119,"DECIMAL_INTEGER_LITERAL":120,"CHAR_LITERAL":121,"NULL_LITERAL":122,"FLOATING_POINT_LITERAL":123,"STRING_LITERAL":124,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",16:"KEYWORD_CLASS",18:"MODIFIER_PUBLIC",19:"EMBRACE",21:"UNBRACE",31:"MODIFIER_STATIC",32:"MODIFIER_VOID",33:"LEFT_PAREN",35:"RIGHT_PAREN",36:"STRING_TYPE",37:"LEFT_BRACKET",38:"RIGHT_BRACKET",40:"formal_parameters",41:"COMMA",45:"OPERATOR_ASSIGNMENT",50:"PRIMITIVE_BOOLEAN",53:"PRIMITIVE_BYTE",54:"PRIMITIVE_SHORT",55:"PRIMITIVE_INTEGER",56:"PRIMITIVE_LONG",57:"PRIMITIVE_CHAR",58:"PRIMITIVE_FLOAT",59:"PRIMITIVE_DOUBLE",71:"KEYWORD_IF",73:"KEYWORD_ELSE",74:"labeled_statement_no_short_if",75:"if_then_else_statement_no_short_if",76:"while_statement_no_short_if",77:"for_statement_no_short_if",78:"KEYWORD_WHILE",84:"SEPARATOR_DOT",95:"OPERATOR_EQUAL",96:"OPERATOR_NOT_EQUAL",100:"OPERATOR_ADDITION",101:"OPERATOR_SUBTRACTION",103:"OPERATOR_MULTIPLICATION",104:"OPERATOR_DIVISON",105:"OPERATOR_MODULO",118:"TRUE_LITERAL",119:"FALSE_LITERAL",120:"DECIMAL_INTEGER_LITERAL",121:"CHAR_LITERAL",122:"NULL_LITERAL",123:"FLOATING_POINT_LITERAL",124:"STRING_LITERAL"},
productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[14,1],[15,3],[15,4],[17,3],[20,1],[20,2],[22,1],[23,1],[23,1],[24,3],[25,2],[28,2],[28,4],[30,4],[30,7],[34,1],[34,3],[39,2],[29,1],[27,1],[27,3],[44,1],[44,3],[42,1],[46,1],[26,1],[48,1],[48,1],[49,1],[49,1],[51,1],[51,1],[51,1],[51,1],[51,1],[52,1],[52,1],[43,2],[43,3],[60,1],[60,2],[61,1],[61,1],[62,2],[64,2],[63,1],[63,1],[63,1],[63,1],[65,1],[65,1],[65,1],[67,5],[66,7],[72,1],[72,1],[72,1],[72,1],[72,1],[68,5],[69,1],[70,2],[79,1],[79,1],[13,1],[13,1],[82,1],[83,3],[80,3],[85,1],[47,1],[87,1],[87,1],[86,1],[88,1],[88,1],[88,0],[88,1],[89,1],[90,1],[91,1],[92,1],[93,1],[93,3],[93,3],[94,1],[97,1],[98,1],[98,3],[98,3],[99,1],[99,3],[99,3],[99,3],[102,2],[102,2],[102,1],[106,1],[106,1],[107,1],[107,1],[108,4],[109,1],[109,1],[110,1],[110,1],[110,1],[110,1],[110,1],[110,1],[81,3],[81,4],[117,1],[117,3],[114,1],[114,1],[111,1],[112,1],[116,1],[113,1],[115,1]],
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
case 47: this.$ = $$[$0]; 
break;
case 48: this.$ = $$[$0]; 
break;
case 49: this.$ = $$[$0]; 
break;
case 50: this.$ = $$[$0]; 
break;
case 51: this.$ = new yy.Block(); 
break;
case 52: this.$ = new yy.Block($$[$0-1]); 
break;
case 53: this.$ = [$$[$0]]; 
break;
case 54: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 55: this.$ = $$[$0]; 
break;
case 56: this.$ = $$[$0]; 
break;
case 57: this.$ = $$[$0-1]; 
break;
case 58: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
break;
case 59: this.$ = $$[$0]; 
break;
case 60: this.$ = $$[$0]; 
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
case 66: this.$ = new yy.IfThen($$[$0-2], $$[$0]); 
break;
case 67: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0]); 
break;
case 68: this.$ = $$[$0]; 
break;
case 69: this.$ = $$[$0]; 
break;
case 70: this.$ = $$[$0]; 
break;
case 71: this.$ = $$[$0]; 
break;
case 72: this.$ = $$[$0]; 
break;
case 73: this.$ = new yy.WhileLoop($$[$0-2], $$[$0]); 
break;
case 74: this.$ = new yy.ASTNode(); 
break;
case 75: this.$ = new yy.ExpressionStatement($$[$0-1]); 
break;
case 76: this.$ = $$[$0]; 
break;
case 77: this.$ = $$[$0]; 
break;
case 78: this.$ = $$[$0]; 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = new yy.Name($$[$0]); 
break;
case 81: this.$ = new yy.Name($$[$0-2].qualified() + '.' + $$[$0]); 
break;
case 82: this.$ = new yy.Assignment($$[$0-2], $$[$0]); 
break;
case 83: this.$ = $$[$0]; 
break;
case 84: this.$ = $$[$0]; 
break;
case 85: this.$ = $$[$0]; 
break;
case 86: this.$ = $$[$0]; 
break;
case 87: this.$ = $$[$0]; 
break;
case 88: this.$ = $$[$0]; 
break;
case 91: this.$ = new yy.OrOrExpression($$[$0], $$[$02]); 
break;
case 92: this.$ = $$[$0]; 
break;
case 93: this.$ = $$[$0]; 
break;
case 94: this.$ = $$[$0]; 
break;
case 95: this.$ = $$[$0]; 
break;
case 96: this.$ = $$[$0]; 
break;
case 97: this.$ = new yy.Equals($$[$0-2], $$[$0]); 
break;
case 98: this.$ = new yy.NotEquals($$[$0-2], $$[$0]); 
break;
case 99: this.$ = $$[$0]; 
break;
case 100: this.$ = $$[$0]; 
break;
case 101: this.$ = $$[$0]; 
break;
case 102: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
break;
case 103: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
break;
case 104: this.$ = $$[$0]; 
break;
case 105: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
break;
case 106: this.$ = new yy.Division($$[$0-2], $$[$0]); 
break;
case 107: this.$ = new yy.Modulo($$[$0-2], $$[$0]); 
break;
case 108: this.$ = new yy.UnaryMinus($$[$0]); 
break;
case 109: this.$ = new yy.UnaryPlus($$[$0]); 
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
case 115: this.$ = new yy.CastExpression($$[$0-2], $$[$0]); 
break;
case 116: this.$ = $$[$0]; 
break;
case 117: this.$ = $$[$0]; 
break;
case 118: this.$ = $$[$0]; 
break;
case 119: this.$ = $$[$0]; 
break;
case 120: this.$ = $$[$0]; 
break;
case 121: this.$ = $$[$0]; 
break;
case 122: this.$ = $$[$0]; 
break;
case 123: this.$ = $$[$0]; 
break;
case 124: this.$ = new yy.MethodInvocation($$[$0-2]); 
break;
case 125: this.$ = new yy.MethodInvocation($$[$0-3], $$[$0-1]); 
break;
case 126: this.$ = new yy.ArgumentList($$[$0]); 
break;
case 127: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
break;
case 128: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 129: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 130: this.$ = new yy.IntegerLiteral($$[$0]); 
break;
case 131: this.$ = new yy.CharLiteral($$[$0]); 
break;
case 132: this.$ = new yy.NullLiteral($$[$0]); 
break;
case 133: this.$ = new yy.FloatingPointLiteral($$[$0]); 
break;
case 134: this.$ = new yy.StringLiteral($$[$0]); 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{1:[3]},{1:[2,1]},{4:[1,13],6:14,7:15,11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,16],7:17,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,19]},{9:[1,20]},{4:[2,10],12:[2,10],16:[2,10],18:[2,10]},{4:[2,13]},{9:[1,24],13:21,82:22,83:23},{4:[2,14]},{9:[1,25]},{16:[1,26]},{1:[2,2]},{4:[1,27],7:28,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,29]},{1:[2,3]},{4:[1,30]},{4:[2,11],12:[2,11],16:[2,11],18:[2,11]},{1:[2,4]},{10:[1,31]},{10:[1,32],84:[1,33]},{10:[2,78],33:[2,78],35:[2,78],41:[2,78],45:[2,78],84:[2,78],95:[2,78],96:[2,78],100:[2,78],101:[2,78],103:[2,78],104:[2,78],105:[2,78]},{10:[2,79],33:[2,79],35:[2,79],41:[2,79],45:[2,79],84:[2,79],95:[2,79],96:[2,79],100:[2,79],101:[2,79],103:[2,79],104:[2,79],105:[2,79]},{10:[2,80],33:[2,80],35:[2,80],41:[2,80],45:[2,80],84:[2,80],95:[2,80],96:[2,80],100:[2,80],101:[2,80],103:[2,80],104:[2,80],105:[2,80]},{17:34,19:[1,35]},{9:[1,36]},{1:[2,5]},{4:[1,37]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],16:[2,9],18:[2,9]},{4:[2,12],12:[2,12],16:[2,12],18:[2,12]},{9:[1,38]},{4:[2,15]},{18:[1,47],20:39,22:40,23:41,24:42,25:43,26:44,28:45,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{17:59,19:[1,35]},{1:[2,8]},{10:[2,81],33:[2,81],35:[2,81],41:[2,81],45:[2,81],84:[2,81],95:[2,81],96:[2,81],100:[2,81],101:[2,81],103:[2,81],104:[2,81],105:[2,81]},{18:[1,47],21:[1,60],22:61,23:41,24:42,25:43,26:44,28:45,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{18:[2,18],21:[2,18],50:[2,18],53:[2,18],54:[2,18],55:[2,18],56:[2,18],57:[2,18],58:[2,18],59:[2,18]},{18:[2,20],21:[2,20],50:[2,20],53:[2,20],54:[2,20],55:[2,20],56:[2,20],57:[2,20],58:[2,20],59:[2,20]},{18:[2,21],21:[2,21],50:[2,21],53:[2,21],54:[2,21],55:[2,21],56:[2,21],57:[2,21],58:[2,21],59:[2,21]},{18:[2,22],21:[2,22],50:[2,22],53:[2,22],54:[2,22],55:[2,22],56:[2,22],57:[2,22],58:[2,22],59:[2,22]},{9:[1,65],27:62,30:63,42:66,44:64},{19:[1,69],29:67,43:68},{9:[2,39]},{31:[1,70]},{9:[2,40],35:[2,40]},{9:[2,41],35:[2,41]},{9:[2,42],35:[2,42]},{9:[2,43],35:[2,43]},{9:[2,44],35:[2,44]},{9:[2,45],35:[2,45]},{9:[2,46],35:[2,46]},{9:[2,47],35:[2,47]},{9:[2,48],35:[2,48]},{9:[2,49],35:[2,49]},{9:[2,50],35:[2,50]},{4:[2,16]},{4:[2,17]},{18:[2,19],21:[2,19],50:[2,19],53:[2,19],54:[2,19],55:[2,19],56:[2,19],57:[2,19],58:[2,19],59:[2,19]},{10:[1,71],41:[1,72]},{19:[2,25]},{10:[2,33],41:[2,33]},{10:[2,37],33:[1,73],41:[2,37],45:[2,37]},{10:[2,35],41:[2,35],45:[1,74]},{18:[2,24],21:[2,24],50:[2,24],53:[2,24],54:[2,24],55:[2,24],56:[2,24],57:[2,24],58:[2,24],59:[2,24]},{18:[2,32],21:[2,32],50:[2,32],53:[2,32],54:[2,32],55:[2,32],56:[2,32],57:[2,32],58:[2,32],59:[2,32]},{9:[1,24],10:[1,91],13:96,19:[1,69],21:[1,75],26:85,43:86,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58],60:76,61:77,62:78,63:79,64:80,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{32:[1,97]},{18:[2,23],21:[2,23],50:[2,23],53:[2,23],54:[2,23],55:[2,23],56:[2,23],57:[2,23],58:[2,23],59:[2,23]},{9:[1,99],42:66,44:98},{26:104,34:100,36:[1,101],39:102,40:[1,103],48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{9:[1,24],10:[2,90],13:125,33:[1,126],41:[2,90],46:105,47:106,81:128,82:22,83:23,86:107,88:108,89:109,90:110,91:111,92:112,93:113,94:114,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[2,51],10:[2,51],18:[2,51],19:[2,51],21:[2,51],50:[2,51],53:[2,51],54:[2,51],55:[2,51],56:[2,51],57:[2,51],58:[2,51],59:[2,51],71:[2,51],73:[2,51],78:[2,51]},{9:[1,24],10:[1,91],13:96,19:[1,69],21:[1,142],26:85,43:86,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58],61:143,62:78,63:79,64:80,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{9:[2,53],10:[2,53],19:[2,53],21:[2,53],50:[2,53],53:[2,53],54:[2,53],55:[2,53],56:[2,53],57:[2,53],58:[2,53],59:[2,53],71:[2,53],78:[2,53]},{9:[2,55],10:[2,55],19:[2,55],21:[2,55],50:[2,55],53:[2,55],54:[2,55],55:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],71:[2,55],78:[2,55]},{9:[2,56],10:[2,56],19:[2,56],21:[2,56],50:[2,56],53:[2,56],54:[2,56],55:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],71:[2,56],78:[2,56]},{10:[1,144]},{9:[2,59],10:[2,59],19:[2,59],21:[2,59],50:[2,59],53:[2,59],54:[2,59],55:[2,59],56:[2,59],57:[2,59],58:[2,59],59:[2,59],71:[2,59],78:[2,59]},{9:[2,60],10:[2,60],19:[2,60],21:[2,60],50:[2,60],53:[2,60],54:[2,60],55:[2,60],56:[2,60],57:[2,60],58:[2,60],59:[2,60],71:[2,60],78:[2,60]},{9:[2,61],10:[2,61],19:[2,61],21:[2,61],50:[2,61],53:[2,61],54:[2,61],55:[2,61],56:[2,61],57:[2,61],58:[2,61],59:[2,61],71:[2,61],78:[2,61]},{9:[2,62],10:[2,62],19:[2,62],21:[2,62],50:[2,62],53:[2,62],54:[2,62],55:[2,62],56:[2,62],57:[2,62],58:[2,62],59:[2,62],71:[2,62],78:[2,62]},{9:[1,99],27:145,42:66,44:64},{9:[2,63],10:[2,63],19:[2,63],21:[2,63],50:[2,63],53:[2,63],54:[2,63],55:[2,63],56:[2,63],57:[2,63],58:[2,63],59:[2,63],71:[2,63],73:[2,63],78:[2,63]},{9:[2,64],10:[2,64],19:[2,64],21:[2,64],50:[2,64],53:[2,64],54:[2,64],55:[2,64],56:[2,64],57:[2,64],58:[2,64],59:[2,64],71:[2,64],73:[2,64],78:[2,64]},{9:[2,65],10:[2,65],19:[2,65],21:[2,65],50:[2,65],53:[2,65],54:[2,65],55:[2,65],56:[2,65],57:[2,65],58:[2,65],59:[2,65],71:[2,65],73:[2,65],78:[2,65]},{33:[1,146]},{33:[1,147]},{9:[2,74],10:[2,74],19:[2,74],21:[2,74],50:[2,74],53:[2,74],54:[2,74],55:[2,74],56:[2,74],57:[2,74],58:[2,74],59:[2,74],71:[2,74],73:[2,74],78:[2,74]},{10:[1,148]},{10:[2,76]},{10:[2,77]},{45:[1,149]},{33:[1,150],45:[2,83],84:[1,33]},{9:[1,152],30:151},{10:[2,34],41:[2,34]},{10:[2,37],35:[2,37],41:[2,37],45:[2,37]},{35:[1,153]},{37:[1,154]},{35:[2,29]},{41:[1,155]},{9:[1,99],42:156},{10:[2,36],41:[2,36]},{10:[2,38],41:[2,38]},{10:[2,84],35:[2,84],41:[2,84]},{10:[2,87],35:[2,87],41:[2,87]},{10:[2,88],35:[2,88],41:[2,88]},{10:[2,92],35:[2,92],41:[2,92]},{10:[2,93],35:[2,93],41:[2,93]},{10:[2,94],35:[2,94],41:[2,94]},{10:[2,95],35:[2,95],41:[2,95],95:[1,157],96:[1,158]},{10:[2,96],35:[2,96],41:[2,96],95:[2,96],96:[2,96]},{10:[2,99],35:[2,99],41:[2,99],95:[2,99],96:[2,99]},{10:[2,100],35:[2,100],41:[2,100],95:[2,100],96:[2,100],100:[1,159],101:[1,160]},{10:[2,101],35:[2,101],41:[2,101],95:[2,101],96:[2,101],100:[2,101],101:[2,101],103:[1,161],104:[1,162],105:[1,163]},{10:[2,104],35:[2,104],41:[2,104],95:[2,104],96:[2,104],100:[2,104],101:[2,104],103:[2,104],104:[2,104],105:[2,104]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,100:[1,120],101:[1,119],102:164,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,100:[1,120],101:[1,119],102:165,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{10:[2,110],35:[2,110],41:[2,110],95:[2,110],96:[2,110],100:[2,110],101:[2,110],103:[2,110],104:[2,110],105:[2,110]},{10:[2,111],35:[2,111],41:[2,111],95:[2,111],96:[2,111],100:[2,111],101:[2,111],103:[2,111],104:[2,111],105:[2,111]},{10:[2,112],35:[2,112],41:[2,112],95:[2,112],96:[2,112],100:[2,112],101:[2,112],103:[2,112],104:[2,112],105:[2,112]},{10:[2,113],35:[2,113],41:[2,113],95:[2,113],96:[2,113],100:[2,113],101:[2,113],103:[2,113],104:[2,113],105:[2,113]},{10:[2,114],33:[1,150],35:[2,114],41:[2,114],84:[1,33],95:[2,114],96:[2,114],100:[2,114],101:[2,114],103:[2,114],104:[2,114],105:[2,114]},{48:166,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{10:[2,116],35:[2,116],41:[2,116],95:[2,116],96:[2,116],100:[2,116],101:[2,116],103:[2,116],104:[2,116],105:[2,116]},{10:[2,117],35:[2,117],41:[2,117],95:[2,117],96:[2,117],100:[2,117],101:[2,117],103:[2,117],104:[2,117],105:[2,117]},{10:[2,118],35:[2,118],41:[2,118],95:[2,118],96:[2,118],100:[2,118],101:[2,118],103:[2,118],104:[2,118],105:[2,118]},{10:[2,119],35:[2,119],41:[2,119],95:[2,119],96:[2,119],100:[2,119],101:[2,119],103:[2,119],104:[2,119],105:[2,119]},{10:[2,120],35:[2,120],41:[2,120],95:[2,120],96:[2,120],100:[2,120],101:[2,120],103:[2,120],104:[2,120],105:[2,120]},{10:[2,121],35:[2,121],41:[2,121],95:[2,121],96:[2,121],100:[2,121],101:[2,121],103:[2,121],104:[2,121],105:[2,121]},{10:[2,122],35:[2,122],41:[2,122],95:[2,122],96:[2,122],100:[2,122],101:[2,122],103:[2,122],104:[2,122],105:[2,122]},{10:[2,123],35:[2,123],41:[2,123],95:[2,123],96:[2,123],100:[2,123],101:[2,123],103:[2,123],104:[2,123],105:[2,123]},{10:[2,130],35:[2,130],41:[2,130],95:[2,130],96:[2,130],100:[2,130],101:[2,130],103:[2,130],104:[2,130],105:[2,130]},{10:[2,131],35:[2,131],41:[2,131],95:[2,131],96:[2,131],100:[2,131],101:[2,131],103:[2,131],104:[2,131],105:[2,131]},{10:[2,133],35:[2,133],41:[2,133],95:[2,133],96:[2,133],100:[2,133],101:[2,133],103:[2,133],104:[2,133],105:[2,133]},{10:[2,128],35:[2,128],41:[2,128],95:[2,128],96:[2,128],100:[2,128],101:[2,128],103:[2,128],104:[2,128],105:[2,128]},{10:[2,129],35:[2,129],41:[2,129],95:[2,129],96:[2,129],100:[2,129],101:[2,129],103:[2,129],104:[2,129],105:[2,129]},{10:[2,134],35:[2,134],41:[2,134],95:[2,134],96:[2,134],100:[2,134],101:[2,134],103:[2,134],104:[2,134],105:[2,134]},{10:[2,132],35:[2,132],41:[2,132],95:[2,132],96:[2,132],100:[2,132],101:[2,132],103:[2,132],104:[2,132],105:[2,132]},{9:[2,52],10:[2,52],18:[2,52],19:[2,52],21:[2,52],50:[2,52],53:[2,52],54:[2,52],55:[2,52],56:[2,52],57:[2,52],58:[2,52],59:[2,52],71:[2,52],73:[2,52],78:[2,52]},{9:[2,54],10:[2,54],19:[2,54],21:[2,54],50:[2,54],53:[2,54],54:[2,54],55:[2,54],56:[2,54],57:[2,54],58:[2,54],59:[2,54],71:[2,54],78:[2,54]},{9:[2,57],10:[2,57],19:[2,57],21:[2,57],50:[2,57],53:[2,57],54:[2,57],55:[2,57],56:[2,57],57:[2,57],58:[2,57],59:[2,57],71:[2,57],78:[2,57]},{10:[2,58],41:[1,72]},{9:[1,24],13:125,33:[1,126],35:[2,90],47:167,81:128,82:22,83:23,86:107,88:108,89:109,90:110,91:111,92:112,93:113,94:114,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],35:[2,90],47:168,81:128,82:22,83:23,86:107,88:108,89:109,90:110,91:111,92:112,93:113,94:114,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[2,75],10:[2,75],19:[2,75],21:[2,75],50:[2,75],53:[2,75],54:[2,75],55:[2,75],56:[2,75],57:[2,75],58:[2,75],59:[2,75],71:[2,75],73:[2,75],78:[2,75]},{9:[1,24],10:[2,90],13:125,33:[1,126],81:128,82:22,83:23,86:169,88:108,89:109,90:110,91:111,92:112,93:113,94:114,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],35:[1,170],41:[2,90],47:172,81:128,82:22,83:23,86:107,88:108,89:109,90:110,91:111,92:112,93:113,94:114,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,117:171,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{19:[2,26]},{33:[1,73]},{19:[2,27]},{38:[1,173]},{26:104,39:174,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{35:[2,31]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,94:175,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,94:176,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,99:177,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,99:178,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,100:[1,120],101:[1,119],102:179,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,100:[1,120],101:[1,119],102:180,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,100:[1,120],101:[1,119],102:181,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{10:[2,108],35:[2,108],41:[2,108],95:[2,108],96:[2,108],100:[2,108],101:[2,108],103:[2,108],104:[2,108],105:[2,108]},{10:[2,109],35:[2,109],41:[2,109],95:[2,109],96:[2,109],100:[2,109],101:[2,109],103:[2,109],104:[2,109],105:[2,109]},{35:[1,182]},{35:[1,183]},{35:[1,184]},{10:[2,82]},{10:[2,124],35:[2,124],41:[2,124],95:[2,124],96:[2,124],100:[2,124],101:[2,124],103:[2,124],104:[2,124],105:[2,124]},{35:[1,185],41:[1,186]},{35:[2,126],41:[2,126]},{9:[1,187]},{35:[2,30]},{10:[2,97],35:[2,97],41:[2,97],95:[2,97],96:[2,97]},{10:[2,98],35:[2,98],41:[2,98],95:[2,98],96:[2,98]},{10:[2,102],35:[2,102],41:[2,102],95:[2,102],96:[2,102],100:[2,102],101:[2,102],103:[1,161],104:[1,162],105:[1,163]},{10:[2,103],35:[2,103],41:[2,103],95:[2,103],96:[2,103],100:[2,103],101:[2,103],103:[1,161],104:[1,162],105:[1,163]},{10:[2,105],35:[2,105],41:[2,105],95:[2,105],96:[2,105],100:[2,105],101:[2,105],103:[2,105],104:[2,105],105:[2,105]},{10:[2,106],35:[2,106],41:[2,106],95:[2,106],96:[2,106],100:[2,106],101:[2,106],103:[2,106],104:[2,106],105:[2,106]},{10:[2,107],35:[2,107],41:[2,107],95:[2,107],96:[2,107],100:[2,107],101:[2,107],103:[2,107],104:[2,107],105:[2,107]},{9:[1,24],13:125,33:[1,126],81:128,82:22,83:23,100:[1,120],101:[1,119],102:188,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{9:[1,24],10:[1,91],13:96,19:[1,69],43:86,63:190,65:191,66:82,67:83,68:84,69:87,70:88,71:[1,89],72:189,74:[1,192],75:[1,193],76:[1,194],77:[1,195],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{9:[1,24],10:[1,91],13:96,19:[1,69],43:86,63:196,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{10:[2,125],35:[2,125],41:[2,125],95:[2,125],96:[2,125],100:[2,125],101:[2,125],103:[2,125],104:[2,125],105:[2,125]},{9:[1,24],13:125,33:[1,126],35:[2,90],41:[2,90],47:197,81:128,82:22,83:23,86:107,88:108,89:109,90:110,91:111,92:112,93:113,94:114,97:115,98:116,99:117,100:[1,120],101:[1,119],102:118,106:121,107:122,108:123,109:124,110:127,111:129,112:130,113:131,114:132,115:133,116:134,118:[1,138],119:[1,139],120:[1,135],121:[1,136],122:[1,141],123:[1,137],124:[1,140]},{35:[1,198]},{10:[2,115],35:[2,115],41:[2,115],95:[2,115],96:[2,115],100:[2,115],101:[2,115],103:[2,115],104:[2,115],105:[2,115]},{73:[1,199]},{9:[2,66],10:[2,66],19:[2,66],21:[2,66],50:[2,66],53:[2,66],54:[2,66],55:[2,66],56:[2,66],57:[2,66],58:[2,66],59:[2,66],71:[2,66],78:[2,66]},{9:[2,68],10:[2,68],19:[2,68],21:[2,68],50:[2,68],53:[2,68],54:[2,68],55:[2,68],56:[2,68],57:[2,68],58:[2,68],59:[2,68],71:[2,68],73:[2,68],78:[2,68]},{73:[2,69]},{73:[2,70]},{73:[2,71]},{73:[2,72]},{9:[2,73],10:[2,73],19:[2,73],21:[2,73],50:[2,73],53:[2,73],54:[2,73],55:[2,73],56:[2,73],57:[2,73],58:[2,73],59:[2,73],71:[2,73],78:[2,73]},{35:[2,127],41:[2,127]},{19:[2,28]},{9:[1,24],10:[1,91],13:96,19:[1,69],43:86,63:200,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{9:[2,67],10:[2,67],19:[2,67],21:[2,67],50:[2,67],53:[2,67],54:[2,67],55:[2,67],56:[2,67],57:[2,67],58:[2,67],59:[2,67],71:[2,67],78:[2,67]}],
defaultActions: {2:[2,1],8:[2,13],10:[2,14],13:[2,2],16:[2,3],19:[2,4],27:[2,5],29:[2,6],30:[2,7],34:[2,15],37:[2,8],46:[2,39],59:[2,16],60:[2,17],63:[2,25],93:[2,76],94:[2,77],102:[2,29],151:[2,26],153:[2,27],156:[2,31],169:[2,82],174:[2,30],192:[2,69],193:[2,70],194:[2,71],195:[2,72],198:[2,28]},
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
case 18:return 71;
break;
case 19:return 73;
break;
case 20:return 78;
break;
case 21:return 118;
break;
case 22:return 119;
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
case 28:return 56;
break;
case 29:return 57;
break;
case 30:return 58;
break;
case 31:return 59;
break;
case 32:return 36;
break;
case 33:return 95;
break;
case 34:return 96;
break;
case 35:return 45;
break;
case 36:return 100;
break;
case 37:return 101;
break;
case 38:return 103;
break;
case 39:return 104;
break;
case 40:return 105;
break;
case 41:return 122;
break;
case 42:return 9; /* Varying form */
break;
case 43:return 123;
break;
case 44:return 120;
break;
case 45:return 124;
break;
case 46:return 121;
break;
case 47:return 84;
break;
case 48:return 4;
break;
case 49:return 'INVALID';
break;
}
};
lexer.rules = [/^\/\/.*/,/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^\[/,/^\]/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^if\b/,/^else\b/,/^while\b/,/^true\b/,/^false\b/,/^class\b/,/^boolean\b/,/^byte\b/,/^short\b/,/^int\b/,/^long\b/,/^char\b/,/^float\b/,/^double\b/,/^String\b/,/^==/,/^!=/,/^=/,/^\+/,/^-/,/^\*/,/^\//,/^%/,/^null\b/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^((0|[1-9][0-9]*)\.(0|[1-9][0-9]*)?([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|\.(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD])(?=([^\w]|$))/,/^(0|[1-9][0-9]*)[lL]?\b\b/,/^".*"/,/^'.'/,/^\./,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"inclusive":true}};return lexer;})()
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