The answer: `3`.

```js run
alert(null || (2 && 3) || 4);
```

La prioridad de AND `&&` es mayor que `||`, por lo que se ejecuta primero.

El resultado de `2 && 3 = 3`, por lo que la expresión se convierte en:

```
null || 3 || 4
```

Ahora el resultado es el primer valor de verdad: `3`.
