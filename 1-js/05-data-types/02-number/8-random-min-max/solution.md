Necesitamos "mapear" todos los valores del intervalo 0..1 en valores desde `min` hasta` max`.

Eso se puede hacer en dos etapas:

1. Si multiplicamos un número aleatorio de 0..1 por `max-min`, entonces el intervalo de valores posibles aumenta de` 0..1` a `0..max-min`.
2. Ahora, si agregamos `min`, el intervalo posible pasa de` min` a `max`.

La función:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

