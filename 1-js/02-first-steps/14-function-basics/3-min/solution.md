A solution using `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

¿Una solución con un operador de signo de interrogación `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

PD En el caso de una igualdad `a == b` no importa qué devolver.
