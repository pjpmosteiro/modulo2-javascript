importance: 2

---

# Syntax check

¿Cuál es el resultado de este código?

```js no-beautify
let user = {
  name: "John",
  go: function() {
    alert(this.name);
  }
}(user.go)();


let user = {
  name: "John",
  go: function() {
    alert(this.name);
  }
};
(user.go)();
user.go();
```
