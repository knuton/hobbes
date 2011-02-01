/* Jison generated parser */
var vava_proper = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"type_declaration":13,"class_declaration":14,"KEYWORD_CLASS":15,"class_body":16,"EMBRACE":17,"class_body_declarations":18,"UNBRACE":19,"class_body_declaration":20,"class_member_declaration":21,"field_declaration":22,"method_declaration":23,"type":24,"variable_declarators":25,"method_header":26,"method_body":27,"method_declarator":28,"KEYWORD_VOID":29,"LEFT_PAREN":30,"formal_parameter_list":31,"RIGHT_PAREN":32,"formal_parameter":33,"formal_parameters":34,"COMMA":35,"variable_declarator_id":36,"block":37,"variable_declarator":38,"OPERATOR_ASSIGNMENT":39,"variable_initializer":40,"expression":41,"primitive_type":42,"numeric_type":43,"PRIMITIVE_BOOLEAN":44,"integral_type":45,"floating_point_type":46,"PRIMITIVE_INTEGER":47,"PRIMITIVE_FLOAT":48,"block_statements":49,"block_statement":50,"local_variable_declaration_statement":51,"statement":52,"local_variable_declaration":53,"statement_without_trailing_substatement":54,"if_then_statement":55,"while_statement":56,"empty_statement":57,"expression_statement":58,"KEYWORD_IF":59,"KEYWORD_WHILE":60,"statement_expression":61,"assignment":62,"name":63,"simple_name":64,"left_hand_side":65,"conditional_expression":66,"assignment_expression":67,"conditional_or_expression":68,"conditional_and_expression":69,"inclusive_or_expression":70,"exclusive_or_expression":71,"and_expression":72,"equality_expression":73,"relational_expression":74,"OPERATOR_EQUAL":75,"OPERATOR_NOT_EQUAL":76,"shift_expression":77,"additive_expression":78,"multiplicative_expression":79,"OPERATOR_ADDITION":80,"OPERATOR_SUBTRACTION":81,"unary_expression":82,"OPERATOR_MULTIPLICATION":83,"OPERATOR_DIVISON":84,"OPERATOR_MODULO":85,"postfix_expression":86,"primary":87,"literal":88,"boolean_literal":89,"integer_literal":90,"TRUE_LITERAL":91,"FALSE_LITERAL":92,"DECIMAL_INTEGER_LITERAL":93,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",15:"KEYWORD_CLASS",17:"EMBRACE",19:"UNBRACE",29:"KEYWORD_VOID",30:"LEFT_PAREN",32:"RIGHT_PAREN",34:"formal_parameters",35:"COMMA",39:"OPERATOR_ASSIGNMENT",44:"PRIMITIVE_BOOLEAN",47:"PRIMITIVE_INTEGER",48:"PRIMITIVE_FLOAT",59:"KEYWORD_IF",60:"KEYWORD_WHILE",75:"OPERATOR_EQUAL",76:"OPERATOR_NOT_EQUAL",80:"OPERATOR_ADDITION",81:"OPERATOR_SUBTRACTION",83:"OPERATOR_MULTIPLICATION",84:"OPERATOR_DIVISON",85:"OPERATOR_MODULO",91:"TRUE_LITERAL",92:"FALSE_LITERAL",93:"DECIMAL_INTEGER_LITERAL"},
productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[13,1],[14,3],[16,3],[18,1],[18,2],[20,1],[21,1],[21,1],[22,3],[23,2],[26,2],[26,2],[28,4],[31,1],[31,3],[33,2],[27,1],[25,1],[25,3],[38,1],[38,3],[36,1],[40,1],[24,1],[42,1],[42,1],[43,1],[43,1],[45,1],[46,1],[37,2],[37,3],[49,1],[49,2],[50,1],[50,1],[51,2],[53,2],[52,1],[52,1],[52,1],[54,1],[54,1],[54,1],[55,5],[56,5],[57,1],[58,2],[61,1],[63,1],[64,1],[62,3],[65,1],[41,1],[67,1],[67,1],[66,1],[68,1],[68,1],[68,0],[68,1],[69,1],[70,1],[71,1],[72,1],[73,1],[73,3],[73,3],[74,1],[77,1],[78,1],[78,3],[78,3],[79,1],[79,3],[79,3],[79,3],[82,1],[86,1],[86,1],[87,1],[88,1],[88,1],[89,1],[89,1],[90,1]],
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
case 50: this.$ = $$[$0-1]; 
break;
case 51: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
break;
case 52: this.$ = $$[$0]; 
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
case 58: this.$ = new yy.IfThen($$[$0-2], $$[$0]); 
break;
case 59: this.$ = new yy.WhileLoop($$[$0-2], $$[$0]); 
break;
case 60: this.$ = new yy.ASTNode(); 
break;
case 61: this.$ = $$[$0-1]; 
break;
case 62: this.$ = $$[$0];
break;
case 63: this.$ = new yy.Name($$[$0]); 
break;
case 64: this.$ = $$[$0]; 
break;
case 65: this.$ = new yy.Assignment($$[$0-2], $$[$0]); 
break;
case 66: this.$ = $$[$0]; 
break;
case 67: this.$ = $$[$0]; 
break;
case 68: this.$ = $$[$0]; 
break;
case 69: this.$ = $$[$0]; 
break;
case 70: this.$ = $$[$0]; 
break;
case 71: this.$ = $$[$0]; 
break;
case 74: this.$ = new yy.OrOrExpression($$[$0], $$[$02]); 
break;
case 75: this.$ = $$[$0]; 
break;
case 76: this.$ = $$[$0]; 
break;
case 77: this.$ = $$[$0]; 
break;
case 78: this.$ = $$[$0]; 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = new yy.Equals($$[$0-2], $$[$0]); 
break;
case 81: this.$ = new yy.NotEquals($$[$0-2], $$[$0]); 
break;
case 82: this.$ = $$[$0]; 
break;
case 83: this.$ = $$[$0]; 
break;
case 84: this.$ = $$[$0]; 
break;
case 85: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
break;
case 86: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
break;
case 87: this.$ = $$[$0]; 
break;
case 88: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
break;
case 89: this.$ = new yy.Division($$[$0-2], $$[$0]); 
break;
case 90: this.$ = new yy.Modulo($$[$0-2], $$[$0]); 
break;
case 91: this.$ = $$[$0]; 
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
case 97: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 98: this.$ = new yy.BooleanLiteral($$[$0]); 
break;
case 99: this.$ = new yy.IntegerLiteral($$[$0]); 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],13:8,14:10,15:[1,11]},{1:[3]},{1:[2,1]},{4:[1,12],6:13,7:14,11:7,12:[1,9],13:8,14:10,15:[1,11]},{4:[1,15],7:16,11:17,12:[1,9],13:8,14:10,15:[1,11]},{4:[1,18]},{9:[1,19]},{4:[2,10],12:[2,10],15:[2,10]},{4:[2,13]},{9:[1,20]},{4:[2,14]},{9:[1,21]},{1:[2,2]},{4:[1,22],7:23,11:17,12:[1,9],13:8,14:10,15:[1,11]},{4:[1,24]},{1:[2,3]},{4:[1,25]},{4:[2,11],12:[2,11],15:[2,11]},{1:[2,4]},{10:[1,26]},{10:[1,27]},{16:28,17:[1,29]},{1:[2,5]},{4:[1,30]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],15:[2,9]},{4:[2,12],12:[2,12],15:[2,12]},{4:[2,15]},{18:31,20:32,21:33,22:34,23:35,24:36,26:37,29:[1,39],42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{1:[2,8]},{19:[1,46],20:47,21:33,22:34,23:35,24:36,26:37,29:[1,39],42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{19:[2,17],29:[2,17],44:[2,17],47:[2,17],48:[2,17]},{19:[2,19],29:[2,19],44:[2,19],47:[2,19],48:[2,19]},{19:[2,20],29:[2,20],44:[2,20],47:[2,20],48:[2,20]},{19:[2,21],29:[2,21],44:[2,21],47:[2,21],48:[2,21]},{9:[1,51],25:48,28:49,36:52,38:50},{17:[1,55],27:53,37:54},{9:[2,37]},{9:[1,57],28:56},{9:[2,38]},{9:[2,39]},{9:[2,40]},{9:[2,41]},{9:[2,42]},{9:[2,43]},{4:[2,16]},{19:[2,18],29:[2,18],44:[2,18],47:[2,18],48:[2,18]},{10:[1,58],35:[1,59]},{17:[2,24]},{10:[2,31],35:[2,31]},{10:[2,35],30:[1,60],35:[2,35],39:[2,35]},{10:[2,33],35:[2,33],39:[1,61]},{19:[2,23],29:[2,23],44:[2,23],47:[2,23],48:[2,23]},{19:[2,30],29:[2,30],44:[2,30],47:[2,30],48:[2,30]},{9:[1,83],10:[1,77],17:[1,55],19:[1,62],24:71,37:72,42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45],49:63,50:64,51:65,52:66,53:67,54:68,55:69,56:70,57:73,58:74,59:[1,75],60:[1,76],61:78,62:79,63:81,64:82,65:80},{17:[2,25]},{30:[1,60]},{19:[2,22],29:[2,22],44:[2,22],47:[2,22],48:[2,22]},{9:[1,85],36:52,38:84},{24:89,31:86,33:87,34:[1,88],42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{9:[1,83],10:[2,73],35:[2,73],40:90,41:91,63:106,64:82,66:92,68:93,69:94,70:95,71:96,72:97,73:98,74:99,77:100,78:101,79:102,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[2,44],10:[2,44],17:[2,44],19:[2,44],29:[2,44],44:[2,44],47:[2,44],48:[2,44],59:[2,44],60:[2,44]},{9:[1,83],10:[1,77],17:[1,55],19:[1,113],24:71,37:72,42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45],50:114,51:65,52:66,53:67,54:68,55:69,56:70,57:73,58:74,59:[1,75],60:[1,76],61:78,62:79,63:81,64:82,65:80},{9:[2,46],10:[2,46],17:[2,46],19:[2,46],44:[2,46],47:[2,46],48:[2,46],59:[2,46],60:[2,46]},{9:[2,48],10:[2,48],17:[2,48],19:[2,48],44:[2,48],47:[2,48],48:[2,48],59:[2,48],60:[2,48]},{9:[2,49],10:[2,49],17:[2,49],19:[2,49],44:[2,49],47:[2,49],48:[2,49],59:[2,49],60:[2,49]},{10:[1,115]},{9:[2,52],10:[2,52],17:[2,52],19:[2,52],44:[2,52],47:[2,52],48:[2,52],59:[2,52],60:[2,52]},{9:[2,53],10:[2,53],17:[2,53],19:[2,53],44:[2,53],47:[2,53],48:[2,53],59:[2,53],60:[2,53]},{9:[2,54],10:[2,54],17:[2,54],19:[2,54],44:[2,54],47:[2,54],48:[2,54],59:[2,54],60:[2,54]},{9:[1,85],25:116,36:52,38:50},{9:[2,55],10:[2,55],17:[2,55],19:[2,55],44:[2,55],47:[2,55],48:[2,55],59:[2,55],60:[2,55]},{9:[2,56],10:[2,56],17:[2,56],19:[2,56],44:[2,56],47:[2,56],48:[2,56],59:[2,56],60:[2,56]},{9:[2,57],10:[2,57],17:[2,57],19:[2,57],44:[2,57],47:[2,57],48:[2,57],59:[2,57],60:[2,57]},{30:[1,117]},{30:[1,118]},{9:[2,60],10:[2,60],17:[2,60],19:[2,60],44:[2,60],47:[2,60],48:[2,60],59:[2,60],60:[2,60]},{10:[1,119]},{10:[2,62]},{39:[1,120]},{39:[2,66]},{10:[2,63],32:[2,63],35:[2,63],39:[2,63],75:[2,63],76:[2,63],80:[2,63],81:[2,63],83:[2,63],84:[2,63],85:[2,63]},{10:[2,64],32:[2,64],35:[2,64],39:[2,64],75:[2,64],76:[2,64],80:[2,64],81:[2,64],83:[2,64],84:[2,64],85:[2,64]},{10:[2,32],35:[2,32]},{10:[2,35],32:[2,35],35:[2,35],39:[2,35]},{32:[1,121]},{32:[2,27]},{35:[1,122]},{9:[1,85],36:123},{10:[2,34],35:[2,34]},{10:[2,36],35:[2,36]},{10:[2,67],32:[2,67],35:[2,67]},{10:[2,70],32:[2,70],35:[2,70]},{10:[2,71],32:[2,71],35:[2,71]},{10:[2,75],32:[2,75],35:[2,75]},{10:[2,76],32:[2,76],35:[2,76]},{10:[2,77],32:[2,77],35:[2,77]},{10:[2,78],32:[2,78],35:[2,78],75:[1,124],76:[1,125]},{10:[2,79],32:[2,79],35:[2,79],75:[2,79],76:[2,79]},{10:[2,82],32:[2,82],35:[2,82],75:[2,82],76:[2,82]},{10:[2,83],32:[2,83],35:[2,83],75:[2,83],76:[2,83],80:[1,126],81:[1,127]},{10:[2,84],32:[2,84],35:[2,84],75:[2,84],76:[2,84],80:[2,84],81:[2,84],83:[1,128],84:[1,129],85:[1,130]},{10:[2,87],32:[2,87],35:[2,87],75:[2,87],76:[2,87],80:[2,87],81:[2,87],83:[2,87],84:[2,87],85:[2,87]},{10:[2,91],32:[2,91],35:[2,91],75:[2,91],76:[2,91],80:[2,91],81:[2,91],83:[2,91],84:[2,91],85:[2,91]},{10:[2,92],32:[2,92],35:[2,92],75:[2,92],76:[2,92],80:[2,92],81:[2,92],83:[2,92],84:[2,92],85:[2,92]},{10:[2,93],32:[2,93],35:[2,93],75:[2,93],76:[2,93],80:[2,93],81:[2,93],83:[2,93],84:[2,93],85:[2,93]},{10:[2,94],32:[2,94],35:[2,94],75:[2,94],76:[2,94],80:[2,94],81:[2,94],83:[2,94],84:[2,94],85:[2,94]},{10:[2,95],32:[2,95],35:[2,95],75:[2,95],76:[2,95],80:[2,95],81:[2,95],83:[2,95],84:[2,95],85:[2,95]},{10:[2,96],32:[2,96],35:[2,96],75:[2,96],76:[2,96],80:[2,96],81:[2,96],83:[2,96],84:[2,96],85:[2,96]},{10:[2,97],32:[2,97],35:[2,97],75:[2,97],76:[2,97],80:[2,97],81:[2,97],83:[2,97],84:[2,97],85:[2,97]},{10:[2,98],32:[2,98],35:[2,98],75:[2,98],76:[2,98],80:[2,98],81:[2,98],83:[2,98],84:[2,98],85:[2,98]},{10:[2,99],32:[2,99],35:[2,99],75:[2,99],76:[2,99],80:[2,99],81:[2,99],83:[2,99],84:[2,99],85:[2,99]},{9:[2,45],10:[2,45],17:[2,45],19:[2,45],29:[2,45],44:[2,45],47:[2,45],48:[2,45],59:[2,45],60:[2,45]},{9:[2,47],10:[2,47],17:[2,47],19:[2,47],44:[2,47],47:[2,47],48:[2,47],59:[2,47],60:[2,47]},{9:[2,50],10:[2,50],17:[2,50],19:[2,50],44:[2,50],47:[2,50],48:[2,50],59:[2,50],60:[2,50]},{10:[2,51],35:[1,59]},{9:[1,83],32:[2,73],41:131,63:106,64:82,66:92,68:93,69:94,70:95,71:96,72:97,73:98,74:99,77:100,78:101,79:102,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],32:[2,73],41:132,63:106,64:82,66:92,68:93,69:94,70:95,71:96,72:97,73:98,74:99,77:100,78:101,79:102,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[2,61],10:[2,61],17:[2,61],19:[2,61],44:[2,61],47:[2,61],48:[2,61],59:[2,61],60:[2,61]},{9:[1,83],10:[2,73],63:106,64:82,66:133,68:93,69:94,70:95,71:96,72:97,73:98,74:99,77:100,78:101,79:102,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{17:[2,26]},{24:89,33:134,42:38,43:40,44:[1,41],45:42,46:43,47:[1,44],48:[1,45]},{32:[2,29]},{9:[1,83],63:106,64:82,74:135,77:100,78:101,79:102,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],63:106,64:82,74:136,77:100,78:101,79:102,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],63:106,64:82,79:137,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],63:106,64:82,79:138,82:103,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],63:106,64:82,82:139,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],63:106,64:82,82:140,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{9:[1,83],63:106,64:82,82:141,86:104,87:105,88:107,89:108,90:109,91:[1,110],92:[1,111],93:[1,112]},{32:[1,142]},{32:[1,143]},{10:[2,65]},{32:[2,28]},{10:[2,80],32:[2,80],35:[2,80],75:[2,80],76:[2,80]},{10:[2,81],32:[2,81],35:[2,81],75:[2,81],76:[2,81]},{10:[2,85],32:[2,85],35:[2,85],75:[2,85],76:[2,85],80:[2,85],81:[2,85],83:[1,128],84:[1,129],85:[1,130]},{10:[2,86],32:[2,86],35:[2,86],75:[2,86],76:[2,86],80:[2,86],81:[2,86],83:[1,128],84:[1,129],85:[1,130]},{10:[2,88],32:[2,88],35:[2,88],75:[2,88],76:[2,88],80:[2,88],81:[2,88],83:[2,88],84:[2,88],85:[2,88]},{10:[2,89],32:[2,89],35:[2,89],75:[2,89],76:[2,89],80:[2,89],81:[2,89],83:[2,89],84:[2,89],85:[2,89]},{10:[2,90],32:[2,90],35:[2,90],75:[2,90],76:[2,90],80:[2,90],81:[2,90],83:[2,90],84:[2,90],85:[2,90]},{9:[1,83],10:[1,77],17:[1,55],37:72,52:144,54:68,55:69,56:70,57:73,58:74,59:[1,75],60:[1,76],61:78,62:79,63:81,64:82,65:80},{9:[1,83],10:[1,77],17:[1,55],37:72,52:145,54:68,55:69,56:70,57:73,58:74,59:[1,75],60:[1,76],61:78,62:79,63:81,64:82,65:80},{9:[2,58],10:[2,58],17:[2,58],19:[2,58],44:[2,58],47:[2,58],48:[2,58],59:[2,58],60:[2,58]},{9:[2,59],10:[2,59],17:[2,59],19:[2,59],44:[2,59],47:[2,59],48:[2,59],59:[2,59],60:[2,59]}],
defaultActions: {2:[2,1],8:[2,13],10:[2,14],12:[2,2],15:[2,3],18:[2,4],22:[2,5],24:[2,6],25:[2,7],28:[2,15],30:[2,8],38:[2,37],40:[2,38],41:[2,39],42:[2,40],43:[2,41],44:[2,42],45:[2,43],46:[2,16],49:[2,24],56:[2,25],79:[2,62],81:[2,66],87:[2,27],121:[2,26],123:[2,29],133:[2,65],134:[2,28]},
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
case 15:return 59;
break;
case 16:return 60;
break;
case 17:return 91;
break;
case 18:return 92;
break;
case 19:return 15;
break;
case 20:return 29;
break;
case 21:return 44;
break;
case 22:return 47;
break;
case 23:return 48;
break;
case 24:return 75;
break;
case 25:return 76;
break;
case 26:return 39;
break;
case 27:return 80;
break;
case 28:return 81;
break;
case 29:return 83;
break;
case 30:return 84;
break;
case 31:return 85;
break;
case 32:return 9; /* Varying form */
break;
case 33:return 93;
break;
case 34:return 'FLOAT_EXPRESSION';
break;
case 35:return 4;
break;
case 36:return 'INVALID';
break;
}
};
lexer.rules = [/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^if\b/,/^while\b/,/^true\b/,/^false\b/,/^class\b/,/^void\b/,/^boolean\b/,/^int\b/,/^float\b/,/^==/,/^!=/,/^=/,/^\+/,/^-/,/^\*/,/^\//,/^%/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^[0-9]+/,/^[0-9]+.[0-9]*/,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"inclusive":true}};return lexer;})()
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