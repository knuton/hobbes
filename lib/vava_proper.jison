/* description: Parses end executes Vava. */

/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}


"{"                   {return 'EMBRACE'; /* Basic Syntax */}
"}"                   {return 'UNBRACE';}
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

"class"               {return 'KEYWORD_CLASS';}


[a-zA-Z][a-zA-Z0-9_]* {return 'IDENTIFIER'; /* Varying form */}
[0-9]+                {return 'INTEGER_EXPRESSION';}
[0-9]+\.[0-9]*        {return 'FLOAT_EXPRESSION';}


"boolean"             {return 'PRIMITIVE_BOOLEAN'; /* Primitive Types */}
"int"                 {return 'PRIMITIVE_INTEGER';}
"float"               {return 'PRIMITIVE_FLOAT';}

"="                   {return 'OPERATOR_ASSIGNMENT';}

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
    { var cu = new yy.CompilationUnit(); cu.children.push($1); return cu; }
  | package_declaration import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaImports = $2; return cu; }
  | package_declaration type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.children.push($2); return cu; }
  | import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaImports = $1; cu.children.push($2); return cu; }
  | package_declaration import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaImports = $2; cu.children.push($3); return cu; }
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
  | static_initializer
    { $$ = $1; }
  | constructor_declaration
    { $$ = $1; }
  ;

class_member_declaration
  : field_declaration
    { $$ = $1; }
  | method_declaration
    { $$ = $1; }
  ;

/*** FIELD DECLARATION ***/

field_declaration
  : type variable_declarators LINE_TERMINATOR
    // ???
    { $2.vavaType = $1; $$ = $2; }
  | INTEGER_EXPRESSION LINE_TERMINATOR
    { $$ = $1; }
  ;

variable_declarators
  : variable_declarator
    { $$ = [$1]; }
  | variable_declarators variable_declarator
    { $1.push($2); $$ = $1; }
  ;

variable_declarator
  : variable_declarator_id OPERATOR_ASSIGNMENT variable_initializer
    %{ $$ = {id: $1, initializer: $2}; %}
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

/*** EXPRESSIONS ***/

expression
  : INTEGER_EXPRESSION
    { $$ = Number(yytext); }
  | FLOAT_EXPRESSION
    { $$ = Number(yytext); }
  ;