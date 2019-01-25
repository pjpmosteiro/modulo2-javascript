La respuesta: `1`, y luego `undefined`.

```js run
alert(alert(1) && alert(2));
```

La llamada a `alert` devuelve `undefined` (solo muestra un mensaje, por lo que no hay un retorno significativo).

Debido a eso, `&&` evalúa el operando izquierdo (genera `1`), e inmediatamente se detiene, porque`undefined` es un valor falso. Y `&&` busca un valor falso y lo devuelve, así que se hace.
