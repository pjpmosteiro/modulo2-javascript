importance: 3

---

# Explain the value of "this"

En el código a continuación, intentamos llamar al método `user.go()` 4 veces seguidas.

Pero las llamadas `(1)` y `(2)` funcionan de manera diferente a `(3)` y `(4)`. ¿Por qué?

```js run no-beautify
let obj, method;

obj = {
  go: function() {
    alert(this);
  }
};

obj.go(); // (1) [object Object]

obj.go(); // (2) [object Object]

(method = obj.go)(); // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```
