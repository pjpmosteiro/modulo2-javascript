importance: 5

---

# Destructuring assignment

Tenemos un objeto:

```js
let user = {
  name: "John",
  years: 30
};
```

Escribe la tarea de desestructuración que dice:

- propiedad `name` en la variable `name`.
- propiedad `years` en la variable `age`.
- propiedad `isAdmin` en la variable `isAdmin` (falso por defecto)

Los valores después de la asignación deben ser:

```js
let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

alert(name); // John
alert(age); // 30
alert(isAdmin); // false
```
