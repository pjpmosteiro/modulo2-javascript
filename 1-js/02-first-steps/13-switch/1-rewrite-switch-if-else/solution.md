Para hacer coincidir con precisión la funcionalidad de `switch`, el `if` debe usar una comparación estricta `'==='`.

For given strings though, a simple `'=='` works too.

Sin embargo, para cadenas dadas, un simple `'=='` también funciona.

```js no-beautify
if (browser == "Edge") {
  alert("You've got the Edge!");
} else if (
  browser == "Chrome" ||
  browser == "Firefox" ||
  browser == "Safari" ||
  browser == "Opera"
) {
  alert("Okay we support these browsers too");
} else {
  alert("We hope that this page looks ok!");
}
```

Tenga en cuenta: la construcción `browser == 'Chrome' || browser == 'Firefox' ...`está dividido en varias líneas para una mejor lectura.

Pero la construcción `switch` es aún más limpia y más descriptiva.
