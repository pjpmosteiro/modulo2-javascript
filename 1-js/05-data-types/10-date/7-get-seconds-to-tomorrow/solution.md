Para obtener la cantidad de milisegundos hasta mañana, podemos restar la fecha actual a la fecha "mañana 00:00:00".

Primero, generamos ese "mañana", y luego lo hacemos:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```

Solución alternativa:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```
