/* description: Parses end executes Vava. */

/* lexical grammar */
%lex

D                 [0-9]
NZ                [1-9]
Ds                ("0"|{NZ}{D}*)
EXPO              ([Ee][+-]?{Ds})

%%

"//".*                {/* skip comments */}
"/*"(.|\n)*"*/"       {/* skip comments */}
\s+                   {/* skip whitespace */}

"{"                   {return 'EMBRACE'; /* Basic Syntax */}
"}"                   {return 'UNBRACE';}
"("                   {return 'LEFT_PAREN';}
")"                   {return 'RIGHT_PAREN';}
"["                   {return 'LEFT_BRACKET';}
"]"                   {return 'RIGHT_BRACKET';}
","                   {return 'COMMA';}
"?"                   {return 'QUESTION_MARK';}
":"                   {return 'COLON';}
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
"else"                {return 'KEYWORD_ELSE';}
"while"               {return 'KEYWORD_WHILE';}
"do"                  {return 'KEYWORD_DO';}
"for"                 {return 'KEYWORD_FOR';}
"true"                {return 'TRUE_LITERAL';}
"false"               {return 'FALSE_LITERAL';}

"class"               {return 'KEYWORD_CLASS';}


"boolean"             {return 'PRIMITIVE_BOOLEAN';}
"byte"                {return 'PRIMITIVE_BYTE';}
"short"               {return 'PRIMITIVE_SHORT';}
"int"                 {return 'PRIMITIVE_INTEGER';}
"long"                {return 'PRIMITIVE_LONG';}
"char"                {return 'PRIMITIVE_CHAR';}
"float"               {return 'PRIMITIVE_FLOAT';}
"double"              {return 'PRIMITIVE_DOUBLE';}
"String"              {return 'STRING_TYPE';}


"<<"                  {return 'OPERATOR_LEFTSHIFT';}
">>>"                 {return 'OPERATOR_ZEROFILL_RIGHTSHIFT';}
">>"                  {return 'OPERATOR_RIGHTSHIFT';}
"<="                  {return 'OPERATOR_LESS_THAN_EQUAL';}
"<"                   {return 'OPERATOR_LESS_THAN';}
"=="                  {return 'OPERATOR_EQUAL';}
">="                  {return 'OPERATOR_GREATER_THAN_EQUAL';}
">"                   {return 'OPERATOR_GREATER_THAN';}
"!="                  {return 'OPERATOR_NOT_EQUAL';}
"instanceof"          {return 'OPERATOR_INSTANCEOF';}
"||"                  {return 'OPERATOR_LOGICAL_OR';}
"|"                   {return 'OPERATOR_INCLUSIVE_OR';}
"^"                   {return 'OPERATOR_XOR';}
"&&"                  {return 'OPERATOR_LOGICAL_AND';}
"&"                   {return 'OPERATOR_INCLUSIVE_AND';}
"~"                   {return 'OPERATOR_BITWISE_NEGATION';}
"!"                   {return 'OPERATOR_NEGATION';}
"="                   {return 'OPERATOR_ASSIGNMENT';}
"++"                  {return 'OPERATOR_INCREMENT';}
"+"                   {return 'OPERATOR_ADDITION';}
"--"                  {return 'OPERATOR_DECREMENT';}
"-"                   {return 'OPERATOR_SUBTRACTION';}
"*"                   {return 'OPERATOR_MULTIPLICATION';}
"/"                   {return 'OPERATOR_DIVISON';}
"%"                   {return 'OPERATOR_MODULO';}

"null"                {return 'NULL_LITERAL';}

[a-zA-Z][a-zA-Z0-9_]* {return 'IDENTIFIER'; /* Varying form */}
({Ds}"."{Ds}?{EXPO}?[fFdD]?|"."{Ds}{EXPO}?[fFdD]?|{Ds}{EXPO}[fFdD]?|{Ds}{EXPO}?[fFdD])/([^\w]|$)   {return 'FLOATING_POINT_LITERAL';}
{Ds}[lL]?\b           {return 'DECIMAL_INTEGER_LITERAL';}
"\"".*"\""            {return 'STRING_LITERAL';}
"'"."'"               {return 'CHAR_LITERAL';}

