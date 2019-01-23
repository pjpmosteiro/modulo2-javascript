**Yes, it will.**

Cualquier cadena, excepto una vacía (y `"0"` no está vacía) se convierte en "verdadera" en el contexto lógico.

Podemos correr y comprobar:

```js run
if ("0") {
  alert("Hello");
}
```
