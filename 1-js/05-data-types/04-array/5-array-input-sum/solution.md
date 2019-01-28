Tenga en cuenta el detalle sutil, pero importante de la solución. No convertimos `value` en número instantáneamente después de `prompt`, porque después de `value = +value` no podríamos distinguir un string vacío (señal de stop) desde el cero (número válido). Lo hacemos más tarde en su lugar.

```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // should we cancel?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

