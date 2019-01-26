Esto se debe a que el constructor hijo debe llamar a `super()`.

Aquí está el código corregido:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // ok now
*/!*
alert(rabbit.name); // White Rabbit
```