"."                   {return 'SEPARATOR_DOT';}

<<EOF>>               {return 'EOF';}
.                     {return 'INVALID';}

/lex
/**
postfix expr++ expr--
unary ++expr --expr +expr -expr ~ !
multiplicative  * / %
additive  + -
shift << >> >>>
relational  < > <= >= instanceof
equality  == !=
bitwise AND &
bitwise exclusive OR  ^
bitwise inclusive OR  |
logical AND &&
logical OR  ||
ternary ? :
assignment  = += -= *= /= %= &= ^= |= <<= >>= >>>=
*/
%right OPERATOR_ASSIGNMENT
%right TERNARY
%left OPERATOR_LOGICAL_OR
%left OPERATOR_LOGICAL_AND
%left OPERATOR_INCLUSIVE_OR
%left OPERATOR_XOR
%left OPERATOR_INCLUSIVE_AND
%left OPERATOR_EQUAL OPERATOR_NOT_EQUAL
%left OPERATOR_LESS_THAN OPERATOR_GREATER_THAN OPERATOR_LESS_THAN_EQUAL OPERATOR_GREATER_THAN_EQUAL OPERATOR_INSTANCEOF
%left OPERATOR_LEFTSHIFT OPERATOR_RIGHTSHIFT OPERATOR_ZEROFILL_RIGHTSHIFT
%left OPERATOR_ADDITION OPERATOR_SUBTRACTION
%left OPERATOR_MULTIPLICATION OPERATOR_DIVISION OPERATOR_MODULO
%right PRE_INCREMENT PRE_DECREMENT U_PLUS U_MINUS OPERATOR_BITWISE_NEGATION OPERATOR_NEGATION
%right POST_INCREMENT POST_DECREMENT

%start compilation_unit

%% /* language grammar */

/*** ROOT ***/

compilation_unit
  : EOF
    { return new yy.CompilationUnit(); }
  | package_declaration EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; return cu; }
  | import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.appendChild($1); return cu; }
  | type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.appendChild($1); return cu; }
  | package_declaration import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.appendChild($2); return cu; }
  | package_declaration type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.appendChild($2); return cu; }
  | import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.appendChild($1); cu.appendChild($2); return cu; }
  | package_declaration import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.appendChild($2); cu.appendChild($3); return cu; }
  ;

/*** 19.3 Lexical Structure ***/

literal
  : integer_literal
    { $$ = $1; }
  | character_literal
    { $$ = $1; }
  | floating_point_literal
    { $$ = $1; }
  | boolean_literal
    { $$ = $1; }
  | string_literal
    { $$ = $1; }
  | null_literal
    { $$ = $1; }
  ;

integer_literal
  : DECIMAL_INTEGER_LITERAL
    { $$ = new yy.IntegerLiteral($1, @1); }
  ;

floating_point_literal
  : FLOATING_POINT_LITERAL
    { $$ = new yy.FloatingPointLiteral($1, @1); }
  ;

boolean_literal
  : TRUE_LITERAL
    { $$ = new yy.BooleanLiteral($1, @1); }
  | FALSE_LITERAL
    { $$ = new yy.BooleanLiteral($1, @1); }
  ;

character_literal
  : CHAR_LITERAL
    { $$ = new yy.CharLiteral($1, @1); }
  ;

string_literal
  : STRING_LITERAL
    { $$ = new yy.StringLiteral($1, @1); }
  ;

null_literal
  : NULL_LITERAL
    { $$ = new yy.NullLiteral($1, @1); }
  ;


/*** COMPILATION UNIT ***/

package_declaration
  : KEYWORD_PACKAGE IDENTIFIER LINE_TERMINATOR
    { $$ = $2; }
  ;

import_declarations
  : import_declaration
    { $$ = new yy.ImportDeclarations($1, @1); }
  | import_declarations import_declaration
    { $1.appendChild($2); $$ = $1; }
  ;

