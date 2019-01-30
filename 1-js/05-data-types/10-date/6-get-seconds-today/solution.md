Para obtener el número de segundos, podemos generar una fecha usando el día y la hora 00:00:00 y luego restarlos al "ahora".

La diferencia es la cantidad de milisegundos desde el comienzo del día, que debemos dividir por 1000 a segundos:

```js run
function getSecondsToday() {
  let now = new Date();

  // create an object using the current day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}

alert(getSecondsToday());
```

An alternative solution would be to get hours/minutes/seconds and convert them to seconds:

Una solución alternativa sería obtener horas/minutos/segundos y convertirlos en segundos:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
