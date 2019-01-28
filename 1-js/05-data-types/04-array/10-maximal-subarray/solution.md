# The slow solution

Podemos calcular todos los subsumos posibles.

La forma más sencilla es tomar cada elemento y calcular sumas de todos los subarrays a partir de él.

Por ejemplo, para `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Starting from -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Starting from 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Starting from 3:
3
3 + (-9)
3 + (-9) + 11

// Starting from -9
-9
-9 + 11

// Starting from -11
-11
```

El código es en realidad un bucle anidado: el bucle externo sobre los elementos del array y los conteos internos que comienzan con el elemento actual.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // if we take no elements, zero will be returned

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

La solución tiene una complejidad de tiempo de [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). En otras palabras, si aumentamos el tamaño del array 2 veces, el algoritmo funcionará 4 veces más.

Para arrays grandes (1000, 10000 o más elementos) tales algoritmos pueden llevar a una seria lentitud.
# Fast solution

Vayamos al array y mantengamos la suma parcial actual de elementos en la variable `s`. Si `s` se vuelve negativo en algún punto, entonces asigne` s=0`. El máximo de todos estos `s` será la respuesta.

Si la descripción es demasiado vaga, por favor vea el código, es lo suficientemente corto:
```js run
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

El algoritmo requiere exactamente 1 paso de array, por lo que la complejidad del tiempo es O (n).

Puede encontrar más información detallada sobre el algoritmo aquí: [Problema de subarray máximo](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Si aún no es obvio por qué funciona, entonces rastree el algoritmo en los ejemplos anteriores, vea cómo funciona, eso es mejor que cualquier palabra.
