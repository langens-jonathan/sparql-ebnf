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
	
## TODO
	The plan is to eventually support all characters by expanding all clauses.
	```
	https://www.compart.com/en/unicode/block
	```
