
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

La solución es un poco más compleja de lo que podría ser porque necesitamos manejar líneas nulas/vacías.

Así que realmente aceptamos la entrada hasta que mar un "número regular". Tanto `null` (cancelar) como la línea vacía también se ajustará a esa condición, porque en forma numérica son `0`.

Después de que nos detuviéramos, debemos tratar `null` y una línea vacía especialmente, porque convertirlos a un número devolvería `0`.

