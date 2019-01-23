importance: 5

---

# Rewrite 'if..else' into '?'

Reescribe `if..else` usando múltiples operadores ternarios `'?'`.

Para leerse mejor, es recomendado separar el código en distintas lineas.

```js
let message;

if (login == "Employee") {
  message = "Hello";
} else if (login == "Director") {
  message = "Greetings";
} else if (login == "") {
  message = "No login";
} else {
  message = "";
}
```
