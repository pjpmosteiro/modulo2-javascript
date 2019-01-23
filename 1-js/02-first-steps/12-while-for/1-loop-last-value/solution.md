The answer: `1`.

```js run
let i = 3;

while (i) {
  alert(i--);
}
```

Cada iteración de bucle disminuye `i` por `1`. La comprobación `while (i)` detiene el bucle cuando `i = 0`.

Por lo tanto, los pasos del bucle forman la siguiente secuencia:

```js
let i = 3;

alert(i--); // shows 3, decreases i to 2

alert(i--); // shows 2, decreases i to 1

alert(i--); // shows 1, decreases i to 0

// done, while(i) check stops the loop
```
