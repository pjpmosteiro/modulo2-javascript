importance: 4

---

# Filter anagrams

[Anagrams](https://en.wikipedia.org/wiki/Anagram) son palabras que tienen el mismo número de letras, pero en diferente orden.
FPor ejemplo:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Escriba una función `aclean (arr)` que devuelva un array limpio de anagramas.

Por ejemplo:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

De cada grupo de anagramas debe quedar una sola palabra, sin importar cuál.

