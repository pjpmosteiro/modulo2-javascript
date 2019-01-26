importancia: 5

---

# Iterable keys

Queremos obtener un array de `map.keys()` y seguir trabajando con ella (aparte del mapa en sí).

Pero hay un problema:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: numbers.push is not a function
keys.push("more");
*/!*
```

¿Por qué? ¿Cómo podemos arreglar el código para que `keys.push` funcione?