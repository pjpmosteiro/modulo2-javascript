importance: 5

---

# Map to objects

Tienes un conjunto de objetos `user`, cada uno tiene `name`, `surname` y `id`.

Escriba el código para crear otra matriz a partir de él, de objetos con `id` y` fullName`, donde `fullName` se genera a partir de `name` y `surname`.

Por ejemplo:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Entonces, en realidad necesitas mapear una matriz de objetos a otra. Intenta usar `=>` aquí. Hay una pequeña trampa.