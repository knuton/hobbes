/* description: Parses end executes Vava. */

/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}

"public"              {return 'MODIFIER_PUBLIC';}
"private"             {return 'MODIFIER_PRIVATE';}
"protected"           {return 'MODIFIER_PROTECTED';}

"package"             {return 'KEYWORD_PACKAGE';}

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
  ;

package_declaration
  : KEYWORD_PACKAGE IDENTIFIER LINE_TERMINATOR
    { $$ = $2; }
  ;