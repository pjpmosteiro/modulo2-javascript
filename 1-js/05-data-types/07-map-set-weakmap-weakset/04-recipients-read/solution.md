La elección sensata aquí es un `WeakSet`::

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
```

El `WeakSet` permite almacenar un conjunto de mensajes y verificar fácilmente la existencia de un mensaje en él.

Se limpia automáticamente. La compensación es que no podemos iterar sobre ella. No podemos obtener "todos los mensajes leídos" directamente. Pero podemos hacerlo iterando sobre todos los mensajes y filtrando los que están en el conjunto.

PD Agregar una propiedad nuestra a cada mensaje puede ser peligroso si los mensajes son administrados por el código de otra persona, pero podemos convertirlo en un símbolo para evadir conflictos.

Así:
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Ahora, incluso si el código de otra persona usa el bucle `for..in` para las propiedades del mensaje, nuestro indicador secreto no aparecerá.