importance: 5

---

# Inherit from SyntaxError

Cree una clase `FormatError` que herede de la clase incorporada `SyntaxError`.

Debe admitir las propiedades `message`,` name` y `stack`.

Ejemplo de uso:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (because inherits from SyntaxError)
```
