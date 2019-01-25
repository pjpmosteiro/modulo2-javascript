La respuesta: primero `1`, luego`2`.

```js run
alert(alert(1) || 2 || alert(3));
```

La llamada a `alert` no devuelve un valor. O, en otras palabras, devuelve `undefined`.

1. El primer OR `||` evalúa su operando izquierdo `alert(1)`. Eso muestra el primer mensaje con `1`.
2. El `alert` devuelve`undefined`, por lo que OR pasa al segundo operando en busca de un valor verdadero.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.

4. El segundo operando `2` es verdadero, por lo que la ejecución se detiene, se devuelve `2` y luego se muestra en la alerta externa.

No habrá `3`, porque la evaluación no alcanza`alert(3)`.
