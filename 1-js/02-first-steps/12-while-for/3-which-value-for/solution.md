**The answer: from `0` to `4` in both cases.**

```js run
for (let i = 0; i < 5; ++i) alert(i);

for (let i = 0; i < 5; i++) alert(i);
```

Eso se puede deducir fácilmente del algoritmo de `for`:

1. Ejecute una vez `i = 0` antes de todo (comience).
2. Compruebe la condición `i < 5`
3. Si `true` - ejecuta el cuerpo del bucle`alert(i)`, y luego `i++`

El incremento `i++` está separado de la verificación de condición (2). Eso es sólo otra declaración.

El valor devuelto por el incremento no se usa aquí, por lo que no hay diferencia entre `i++` y `++i`.
