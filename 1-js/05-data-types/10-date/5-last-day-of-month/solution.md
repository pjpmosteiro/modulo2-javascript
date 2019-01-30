Vamos a crear una fecha usando el próximo mes, pero pase cero como el día:

```js run
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert(getLastDayOfMonth(2012, 0)); // 31
alert(getLastDayOfMonth(2012, 1)); // 29
alert(getLastDayOfMonth(2013, 1)); // 28
```

Normalmente, las fechas comienzan desde 1, pero técnicamente podemos pasar cualquier número, la fecha se ajustará automáticamente. Entonces cuando pasamos 0, significa "un día antes del 1er día del mes", en otras palabras: "el último día del mes anterior".
