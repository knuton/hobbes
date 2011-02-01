/* description: Parses end executes Vava. */

/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}

"{"                   {return 'EMBRACE'; /* Basic Syntax */}
"}"                   {return 'UNBRACE';}
"("                   {return 'LEFT_PAREN';}
")"                   {return 'RIGHT_PAREN';}
","                   {return 'COMMA';}
";"                   {return 'LINE_TERMINATOR';}


"public"              {return 'MODIFIER_PUBLIC'; /* Modifier */}
"private"             {return 'MODIFIER_PRIVATE';}
"protected"           {return 'MODIFIER_PROTECTED';}

"static"              {return 'MODIFIER_STATIC';}
"void"                {return 'MODIFIER_VOID';}
"final"               {return 'MODIFIER_FINAL';}


"package"             {return 'KEYWORD_PACKAGE'; /* Keywords */}
"import"              {return 'KEYWORD_IMPORT';}
"if"                  {return 'KEYWORD_IF';}
"while"               {return 'KEYWORD_WHILE';}
"true"                {return 'TRUE_LITERAL';}
"false"               {return 'FALSE_LITERAL';}

"class"               {return 'KEYWORD_CLASS';}

"void"                {return 'KEYWORD_VOID';}

"boolean"             {return 'PRIMITIVE_BOOLEAN';}
"int"                 {return 'PRIMITIVE_INTEGER';}
"float"               {return 'PRIMITIVE_FLOAT';}


"=="                  {return 'OPERATOR_EQUAL';}
"!="                  {return 'OPERATOR_NOT_EQUAL';}
"="                   {return 'OPERATOR_ASSIGNMENT';}
"+"                   {return 'OPERATOR_ADDITION';}
"-"                   {return 'OPERATOR_SUBTRACTION';}
"*"                   {return 'OPERATOR_MULTIPLICATION';}
"/"                   {return 'OPERATOR_DIVISON';}
"%"                   {return 'OPERATOR_MODULO';}


[a-zA-Z][a-zA-Z0-9_]* {return 'IDENTIFIER'; /* Varying form */}
[0-9]+                {return 'DECIMAL_INTEGER_LITERAL';}
[0-9]+\.[0-9]*        {return 'FLOAT_EXPRESSION';}

<<EOF>>               {return 'EOF';}
.                     {return 'INVALID';}

/lex

%% /* language grammar */

/*** ROOT ***/

compilation_unit
  : EOF
    { return new yy.CompilationUnit(); }
  | package_declaration EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; return cu; }
  | import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaImports = $1; return cu; }
  | type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.appendChild($1); return cu; }
  | package_declaration import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaImports = $2; return cu; }
  | package_declaration type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.appendChild($2); return cu; }
  | import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaImports = $1; cu.appendChild($2); return cu; }
  | package_declaration import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaImports = $2; cu.appendChild($3); return cu; }
  ;

/*** COMPILATION UNIT ***/

package_declaration
  : KEYWORD_PACKAGE IDENTIFIER LINE_TERMINATOR
    { $$ = $2; }
  ;

import_declarations
  : import_declaration
    { $$ = [$1]; }
  | import_declarations import_declaration
    { $1.push($2); $$ = $1; }
  ;

import_declaration
  : KEYWORD_IMPORT IDENTIFIER LINE_TERMINATOR
    { $$ = $2; }
  ;

type_declarations
  : type_declaration
    { $$ = $1; }
  ;

type_declaration
  : class_declaration
    { $$ = $1; }
  ;

/* TODO Modifiers_{opt} class Identifier Super_{opt} Interfaces_{opt} ClassBody */
class_declaration
  : KEYWORD_CLASS IDENTIFIER class_body
    { $$ = new yy.ClassDeclaration($2, $3); }
  ;

/*** CLASS ***/

class_body
  : EMBRACE class_body_declarations UNBRACE
    { $$ = $2; }
  ;

class_body_declarations
  : class_body_declaration
    { $$ = [$1]; }
  | class_body_declarations class_body_declaration
    { $1.push($2); $$ = $1; }
  ;

class_body_declaration
  : class_member_declaration
    { $$ = $1 }
