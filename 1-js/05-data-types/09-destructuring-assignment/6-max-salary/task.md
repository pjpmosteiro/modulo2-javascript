importance: 5

---

# The maximal salary

Hay un objeto `salaries`:

```js
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};
```

Cree la función `topSalary(salaries)` que devuelve el nombre de la persona mejor pagada.

- Si `salaries` está vacío, debería devolver`null`.
- Si hay varias personas mejor pagadas, devuelva cualquiera de ellas.

PD Use `Object.entries` y la desestructuración para iterar sobre pares clave/valor.
