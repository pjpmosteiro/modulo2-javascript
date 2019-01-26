importance: 4

---

# Get average age

Escriba la función `getAverageAge(users)` que obtiene una matriz de objetos con propiedad `age` y obtiene el promedio.

La fórmula para el promedio es `(age1 + age2 + ... + ageN) / N`.

Por ejemplo:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```

