importance: 5

---

# Store read dates

Hay una serie de mensajes como en la [tarea anterior](info:task/recipients-read). La situación es similar

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

La pregunta ahora es: ¿qué estructura de datos sugeriría para almacenar la información: "cuando se leyó el mensaje?".

En la tarea anterior solo necesitábamos almacenar el hecho "sí/no". Ahora necesitamos guardar la fecha y, una vez más, debería desaparecer si el mensaje desaparece.
