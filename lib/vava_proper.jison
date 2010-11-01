/* description: Parses end executes Vava. */

/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}

"public"              {return 'MODIFIER_PUBLIC';}
"private"             {return 'MODIFIER_PRIVATE';}
"protected"           {return 'MODIFIER_PROTECTED';}

"package"             {return 'KEYWORD_PACKAGE';}
"import"              {return 'KEYWORD_IMPORT';}

"static"              {return 'MODIFIER_STATIC';}
"void"                {return 'MODIFIER_VOID';}
"final"               {return 'MODIFIER_FINAL';}

"class"               {return 'KEYWORD_CLASS';}

[a-zA-Z][a-zA-Z0-9_]* {return 'IDENTIFIER';}

";"                   {return 'LINE_TERMINATOR';}
<<EOF>>               {return 'EOF';}
.                     {return 'INVALID';}

/lex

%% /* language grammar */

compilation_unit
  : EOF
    { return new yy.CompilationUnit(); }
  | package_declaration EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; return cu; }
  | import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaImports = $1; return cu; }
  | type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaType = $1; return cu; }
  | package_declaration import_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaImports = $2; return cu; }
  | package_declaration type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaType = $2; return cu; }
  | import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaImports = $1; cu.vavaType = $2; return cu; }
  | package_declaration import_declarations type_declarations EOF
    { var cu = new yy.CompilationUnit(); cu.vavaPackage = $1; cu.vavaImports = $2; cu.vavaType = $3; return cu; }
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

package_declaration
  : KEYWORD_PACKAGE IDENTIFIER LINE_TERMINATOR
    { $$ = $2; }
  ;