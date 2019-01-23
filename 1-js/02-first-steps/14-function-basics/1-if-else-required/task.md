importance: 4

---

# Is "else" required?

La siguiente función devuelve `true` si el parámetro`age` es mayor que `18`.

De lo contrario, solicita una confirmación y devuelve su resultado:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

¿Funcionará la función de forma diferente si se elimina `else`?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

¿Hay alguna diferencia en el comportamiento de estas dos variantes?
