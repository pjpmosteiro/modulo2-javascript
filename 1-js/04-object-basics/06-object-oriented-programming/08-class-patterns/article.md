# Class patterns

En la programación orientada a objetos, una _clase_ es una plantilla de código de programa extensible para crear objetos, que proporciona valores iniciales para el estado (variables miembro) e implementaciones de comportamiento (funciones).

Hay una construcción de sintaxis especial y una palabra clave `class` en JavaScript. Pero antes de estudiarlo, debemos considerar que el término "clase" proviene de la teoría de la programación orientada a objetos. La definición se cita arriba, y es independiente del lenguaje.

En JavaScript hay varios patrones de programación conocidos para hacer clases incluso sin usar la palabra clave `class`. Y aquí vamos a hablar de ellos primero.

La construcción de `class` se describirá en el siguiente capítulo, pero en JavaScript es un "azúcar de sintaxis" y una extensión de uno de los patrones que estudiaremos aquí.

## Functional class pattern

La función constructora a continuación puede considerarse una "clase" según la definición:

```js run
function User(name) {
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // John
```

Sigue todas las partes de la definición:

1. Es una "plantilla de código de programa" para crear objetos (que se puede llamar con `new`).
2. Proporciona valores iniciales para el estado (`name` de los parámetros).
3. Proporciona métodos (`sayHi`).

Esto se llama _functional class pattern_.

En el patrón de clase funcional, las variables locales y las funciones anidadas dentro de `User`, que no están asignadas a`this`, son visibles desde adentro, pero no son accesibles por el código externo.

Así que podemos agregar fácilmente funciones y variables internas, como `calcAge()` aquí:

```js run
function User(name, birthday) {
*!*
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }
*/!*

  this.sayHi = function() {
    alert(`${name}, age:${calcAge()}`);
  };
}

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
```

En este código, las variables `name`,`birthday` y la función `calcAge()` son internas, _private_ para el objeto. Solo son visibles desde su interior.

Por otro lado, `sayHi` es el método externo, _public_. El código externo que crea `user` puede acceder a él.

De esta manera podemos ocultar los detalles de la implementación interna y los métodos de ayuda del código externo. Solo lo que está asignado a `this` se hace visible afuera.

## Factory class pattern

Podemos crear una clase sin usar `new` en absoluto.

Me gusta esto:

```js run
function User(name, birthday) {
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  return {
    sayHi() {
      alert(`${name}, age:${calcAge()}`);
    }
  };
}

*!*
let user = User("John", new Date(2000, 0, 1));
*/!*
user.sayHi(); // John, age:17
```

Como podemos ver, la función `User` devuelve un objeto con propiedades y métodos públicos. El único beneficio de este método es que podemos omitir `new` y escribir `let user = User(...)` en lugar de `let user = new User(...)`. En otros aspectos es casi lo mismo que el patrón funcional.

## Prototype-based classes

Las clases basadas en prototipos son las más importantes y, en general, las mejores. Los patrones funcionales y de clase de fábrica rara vez se utilizan en la práctica.

Pronto verás por qué.

Aquí está la misma clase reescrita usando prototipos:

```js run
function User(name, birthday) {
*!*
  this._name = name;
  this._birthday = birthday;
*/!*
}

*!*
User.prototype._calcAge = function() {
*/!*
  return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function() {
  alert(`${this._name}, age:${this._calcAge()}`);
};

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
```

- El constructor `User` solo inicializa el estado actual del objeto.
- Los métodos se agregan a `User.prototype`.

Como podemos ver, los métodos no están léxicamente dentro de `function User`, no comparten un entorno léxico común. Si declaramos variables dentro de `function User`, entonces no serán visibles para los métodos.

Por lo tanto, existe un acuerdo ampliamente conocido de que las propiedades y los métodos internos se añaden con un guión bajo `"_"`. Como `_name` o`_calcAge ()`. Técnicamente, eso es solo un acuerdo, el código externo todavía puede acceder a ellos. Pero la mayoría de los desarrolladores reconocen el significado de `"_"` e intentan no tocar propiedades y métodos prefijados en el código externo.

Aquí están las ventajas sobre el patrón funcional:

- En el patrón funcional, cada objeto tiene su propia copia de cada método. Asignamos una copia separada de `this.sayHi = function() {...}` y otros métodos en el constructor.
- En el patrón prototípico, todos los métodos están en `User.prototype` que se comparte entre todos los objetos de usuario. Un objeto en sí solo almacena los datos.

Así que el patrón prototípico es más eficiente en memoria.

... Pero no solo eso. Los prototipos nos permiten configurar la herencia de una manera realmente eficiente. Todos los objetos JavaScript incorporados usan prototipos. También hay una construcción de sintaxis especial: "clase" que proporciona una sintaxis atractiva para ellos. Y hay más, así que sigamos con ellos.

## Prototype-based inheritance for classes

Digamos que tenemos dos clases basadas en prototipos.

`Rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(`${this.name} jumps!`);
};

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-1.png)

...And `Animal`:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  alert(`${this.name} eats.`);
};

let animal = new Animal("My animal");
```

![](rabbit-animal-independent-2.png)

En este momento son totalmente independientes.

Pero quisiéramos que `Rabbit` extendiera `Animal`. En otras palabras, los conejos deben estar basados en animales, tener acceso a métodos de `Animal` y extenderlos con sus propios métodos.

¿Qué significa en el lenguaje de los prototipos?

En este momento, los métodos para los objetos `rabbit` están en `Rabbit.prototype`. Nos gustaría que `rabbit` usara`Animal.prototype` como un ultimo recurso, si el método no se encuentra en `Rabbit.prototype`.

Así que la cadena del prototipo debería ser `rabbit` ->`Rabbit.prototype` -> `Animal.prototype`.

Como esto:

![](class-inheritance-rabbit-animal.png)

El código para implementar eso:

```js run
// Same Animal as before
function Animal(name) {
  this.name = name;
}

// All animals can eat, right?
Animal.prototype.eat = function() {
  alert(`${this.name} eats.`);
};

// Same Rabbit as before
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(`${this.name} jumps!`);
};

*!*
// setup the inheritance chain
Rabbit.prototype.__proto__ = Animal.prototype; // (*)
*/!*

let rabbit = new Rabbit("White Rabbit");
*!*
rabbit.eat(); // rabbits can eat too
*/!*
rabbit.jump();
```

La línea `(*)` configura la cadena del prototipo. Así que `rabbit` primero busca métodos en `Rabbit.prototype`, luego `Animal.prototype`. Y luego, solo para completar, mencionemos que si el método no se encuentra en `Animal.prototype`, entonces la búsqueda continúa en`Object.prototype`, porque `Animal.prototype` es un objeto plano normal, por lo que hereda de eso.

Así que aquí está la imagen completa:

![](class-inheritance-rabbit-animal-2.png)

## Summary

El término "clase" proviene de la programación orientada a objetos. En JavaScript usualmente significa el patrón de clase funcional o el patrón prototípico.

Según el patrón prototípico:

1. Los métodos se almacenan en `Class.prototype`.
2. Los prototipos se heredan unos de otros.

En el siguiente capítulo estudiaremos la palabra clave y la construcción `class`. Permite escribir clases de prototipos más cortos y proporciona algunos beneficios adicionales.
