importancia: 5

---

# Filter unique array members

Dejemos que `arr` sea un array.

Cree una función `unique(arr)` que debería devolver un array con elementos únicos de `arr`.

Por ejemplo:
```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

PD Aquí se utilizan strings, pero pueden ser valores de cualquier tipo.

P.P.S. Utilice `Set` para almacenar valores únicos.
