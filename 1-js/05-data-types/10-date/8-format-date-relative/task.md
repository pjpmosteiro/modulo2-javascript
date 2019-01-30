importance: 4

---

# Format the relative date

Escriba una función `formatDate(date)` que debe formatear `date` de la siguiente manera:

- Si desde `date` ha pasado menos de 1 segundo, entonces `"ahora mismo"`.
- De lo contrario, si desde `date` pasó menos de 1 minuto, entonces `hace n segundos`.
- De lo contrario, si es menos de una hora, entonces `"hace m minutos"`.
- De lo contrario, la fecha completa en el formato `"DD.MM.YY HH: mm "`. Es decir: `` day.month.year hours:minutes '`, todo en formato de 2 dígitos, por ejemplo.`31.12.16 10:00`.

Por ejemplo:

```js
alert(formatDate(new Date(new Date() - 1))); // "right now"

alert(formatDate(new Date(new Date() - 30 * 1000))); // "30 sec. ago"

alert(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. ago"

// yesterday's date like 31.12.2016, 20:00
alert(formatDate(new Date(new Date() - 86400 * 1000)));
```
