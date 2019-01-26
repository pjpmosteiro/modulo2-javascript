Vamos a recorrer los elementos de la matriz:
- Para cada elemento verificaremos si la matriz resultante ya tiene ese elemento.
- Si es así, entonces ignora, de lo contrario agrega a los resultados.

```js run
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

El código funciona, pero hay un problema potencial de rendimiento.

El método `result.includes(str)` recorre internamente la matriz `result` y compara cada elemento con` str` para encontrar la coincidencia.

Entonces, si hay `100` elementos en `result` y nadie coincide con `str`, entonces recorrerá todo el `result` y hará exactamente las comparaciones de `100`. Y si `result` es grande, como` 10000`, entonces habría comparaciones `10000`.

Eso no es un problema por sí mismo, porque los motores de JavaScript son muy rápidos, por lo que el array `10000` es una cuestión de microsegundos.
Pero hacemos tal prueba para cada elemento de `arr`, en el bucle` for`.

Entonces, si `arr.length` es` 10000` tendremos algo así como `10000*10000` = 100 millones de comparaciones. Eso es mucho.

Así que la solución solo es buena para arreglos pequeños.

Más adelante en el capítulo <info:map-set-weakmap-weakset> veremos cómo optimizarlo.
