**Answer: an error.**

Try it:

```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert(user.ref.name); // Error: Cannot read property 'name' of undefined
```

Esto se debe a que las reglas que establecen `this` no miran los literales de los objetos.

Aquí el valor de `this` dentro de `makeUser()` es `undefined`, porque se llama como una función, no como un método.

Y el objeto literal en sí mismo no tiene efecto en `this`. El valor de `this` es uno para toda la función, los bloques de código y los literales de los objetos no lo afectan.

Así que `ref: this` toma el `this` actual de la función.

Aquí está el caso opuesto:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Ahora funciona, porque `user.ref()` es un método. Y el valor de `this` se establece en el objeto antes del punto `.`.
