```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

El bucle `do..while` se repite mientras que ambas verificaciones son veraces:

1. La verificación para `num <= 100` -- es decir, el valor ingresado aún no es mayor que`100`.
2. La comprobación `&& num` es falsa cuando`num` es `null` o una cadena vacía. Entonces el bucle `while` también se detiene.

PD Si `num` es`null`, entonces `num <= 100` es`true`, por lo que sin la segunda verificación, el ciclo no se detendría si el usuario hace clic en CANCELAR. Se requieren ambos cheques.
