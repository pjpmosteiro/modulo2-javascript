Si es posible.

Si una función devuelve un objeto, entonces `new` lo devuelve en lugar de `this`.

Entonces, por ejemplo, pueden devolver el mismo objeto definido externamente `obj`:

```js run no-beautify
let obj = {};

function A() {
  return obj;
}
function B() {
  return obj;
}

alert(new A() == new B()); // true
```
