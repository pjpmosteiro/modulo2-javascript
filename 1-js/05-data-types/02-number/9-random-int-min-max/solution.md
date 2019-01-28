# La solución simple pero incorrecta.

La solución más simple, pero equivocada, sería generar un valor de `min` a `max` y redondearlo:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

La función funciona, pero es incorrecta. La probabilidad de obtener valores de borde `min` y `max` es dos veces menor que cualquier otro.

Si ejecuta el ejemplo anterior muchas veces, verá fácilmente que '2' aparece con mayor frecuencia.

Esto sucede porque `Math.round()` obtiene números aleatorios del intervalo `1..3` y los redondea de la siguiente manera:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

Ahora podemos ver claramente que `1` obtiene el doble de valor que `2`. Y lo mismo con `3`.

# La solución correcta

Hay muchas soluciones correctas para la tarea. Uno de ellos es ajustar los límites de intervalo. Para garantizar los mismos intervalos, podemos generar valores de `0.5 a 3.5`, agregando así las probabilidades requeridas a los bordes:

```js run
*!*
function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Una forma alternativa podría ser usar `Math.floor` para un número aleatorio desde` min` hasta `max + 1`:

```js run
*!*
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Ahora todos los intervalos se mapean de esta manera:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

Todos los intervalos tienen la misma longitud, haciendo que la distribución final sea uniforme.
