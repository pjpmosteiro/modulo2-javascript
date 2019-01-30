La idea es simple: restar el número dado de días de `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

... Pero la función no debe cambiar `date`. Eso es algo importante, porque el código externo que nos da la fecha no espera que cambie.

Para implementarlo vamos a clonar la fecha, así:

```js run
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
```
