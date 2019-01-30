importance: 4

---

# Which day of month was many days ago?

Cree una función `getDateAgo(date, days)` para devolver el día del mes `days` desde la `date`.

Por ejemplo, si hoy es 20, entonces `getDateAgo(new Date(), 1)` debería ser 19th y `getDateAgo(new Date(), 2)` debería ser 18th.

También debería trabajar durante meses/años de forma fiable:

```js
let date = new Date(2015, 0, 2);

alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
```

PD La función no debe modificar la `date` dada.