/*  | static_initializer
    { $$ = $1; }
  | constructor_declaration
    { $$ = $1; }*/
  ;

class_member_declaration
  : field_declaration
    { $$ = $1; }
  | method_declaration
    { $$ = $1; }
  ;

/*** CLASS MEMBER DECLARATIONS ***/

field_declaration
  : type variable_declarators LINE_TERMINATOR
    { $$ = new yy.FieldDeclaration($1, $2); }
  ;

method_declaration
  : method_header method_body
    { $$ = new yy.MethodDeclaration($1, $2); }
  ;

/*** METHOD DECLARATIONS ***/

/* TODO Modifiers_{opt} Type MethodDeclarator Throws_{opt}
        Modifiers_{opt} void MethodDeclarator Throws_{opt}
*/
method_header
  : type method_declarator
    %{ $$ = yy.utils.merge({vavaType: $1}, $2); %}
  | KEYWORD_VOID method_declarator
    %{ $$ = yy.utils.merge({vavaType: $1}, $2); %}
  ;

method_declarator
  : IDENTIFIER LEFT_PAREN formal_parameter_list RIGHT_PAREN
    %{ $$ = {vavaIdentifier: $1, vavaFormalParameters: $3}; %}
  ;

formal_parameter_list
  : formal_parameter
    { $$ = [$1]; }
  | formal_parameters COMMA formal_parameter
    { $$ = $1; $$.push($3); }
  ;

formal_parameter
  : type variable_declarator_id
    { $$ = new yy.FormalParameter($1, $2); }
  ;

method_body
  : block
    { $$ = $1; }
  ;

/*** VARIABLE DECLARATORS ***/

variable_declarators
  : variable_declarator
    { $$ = new yy.VariableDeclarators($1); }
  | variable_declarators COMMA variable_declarator
    { $1.appendChild($3); $$ = $1; }
  ;

variable_declarator
  : variable_declarator_id
    { $$ = new yy.VariableDeclarator($1); }
  | variable_declarator_id OPERATOR_ASSIGNMENT variable_initializer
    { $$ = new yy.VariableDeclarator($1, $3); }
  ;

variable_declarator_id
  : IDENTIFIER
    { $$ = $1; }
  ;

variable_initializer
  : expression
    { $$ = $1; }
  ;

/*** TYPE ***/

type
  : primitive_type
    { $$ = $1; }
  ;

primitive_type
  : numeric_type
    { $$ = $1; }
  | PRIMITIVE_BOOLEAN
    { $$ = $1; }
  ;

numeric_type
  : integral_type
    { $$ = $1; }
  | floating_point_type
    { $$ = $1; }
  ;

integral_type
  : PRIMITIVE_INTEGER
    { $$ = $1; }
  ;

floating_point_type
  : PRIMITIVE_FLOAT
    { $$ = $1; }
  ;

/*** BLOCK ***/

block
  : EMBRACE UNBRACE
    { $$ = new yy.Block(); }
  | EMBRACE block_statements UNBRACE
    { $$ = new yy.Block($2); }
  ;

block_statements
  : block_statement
    { $$ = [$1]; }
  | block_statements block_statement
    { $$ = $1; $$.push($2); }
  ;

block_statement
  : local_variable_declaration_statement
    { $$ = $1; }
  | statement
    { $$ = $1; }
  ;

local_variable_declaration_statement
  : local_variable_declaration LINE_TERMINATOR
    { $$ = $1; }
  ;

/* local_variable_declaration_statement */

local_variable_declaration
  : type variable_declarators
    { $$ = new yy.LocalVariableDeclaration($1, $2); }
  ;

/*** STATEMENTS ***/

statement
  : statement_without_trailing_substatement
    { $$ = $1; }
  | if_then_statement
    { $$ = $1; }
  | while_statement
    { $$ = $1; }
  ;

statement_without_trailing_substatement
  : block
    { $$ = $1; }
  | empty_statement
    { $$ = $1; }
  | expression_statement
    { $$ = $1; }
  ;

/*** CONTROL STRUCTURES: BRANCHING ***/