import_declaration
  : KEYWORD_IMPORT name LINE_TERMINATOR
    { $$ = new yy.ImportDeclaration($2, @$); }
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
    { $$ = new yy.ClassDeclaration($2, $3, @$); }
  | MODIFIER_PUBLIC KEYWORD_CLASS IDENTIFIER class_body
    { $$ = new yy.ClassDeclaration($3, $4, @$); }
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
    { $$ = new yy.FieldDeclaration($1, $2, @$); }
  ;

method_declaration
  : method_header method_body
    { $$ = new yy.MethodDeclaration($1, $2, @$); }
  ;

/*** METHOD DECLARATIONS ***/

/* TODO Modifiers_{opt} Type MethodDeclarator Throws_{opt}
        Modifiers_{opt} void MethodDeclarator Throws_{opt}
*/
method_header
  : type method_declarator
    %{ $$ = yy.utils.merge({vavaType: $1}, $2); %}
  // TODO Specialty item
  | MODIFIER_PUBLIC MODIFIER_STATIC MODIFIER_VOID method_declarator
    %{ $$ = yy.utils.merge({vavaType: $3}, $4); %}
  ;

method_declarator
  : IDENTIFIER LEFT_PAREN formal_parameter_list RIGHT_PAREN
    %{ $$ = {vavaIdentifier: $1, vavaFormalParameters: $3}; %}
  | IDENTIFIER LEFT_PAREN STRING_TYPE LEFT_BRACKET RIGHT_BRACKET IDENTIFIER RIGHT_PAREN
    %{ $$ = {vavaIdentifier: $1, vavaFormalParameters: []}; %}
  ;

formal_parameter_list
  : formal_parameter
    { $$ = [$1]; }
  | formal_parameters COMMA formal_parameter
    { $$ = $1; $$.push($3); }
  ;

formal_parameter
  : type variable_declarator_id
    { $$ = new yy.FormalParameter($1, $2, @$); }
  ;

method_body
  : block
    { $$ = $1; }
  ;

/*** VARIABLE DECLARATORS ***/

variable_declarators
  : variable_declarator
    { $$ = new yy.VariableDeclarators($1, @1); }
  | variable_declarators COMMA variable_declarator
    { $1.appendChild($3); $$ = $1; }
  ;

variable_declarator
  : variable_declarator_id
    { $$ = new yy.VariableDeclarator($1, @1); }
  | variable_declarator_id OPERATOR_ASSIGNMENT variable_initializer
    { $$ = new yy.VariableDeclarator($1, $3, @$); }
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
  : PRIMITIVE_BYTE
    { $$ = $1; }
  | PRIMITIVE_SHORT
    { $$ = $1; }
  | PRIMITIVE_INTEGER
    { $$ = $1; }
  | PRIMITIVE_LONG
    { $$ = $1; }
  | PRIMITIVE_CHAR
    { $$ = $1; }
  ;

floating_point_type
  : PRIMITIVE_FLOAT
    { $$ = $1; }
  | PRIMITIVE_DOUBLE
    { $$ = $1; }
  ;

/*** 19.11 BLOCKS AND STATEMENTS ***/

block
  : EMBRACE UNBRACE
    { $$ = new yy.Block(@$); }
  | EMBRACE block_statements UNBRACE
    { $$ = new yy.Block($2, @$); }
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

local_variable_declaration
  : type variable_declarators
    { $$ = new yy.LocalVariableDeclaration($1, $2, @$); }
  ;

/*** STATEMENTS ***/

statement
  : statement_without_trailing_substatement
    { $$ = $1; }
  // TODO labeled_statement
  | if_then_statement
    { $$ = $1; }
  | if_then_else_statement
    { $$ = $1; }
  | while_statement
    { $$ = $1; }
  | for_statement
    { $$ = $1; }
  ;

statement_no_short_if
  : statement_without_trailing_substatement
    { $$ = $1; }
  | labeled_statement_no_short_if
    { $$ = $1; }
  | if_then_else_statement_no_short_if
    { $$ = $1; }
  | while_statement_no_short_if
    { $$ = $1; }
  | for_statement_no_short_if
    { $$ = $1; }
  ;

