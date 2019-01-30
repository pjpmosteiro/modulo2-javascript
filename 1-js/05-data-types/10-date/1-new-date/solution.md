El constructor `new Date` usa la zona horaria local por defecto. Así que lo único importante que debemos recordar es que los meses comienzan desde cero.

Así que febrero tiene el número 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert(d);
```
