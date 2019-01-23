Hay muchos algoritmos para esta tarea.

Vamos a usar un bucle anidado:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

El código que usa una etiqueta:

```js run
let n = 10;

nextPrime: for (let i = 2; i <= n; i++) {
  // for each i...

  for (let j = 2; j < i; j++) {
    // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert(i); // a prime
}
```

There's a lot of space to opimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.

Hay mucho espacio para opimizarlo. Por ejemplo, podríamos buscar los divisores de `2` a la raíz cuadrada de `i`. Pero de todos modos, si queremos ser realmente eficientes para grandes intervalos, necesitamos cambiar el enfoque y usar matemática avanzada y algoritmos complejos como [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
