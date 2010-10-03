/* description: Parses end executes mathematical expressions in Vava. */

/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}

"public"              {return 'MODIFIER_PUBLIC';}
"private"             {return 'MODIFIER_PRIVATE';}
"protected"           {return 'MODIFIER_PROTECTED';}

"static"              {return 'MODIFIER_STATIC';}
"void"                {return 'MODIFIER_VOID';}
"final"                {return 'MODIFIER_FINAL';}

"class"               {return 'KEYWORD_CLASS';}

[a-zA-Z][a-zA-Z0-9_]* {return 'IDENTIFIER';}

[0-9]+("."[0-9]+)?\b  {return 'NUMBER';}
"*"                   {return '*';}
"/"                   {return '/';}
"-"                   {return '-';}
"+"                   {return '+';}
"("                   {return '(';}
")"                   {return ')';}
"{"                   %{return '{';%}
"}"                   %{return '}';%}
";"                   {return ';';}
<<EOF>>               {return 'EOF';}
.                     {return 'INVALID';}

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left UMINUS

%start class 

%% /* language grammar */

class
    : class_expression EOF
        {print($1); return $1;}
    ;

class_expression
    : KEYWORD_CLASS IDENTIFIER '{' class_body '}'
        {return $4;}
    ;

class_body
    : main_method
        {return $1;}
    ;

main_method
    : MODIFIER_PUBLIC MODIFIER_STATIC MODIFIER_VOID IDENTIFIER '(' IDENTIFIER IDENTIFIER ')' '{' expression_statements '}'
        {return $10;}
    ;

expression_statements
    : e ';'
        {return $1;}
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    ;

