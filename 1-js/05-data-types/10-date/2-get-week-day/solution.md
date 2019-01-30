El método `date.getDay()` devuelve el número del día de la semana, comenzando desde el domingo.

Hagamos una variedad de días de la semana, para que podamos obtener el nombre del día correcto por su número:

```js run
function getWeekDay(date) {
  let days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert(getWeekDay(date)); // FR
```
