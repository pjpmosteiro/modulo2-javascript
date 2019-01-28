

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```
Tenga en cuenta el unary plus `+` before `prompt`. Inmediatamente convierte el valor en un número.

De lo contrario, `a` y `b` serían unir su suma sería su concatenación, es decir: ` "1" + "2" = "12"`.