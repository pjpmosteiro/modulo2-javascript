La diferencia se hace evidente cuando miramos el código dentro de una función.

El comportamiento es diferente si hay un "salto fuera" de `try..catch`.

Por ejemplo, cuando hay un `return` dentro de `try..catch`. La cláusula `finally` funciona en caso de que *any* salga de `try..catch`, incluso a través de la declaración `return`: justo después de que `try..catch` haya terminado, pero antes de que el código de llamada obtenga el control.

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (e) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...O cuando hay un `lanzamiento`, como aquí:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (e) {
    // ...
    if("can't handle the error") {
*!*
      throw e;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

Es `finally` lo que garantiza la limpieza aquí. Si solo pusiéramos el código al final de `f`, no se ejecutaría.
