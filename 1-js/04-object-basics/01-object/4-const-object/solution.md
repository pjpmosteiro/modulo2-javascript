Claro, funciona, no hay problema.

El `const` solo protege a la variable misma de cambiar.

En otras palabras, `user` almacena una referencia al objeto. Y no se puede cambiar. Pero el contenido del objeto puede.

```js run
const user = {
  name: "John"
};

*!*
// works
user.name = "Pete";
*/!*

// error
user = 123;
```
