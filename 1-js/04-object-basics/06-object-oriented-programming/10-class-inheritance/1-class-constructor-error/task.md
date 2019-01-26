importance: 5

---

# Error creating an instance

Aquí está el código con `Rabbit` extendiendo `Animal`.

Desafortunadamente, los objetos `Rabbit` no pueden ser creados. Que pasa Arreglalo.

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
