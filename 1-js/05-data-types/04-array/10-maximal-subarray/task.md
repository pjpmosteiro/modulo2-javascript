importancia: 2

---

# A maximal subarray

La entrada es un array de números, por ejemplo, `arr = [1, -2, 3, 4, -9, 6]`.

La tarea es: encontrar el subarreglo contiguo de `arr` con la suma máxima de elementos.

Escriba la función `getMaxSubSum (arr)` que devolverá esa suma.

Por ejemplo:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) = 5 (the sum of highlighted items)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) = 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) = 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) = 100
getMaxSubSum([*!*1, 2, 3*/!*]) = 6 (take all)
```

Si todos los elementos son negativos, significa que no tomamos ninguno (el subarreglo está vacío), por lo que la suma es cero:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Intenta pensar en una solución rápida: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) o incluso O(n) si puedes.
