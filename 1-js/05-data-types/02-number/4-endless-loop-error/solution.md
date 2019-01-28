Eso es porque `i` nunca sería igual a `10`.

Ejecútelo para ver los valores * reales * de `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Ninguno de ellos es exactamente `10`.

Tales cosas suceden debido a las pérdidas de precisión cuando se agregan fracciones como `0.2`.

Conclusión: evadir los controles de igualdad cuando se trabaja con fracciones decimales.