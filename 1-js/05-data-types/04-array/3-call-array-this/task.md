importancia: 5

---

# Calling in an array context

Cual es el resultado? ¿Por qué?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

