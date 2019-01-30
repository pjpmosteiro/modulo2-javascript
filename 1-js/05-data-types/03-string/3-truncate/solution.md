La longitud máxima debe ser `maxlength`, por lo que necesitamos cortarla un poco más corta, para dar espacio a la elipsis.

Tenga en cuenta que en realidad hay un solo carácter Unicode para una elipsis. Eso no es tres puntos.

```js run
function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}
```
