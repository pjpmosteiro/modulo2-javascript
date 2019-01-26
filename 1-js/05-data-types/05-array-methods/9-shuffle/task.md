importancia: 3

---

# Shuffle an array

Escribe la función `shuffle(array)` que baraja (reordena aleatoriamente) los elementos del array.

Las ejecuciones múltiples de `shuffle` pueden llevar a diferentes órdenes de elementos. Por ejemplo:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Todas las órdenes de elementos deben tener una probabilidad igual. Por ejemplo, `[1,2,3]` se puede reordenar como `[1,2,3]` o `[1,3,2]` o `[3,1,2]` etc., con la misma probabilidad de cada caso.
