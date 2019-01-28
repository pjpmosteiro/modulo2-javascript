importance: 2

---

# Chaining

Hay un objeto `ladder` que permite subir y bajar:

```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() {
    // shows the current step
    alert(this.step);
  }
};
```

Ahora, si necesitamos hacer varias llamadas en secuencia, podemos hacerlo así:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Modifique el código de `up` y `down` para hacer que las llamadas esten unidas, de esta forma:

```js
ladder
  .up()
  .up()
  .down()
  .showStep(); // 1
```

Este enfoque es ampliamente utilizado en las bibliotecas de JavaScript.