statement_without_trailing_substatement
  : block
    { $$ = $1; }
  | empty_statement
    { $$ = $1; }
  | expression_statement
    { $$ = $1; }
  // TODO switch_statement
  | do_statement
    { $$ = $1; }
  // TODO break_statement
  // TODO continue_statement
  // TODO return_statement
  // TODO throw_statement
  // TODO try_statement
  ;

empty_statement
  : LINE_TERMINATOR
    { $$ = new yy.ASTNode(); }
  ;

expression_statement
  : statement_expression LINE_TERMINATOR
    { $$ = new yy.ExpressionStatement($1, @1); }
  ;

statement_expression
  : assignment
    { $$ = $1; }
  | pre_increment_expression
    { $$ = $1; }
  | pre_decrement_expression
    { $$ = $1; }
  | post_increment_expression
    { $$ = $1; }
  | post_decrement_expression
    { $$ = $1; }
  | method_invocation
    { $$ = $1; }
  // TODO class_instance_creation_expression
  ;

/*** CONTROL STRUCTURES: BRANCHING ***/

if_then_statement
  : KEYWORD_IF LEFT_PAREN expression RIGHT_PAREN statement
    { $$ = new yy.IfThen($3, $5, @$); }
  ;

if_then_else_statement
  : KEYWORD_IF LEFT_PAREN expression RIGHT_PAREN statement_no_short_if KEYWORD_ELSE statement
    { $$ = new yy.IfThenElse($3, $5, $7, @$); }
  ;

if_then_else_statement_no_short_if
  : KEYWORD_IF LEFT_PAREN expression RIGHT_PAREN statement_no_short_if KEYWORD_ELSE statement_no_short_if
    { $$ = new yy.IfThenElse($3, $5, $7, @$); }
  ;

/*** CONTROL STRUCTURES: LOOPS ***/

while_statement
  : KEYWORD_WHILE LEFT_PAREN expression RIGHT_PAREN statement
    { $$ = new yy.WhileLoop($3, $5, @$); }
  ;

while_statement_no_short_if
  : KEYWORD_WHILE LEFT_PAREN expression RIGHT_PAREN statement_no_short_if
    { $$ = new yy.WhileLoop($3, $5, @$); }
  ;
do_statement
  : KEYWORD_DO statement KEYWORD_WHILE LEFT_PAREN expression RIGHT_PAREN LINE_TERMINATOR
    { $$ = new yy.DoWhileLoop($2, $5, @$); }
  ;

