```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
```

1. La suma de un string `"" + 1` convierte `1` a string: `"" + 1 = "1"`, y luego tenemos `"1" + 0`, y la misma regla es aplicada.

2. La resta `-` (como en la mayoría de las operaciones matemáticas) sólo funciona con números, convierte un string vacío `""` a `0`.

3. La suma con el string añade el número `5` al string.

4. La resta siempre convierte a números, hace que `" -9 "` sea número `-9` (ignorando los espacion de alrededor).

5. `null` llega a ser `0` después de la conversión numérica.

6. `undefined` llega a ser `NaN` después de la conversión numérica.