if_then_statement
  : KEYWORD_IF LEFT_PAREN expression RIGHT_PAREN statement
    { $$ = new yy.IfThen($3, $5); }
  ;

/*** CONTROL STRUCTURES: LOOPS ***/

while_statement
  : KEYWORD_WHILE LEFT_PAREN expression RIGHT_PAREN statement
    { $$ = new yy.WhileLoop($3, $5); }
  ;

/* statement_without_trailing_substatement */

empty_statement
  : LINE_TERMINATOR
    { $$ = new yy.ASTNode(); }
  ;

expression_statement
  : statement_expression LINE_TERMINATOR
    { $$ = $1; }
  ;

/* statement_expression */

statement_expression
  : assignment
    { $$ = $1;}
  ;

/*** NAMES ***/

name
  : simple_name
    { $$ = new yy.Name($1); }
  ;

simple_name
  : IDENTIFIER
    { $$ = $1; }
  ;

/*** EXPRESSIONS ***/

assignment
  // TODO Should be assignment_expression
  : left_hand_side OPERATOR_ASSIGNMENT conditional_expression
    { $$ = new yy.Assignment($1, $3); }
  ;

// TODO FieldAccess and ArrayAccess
left_hand_side
  : name
    { $$ = $1; }
  ;

expression
  // TODO Should be assignment_expression
  : conditional_expression
    { $$ = $1; }
  ;

/* assignment_expression */
assignment_expression
  : conditional_expression
    { $$ = $1; }
  | assignment
    { $$ = $1; }
  ;

// TODO Ternary operator
conditional_expression
  : conditional_or_expression
    { $$ = $1; }
  ;

conditional_or_expression
  : conditional_and_expression
    { $$ = $1; }
  | conditional_or_expression || conditional_and_expression
    { $$ = new yy.OrOrExpression($1, $3); }
  ;

conditional_and_expression
  : inclusive_or_expression
    { $$ = $1; }
  ;

inclusive_or_expression
  : exclusive_or_expression
    { $$ = $1; }
  ;

exclusive_or_expression
  : and_expression
    { $$ = $1; }
  ;

and_expression
  : equality_expression
    { $$ = $1; }
  ;

equality_expression
  : relational_expression
    { $$ = $1; }
  | equality_expression OPERATOR_EQUAL relational_expression
    { $$ = new yy.Equals($1, $3); }
  | equality_expression OPERATOR_NOT_EQUAL relational_expression
    { $$ = new yy.NotEquals($1, $3); }
  ;

relational_expression
  : shift_expression
    { $$ = $1; }
  ;

shift_expression
  : additive_expression
    { $$ = $1; }
  ;

additive_expression
  : multiplicative_expression
    { $$ = $1; }
  | additive_expression OPERATOR_ADDITION multiplicative_expression
    { $$ = new yy.Addition($1, $3); }
  | additive_expression OPERATOR_SUBTRACTION multiplicative_expression
    { $$ = new yy.Subtraction($1, $3); }
  ;

multiplicative_expression
  : unary_expression
    { $$ = $1; }
  | multiplicative_expression OPERATOR_MULTIPLICATION unary_expression
    { $$ = new yy.Multiplication($1, $3); }
  | multiplicative_expression OPERATOR_DIVISON unary_expression
    { $$ = new yy.Division($1, $3); }
  | multiplicative_expression OPERATOR_MODULO unary_expression
    { $$ = new yy.Modulo($1, $3); }
  ;

unary_expression
  : postfix_expression
    { $$ = $1; }
  ;

postfix_expression
  : primary
    { $$ = $1; }
  | name
    { $$ = $1; }
  ;

primary
  : literal
    { $$ = $1; }
  ;

literal
  : boolean_literal
    { $$ = $1; }
  | integer_literal
    { $$ = $1; }
  ;

boolean_literal
  : TRUE_LITERAL
    { $$ = new yy.BooleanLiteral($1); }
  | FALSE_LITERAL
    { $$ = new yy.BooleanLiteral($1); }
  ;

integer_literal
 : DECIMAL_INTEGER_LITERAL
   { $$ = new yy.IntegerLiteral($1); }
 ;
