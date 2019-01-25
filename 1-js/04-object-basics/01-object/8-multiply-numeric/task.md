importance: 3

---

# Multiply numeric properties by 2

Cree una función `multiplyNumeric(obj)` que multiplique todas las propiedades numéricas de `obj` por `2`.

Por ejemplo:

```js
// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Tenga en cuenta que `multiplyNumeric` no necesita devolver nada. Debe modificar el objeto en el lugar.

PD Use `typeof` para verificar un número aquí.
