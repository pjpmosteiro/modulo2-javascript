Simplemente haga un bucle sobre el objeto y `return false` inmediatamente si hay al menos una propiedad.

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
