# Object.keys, values, entries

Alejémonos de las estructuras de datos individuales y hablemos sobre las iteraciones sobre ellas.

En el capítulo anterior vimos los métodos `map.keys()`, `map.values()`, `map.entries()`.

Estos métodos son genéricos, existe un acuerdo común para usarlos para estructuras de datos. Si alguna vez creamos una estructura de datos propia, también deberíamos implementarla.

Son compatibles para:

- `Map`
- `Set`
- `Array` (excepto `arr.values()`)

Los objetos simples también admiten métodos similares, pero la sintaxis es un poco diferente.

## Object.keys, values, entries

For plain objects, the following methods are available:

- [Object.keys(obj)](mdn:js/Object/keys) -- returns an array of keys.
- [Object.values(obj)](mdn:js/Object/values) -- returns an array of values.
- [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of `[key, value]` pairs.

...But please note the distinctions (compared to map for example):

Para objetos planos, los siguientes métodos están disponibles:

- [Object.keys(obj)](mdn:js/Object/keys) - devuelve una matriz de claves.
- [Object.values(obj)](mdn:js/Object/values) - devuelve una matriz de valores.
- [Object.entries(obj)](mdn:js/Object/entries) - devuelve una matriz de pares `[clave, valor]`.

... Pero tenga en cuenta las distinciones (en comparación con el mapa, por ejemplo):

|             | Map          | Object                                   |
| ----------- | ------------ | ---------------------------------------- |
| Call syntax | `map.keys()` | `Object.keys(obj)`, but not `obj.keys()` |
| Returns     | iterable     | "real" Array                             |

La primera diferencia es que tenemos que llamar `Object.keys(obj)`, y no `obj.keys()`.

¿Porque? La razón principal es la flexibilidad. Recuerda, los objetos son la base de todas las estructuras complejas en JavaScript. Así que podemos tener un objeto propio como `order` que implementa su propio método`order.values()`. Y todavía podemos llamar `Object.values(order)` en él.

La segunda diferencia es que los métodos `Object.*` Devuelven objetos de matriz "real", no solo un iterable. Eso es principalmente por razones históricas.

Por ejemplo:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Aquí hay un ejemplo del uso de `Object.values` para recorrer los valores de las propiedades:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

## Object.keys/values/entries ignore symbolic properties

Al igual que un bucle `for..in`, estos métodos ignoran las propiedades que usan `Symbol(...)` como teclas.

Por lo general eso es conveniente. Pero si queremos claves simbólicas también, entonces hay un método separado
[Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)
que devuelve una matriz de sólo claves simbólicas. Además, el método
[Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) retorna _todas_ las claves.
