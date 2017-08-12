# SPARQL 1.1 Grammar in EBNF Form

This repository contains the SPARQL 1.1 grammar in EBNF as postulated on the W3C's website. The order of all clauses is preserved.

## Whitespace

    Whitespaces, tabs, newlines and carriage returns are ignored in most of the abovementioned spec. Therefor a whitespace definition has been added:
    ```
    WS ::= [\n\r\t ]
    ```
    And this is added to all clauses where it made sense.

## Currently supported character encoding

    For now whenever characters are concerned the only supported are the regular roman alphabet (ie. [a-zA-Z]).
    
## Versions
    Currently only SPARQL version 1.1 is supported.
	
## TODO
	The plan is to eventually support all characters by expanding all clauses.
	```
	https://www.compart.com/en/unicode/block
	```
    
## Example Usage

### clojure
Open a clojure REPL 
```
>lein repl
```

Require instaparse (this will only work out of the box if your config is accordingly):
```
  (:require [instaparse.core :as insta])
```

Then slurp the grammar
```
(def slurp-grammar
  "reads the sparql.ebnf"
  (slurp "https://raw.githubusercontent.com/langens-jonathan/sparql-ebnf/master/sparql.ebnf"))
```

Define the parser
```
(def sparql-parser
  (insta/parser slurp-grammar))
```

Use the parser:
```
(sparql-parser "SELECT * WHERE {?s ?p ?o .}")
```
will yield the following result:
```
[:Unit [:QueryUnit [:Query [:Prologue] [:SelectQuery [:SelectClause "SELECT" [:WS " "] "*"] [:WS " "] [:WhereClause "WHERE" [:WS " "] [:GroupGraphPattern "{" [:GroupGraphPatternSub [:TriplesBlock [:TriplesSameSubjectPath [:VarOrTerm [:Var [:VAR1 "?" [:VARNAME [:PN_CHARS_U [:PN_CHARS_BASE "s"]]]]]] [:WS " "] [:PropertyListPathNotEmpty [:VerbSimple [:Var [:VAR1 "?" [:VARNAME [:PN_CHARS_U [:PN_CHARS_BASE "p"]]]]]] [:WS " "] [:ObjectListPath [:ObjectPath [:GraphNodePath [:VarOrTerm [:Var [:VAR1 "?" [:VARNAME [:PN_CHARS_U [:PN_CHARS_BASE "o"]]]]]]]]]]]]] [:WS " "] "}"]] [:SolutionModifier]] [:ValuesClause]]]]
```
This result can then further be processed using zippers, recursion or whatever.
