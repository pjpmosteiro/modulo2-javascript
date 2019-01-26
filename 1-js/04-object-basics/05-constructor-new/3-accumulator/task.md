importance: 5

---

# Create new Accumulator

Cree una función constructora `Accumulator(startingValue)`.

El objeto que crea debe:

- Almacene el "valor actual" en la propiedad `value`. El valor de inicio se establece en el argumento del constructor `startingValue`.
- El método `read()` debería usar `prompt` para leer un nuevo número y agregarlo a `value`.

En otras palabras, la propiedad `value` es la suma de todos los valores ingresados por el usuario con el valor inicial `startingValue`.

Aquí está la demo del código:

```js
let accumulator = new Accumulator(1); // initial value 1
accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value
alert(accumulator.value); // shows the sum of these values
```

[demo]
