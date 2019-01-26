importancia: 5

---

# Store "unread" flags

Hay una serie de mensajes:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

Su código puede acceder a él, pero los mensajes son administrados por el código de otra persona. Los nuevos mensajes se agregan, los antiguos se eliminan regularmente con ese código y no se conocen los momentos exactos en que ocurre.

Ahora, ¿qué estructura de datos podría usar para almacenar información si el mensaje "se ha leído"? La estructura debe ser adecuada para dar la respuesta "¿se leyó?" para el objeto de mensaje dado.

PD Cuando se elimina un mensaje de `messages`, también debería desaparecer de su estructura.

P.P.S. No deberíamos modificar los objetos del mensaje directamente. Si son administrados por el código de otra persona, agregarles propiedades adicionales puede tener malas consecuencias.
