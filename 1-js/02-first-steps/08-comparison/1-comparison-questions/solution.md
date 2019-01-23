```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false

10 == "10";
10 === "10";
```

Algunas de las razones:

1. Obviamente, es cierto.
2. Comparación de diccionario, por lo tanto, falsa.
3. De nuevo, la comparación del diccionario, primer char de `"2"` es mayor que el primer char de `"1"`.
4. Los valores `null` y `undefined` son iguales solo entre sí.
5. La igualdad estricta es estricta. Diferentes tipos de ambos lados conducen a falso.
6. Ver (4).
7. Igualdad estricta de los diferentes tipos.
