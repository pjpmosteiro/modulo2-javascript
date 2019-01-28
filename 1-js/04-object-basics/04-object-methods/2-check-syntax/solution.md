**Error**!

Prueba:

```js run
let user = {
  name: "John",
  go: function() {
    alert(this.name);
  }
}(user.go)(); // error!
```

El mensaje de error en la mayoría de los navegadores no permite comprender qué fue lo que falló.

**The error appears because a semicolon is missing after `user = {...}`.**

JavaScript no asume un punto y coma antes de un corchete `(user.go)()`, por lo que lee el código como:

```js no-beautify
let user = { go:... }(user.go)()
```

Entonces también podemos ver que tal expresión conjunta es sintácticamente una llamada del objeto `{go: ...}` como una función con el argumento `(user.go)`. Y eso también sucede en la misma línea con `let user`, por lo que el objeto `user` aún no se ha definido, de ahí el error.

Si insertamos el punto y coma, todo está bien:

```js run
let user = {
  name: "John",
  go: function() {
    alert(this.name);
  }
};

user.go(); // John
```

Please note that brackets around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.

Tenga en cuenta que los corchetes alrededor de `(user.go)` no hacen nada aquí. Por lo general, configuran el orden de las operaciones, pero aquí el punto `.` funciona primero de todos modos, así que no hay efecto. Sólo lo de punto y coma importa.