for_statement
  : KEYWORD_FOR LEFT_PAREN for_init LINE_TERMINATOR expression LINE_TERMINATOR for_update RIGHT_PAREN statement
    { $$ = new yy.ForLoop($3, $5, $7, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN for_init LINE_TERMINATOR expression LINE_TERMINATOR RIGHT_PAREN statement
    { $$ = new yy.ForLoop($3, $5, null, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN for_init LINE_TERMINATOR LINE_TERMINATOR for_update RIGHT_PAREN statement
    { $$ = new yy.ForLoop($3, null, $7, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN for_init LINE_TERMINATOR LINE_TERMINATOR RIGHT_PAREN statement
    { $$ = new yy.ForLoop($3, null, null, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN LINE_TERMINATOR expression LINE_TERMINATOR for_update RIGHT_PAREN statement
    { $$ = new yy.ForLoop(null, $5, $7, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN LINE_TERMINATOR expression LINE_TERMINATOR RIGHT_PAREN statement
    { $$ = new yy.ForLoop(null, $5, null, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN LINE_TERMINATOR LINE_TERMINATOR for_update RIGHT_PAREN statement
    { $$ = new yy.ForLoop(null, null, $7, $8, @$); }
  | KEYWORD_FOR LEFT_PAREN LINE_TERMINATOR LINE_TERMINATOR RIGHT_PAREN statement
    { $$ = new yy.ForLoop(null, null, null, $8, @$); }
  ;

for_init
  : statement_expression_list
    { $$ = $1; }
  | local_variable_declaration
    { $$ = $1; }
  ;

for_update
  : statement_expression_list
    { $$ = $1; }
  ;

statement_expression_list
  : statement_expression
    { $$ = new yy.StatementExpressionList($1); }
  | statement_expression_list COMMA statement_expression
    { $1.appendChild($3); $$ = $1; }
  ;

/*** NAMES ***/

name
  : simple_name
    { $$ = $1; }
  | qualified_name
    { $$ = $1; }
  ;

simple_name
  : IDENTIFIER
    { $$ = new yy.Name($1, @1); }
  ;

qualified_name
  // TODO OMG Hacks
  : name SEPARATOR_DOT IDENTIFIER
    { $$ = new yy.Name($1.qualified() + '.' + $3, @$); }
  ;

/*** 19.12 EXPRESSIONS ***/

primary
  : primary_no_new_array
    { $$ = $1; }
  ;

primary_no_new_array
  : literal
    { $$ = $1; }
  | LEFT_PAREN expression RIGHT_PAREN
    { $$ = $2; }
  | method_invocation
    { $$ = $1; }
  ;

argument_list
  : expression
    { $$ = new yy.ArgumentList($1, @1); }
  | argument_list COMMA expression
    { $1.appendChild($3); $$ = $1; }
  ;

method_invocation
  : name LEFT_PAREN RIGHT_PAREN
    { $$ = new yy.MethodInvocation($1, @$); }
  | name LEFT_PAREN argument_list RIGHT_PAREN
    { $$ = new yy.MethodInvocation($1, $3, @$); }
  ;

postfix_expression
  : primary
    { $$ = $1; }
  | name
    { $$ = $1; }
  | post_increment_expression
    { $$ = $1; }
  | post_decrement_expression
    { $$ = $1; }
  ;

post_increment_expression
  : postfix_expression OPERATOR_INCREMENT %prec POST_INCREMENT
    { $$ = new yy.PostIncrement($1, @2); }
  ;

post_decrement_expression
  : postfix_expression OPERATOR_DECREMENT %prec POST_DECREMENT
    { $$ = new yy.PostDecrement($1, @2); }
  ;

unary_expression
  : pre_increment_expression
    { $$ = $1; }
  | pre_decrement_expression
    { $$ = $1; }
  | OPERATOR_SUBTRACTION unary_expression %prec U_MINUS
    { $$ = new yy.UnaryMinus($2, @1); }
  | OPERATOR_ADDITION unary_expression %prec U_PLUS
    { $$ = new yy.UnaryPlus($2, @1); }
  | unary_expression_not_plus_minus
    { $$ = $1; }
  ;

pre_increment_expression
  : OPERATOR_INCREMENT unary_expression %prec PRE_INCREMENT
    { $$ = new yy.PreIncrement($2, @1); }
  ;

pre_decrement_expression
  : OPERATOR_DECREMENT unary_expression %prec PRE_DECREMENT
    { $$ = new yy.PreDecrement($2, @1); }
  ;

unary_expression_not_plus_minus
  : postfix_expression
    { $$ = $1; }
  | OPERATOR_BITWISE_NEGATION unary_expression
    { $$ = new yy.BitwiseNegation($2, @1); }
  | OPERATOR_NEGATION unary_expression
    { $$ = new yy.Negation($2, @1); }
  | cast_expression
    { $$ = $1; }
  ;

/*
CastExpression:
  ( PrimitiveType Dims_opt ) UnaryExpression
  ( Expression ) UnaryExpressionNotPlusMinus
  ( Name Dims ) UnaryExpressionNotPlusMinus
*/
cast_expression
  : LEFT_PAREN primitive_type RIGHT_PAREN unary_expression
    { $$ = new yy.CastExpression($2, $4, @4); }
  ;

multiplicative_expression
  : unary_expression
    { $$ = $1; }
  | multiplicative_expression OPERATOR_MULTIPLICATION unary_expression
    { $$ = new yy.Multiplication($1, $3, @2); }
  | multiplicative_expression OPERATOR_DIVISON unary_expression
    { $$ = new yy.Division($1, $3, @2); }
  | multiplicative_expression OPERATOR_MODULO unary_expression
    { $$ = new yy.Modulo($1, $3, @2); }
  ;

additive_expression
  : multiplicative_expression
    { $$ = $1; }
  | additive_expression OPERATOR_ADDITION multiplicative_expression
    { $$ = new yy.Addition($1, $3, @2); }
  | additive_expression OPERATOR_SUBTRACTION multiplicative_expression
    { $$ = new yy.Subtraction($1, $3, @2); }
  ;

shift_expression
  : additive_expression
    { $$ = $1; }
  | shift_expression OPERATOR_LEFTSHIFT additive_expression
    { $$ = new yy.LeftShift($1, $3, @2); }
  | shift_expression OPERATOR_RIGHTSHIFT additive_expression
    { $$ = new yy.RightShift($1, $3, @2); }
  | shift_expression OPERATOR_ZEROFILL_RIGHTSHIFT additive_expression
    { $$ = new yy.ZeroFillRightShift($1, $3, @2); }
  ;

relational_expression
  : shift_expression
    { $$ = $1; }
  | relational_expression OPERATOR_LESS_THAN shift_expression
    { $$ = new yy.LessThan($1, $3, @2); }
  | relational_expression OPERATOR_LESS_THAN_EQUAL shift_expression
    { $$ = new yy.LogicalOr(new yy.LessThan($1, $3, @2), new yy.Equals($1, $3, @2), @2); }
  | relational_expression OPERATOR_GREATER_THAN shift_expression
    { $$ = new yy.GreaterThan($1, $3, @2); }
  | relational_expression OPERATOR_GREATER_THAN_EQUAL shift_expression
    { $$ = new yy.LogicalOr(new yy.GreaterThan($1, $3, @2), new yy.Equals($1, $3, @2), @2); }
  ;

equality_expression
  : relational_expression
    { $$ = $1; }
  | equality_expression OPERATOR_EQUAL relational_expression
    { $$ = new yy.Equals($1, $3, @2); }
  | equality_expression OPERATOR_NOT_EQUAL relational_expression
    { $$ = new yy.NotEquals($1, $3, @2); }
  ;

and_expression
  : equality_expression
    { $$ = $1; }
  | and_expression OPERATOR_INCLUSIVE_AND equality_expression
    { $$ = new yy.InclusiveAnd($1, $3, @2); }
  ;

exclusive_or_expression
  : and_expression
    { $$ = $1; }
  | exclusive_or_expression OPERATOR_XOR and_expression
    { $$ = new yy.ExclusiveOr($1, $3, @2); }
  ;

inclusive_or_expression
  : exclusive_or_expression
    { $$ = $1; }
  | inclusive_or_expression OPERATOR_INCLUSIVE_OR exclusive_or_expression
    { $$ = new yy.InclusiveOr($1, $3, @2); }
  ;

conditional_and_expression
  : inclusive_or_expression
    { $$ = $1; }
  | conditional_and_expression OPERATOR_LOGICAL_AND inclusive_or_expression
    { $$ = new yy.LogicalAnd($1, $3, @2); }
  ;

conditional_or_expression
  : conditional_and_expression
    { $$ = $1; }
  | conditional_or_expression OPERATOR_LOGICAL_OR conditional_and_expression
    { $$ = new yy.LogicalOr($1, $3, @2); }
  ;

conditional_expression
  : conditional_or_expression
    { $$ = $1; }
  | conditional_or_expression QUESTION_MARK expression COLON conditional_expression %prec TERNARY
    { $$ = new yy.TernaryOperator($1, $3, $5, @$); }
  ;

assignment_expression
  : conditional_expression
    { $$ = $1; }
  | assignment
    { $$ = $1; }
  ;

assignment
  : name assignment_operator assignment_expression
    { $$ = new yy.Assignment($1, $3, @1); }
  // TODO FieldAccess and ArrayAccess
  ;

assignment_operator
  : OPERATOR_ASSIGNMENT
    { $$ = $1; }
  ;

expression
  : assignment_expression
    { $$ = $1; }
  ;

