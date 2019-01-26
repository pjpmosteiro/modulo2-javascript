# Classes

La construcción "clase" permite definir clases basadas en prototipos con una sintaxis clara y atractiva.

## The "class" syntax

La sintaxis de `clase` es versátil, primero comenzaremos con un ejemplo simple.

Aquí hay una clase basada en prototipo `User`:

```js run
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
};

let user = new User("John");
user.sayHi();
```

... Y eso es lo mismo usando la sintaxis `class`:

```js run
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

let user = new User("John");
user.sayHi();
```

Es fácil ver que los dos ejemplos son iguales. Solo tenga en cuenta que los métodos en una clase no tienen una coma entre ellos. Los desarrolladores novatos a veces lo olvidan y ponen una coma entre los métodos de clase, y las cosas no funcionan. Eso no es un objeto literal, sino una sintaxis de clase.

Entonces, ¿qué hace exactamente la `clase`? Podemos pensar que define una nueva entidad de nivel de lenguaje, pero eso sería incorrecto.

El `class User {...}` aquí en realidad hace dos cosas:

1. Declara una variable `User` que hace referencia a la función llamada `"constructor"`.
2. Pone los métodos listados en la definición en `User.prototype`. Aquí, incluye `sayHi` y el `constructor`

Aquí está el código para profundizar en la clase y ver que:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

*!*
// proof: User is the "constructor" function
*/!*
alert(User === User.prototype.constructor); // true

*!*
// proof: there are two methods in its "prototype"
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

Aquí está la ilustración de lo que `class User` crea:

![](class-user.png)

Así que `class` es una sintaxis especial para definir un constructor junto con sus métodos prototipo.

... Pero no solo eso. Hay ajustes menores aquí y allá:

Los constructores requieren `new`
: A diferencia de una función regular, una clase `constructor` no se puede llamar sin `new`:

```js run
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```

Different string output
: If we output it like `alert(User)`, some engines show `"class User..."`, while others show `"function User..."`.

Salida de cadena diferente
: Si lo enviamos como `alert(User)`, algunos motores muestran `"class User ... "`, mientras que otros muestran la `"function User..."`.

Por favor, no se confunda: la representación de la cadena puede variar, pero esa sigue siendo una función, no hay una entidad de "clase" separada en el lenguaje JavaScript.

Los métodos de clase no son enumerables.
: Una definición de clase establece el indicador `enumerable` en `false` para todos los métodos en el `"prototype"`. Eso es bueno, porque si estamos `for..in` sobre un objeto, generalmente no queremos sus métodos de clase.

Las clases tienen un `constructor() {}` predeterminado
: Si no hay `constructor` en la construcción `class`, entonces se genera una función vacía, igual que si hubiéramos escrito `constructor() {}`.

Clases siempre `use strict`
: Todo el código dentro de la construcción de la clase está automáticamente en modo estricto.

### Getters/setters

Las clases también pueden incluir getters/setters. Aquí hay un ejemplo con `user.name` implementado usándolos:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

Internamente, los captadores y los creadores también se crean en el prototipo `User`, como este:

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name;
    },
    set(name) {
      // ...
    }
  }
});
```

### Only methods

A diferencia de los literales de objetos, no se permiten asignaciones de `property:value` dentro de `class`. Sólo puede haber métodos y getters / setters. Se está trabajando en la especificación para eliminar esa limitación, pero aún no está ahí.

Si realmente necesitamos poner un valor que no sea de función en el prototipo, entonces podemos alterar el `prototype` manualmente, de la siguiente manera:

```js run
class User {}

User.prototype.test = 5;

alert(new User().test); // 5
```

Entonces, técnicamente eso es posible, pero deberíamos saber por qué lo estamos haciendo. Tales propiedades serán compartidas entre todos los objetos de la clase.

Una alternativa "en clase" es usar un getter:

```js run
class User {
  get test() {
    return 5;
  }
}

alert(new User().test); // 5
```

Desde el código externo, el uso es el mismo.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned etc.

Here's a class-returning function ("class factory"):

Al igual que las funciones, las clases se pueden definir dentro de otra expresión, se pueden pasar, devolver, etc.

Aquí hay una función de una clase que devuelve retorna algo.

```js run
function makeClass(phrase) {
*!*
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
```

Eso es bastante normal si recordamos que `class` es solo una forma especial de una definición de función con prototipo.

Y, al igual que las expresiones de funciones con nombre, estas clases también pueden tener un nombre, que es visible solo dentro de esa clase:

```js run
// "Named Class Expression" (alas, no such term, but that's what's going on)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass not visible outside of the class
```

## Static methods

También podemos asignar métodos a la función de clase, no a su `"prototype"`. Tales métodos se llaman _static_.

Un ejemplo:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

Eso en realidad hace lo mismo que asignarlo como una propiedad de función:

```js
function User() {}

User.staticMethod = function() {
  alert(this === User);
};
```

El valor de `this` dentro de `User.staticMethod()` es el constructor de la clase `User` (la regla del "objeto antes del punto").

Normalmente, los métodos estáticos se utilizan para implementar funciones que pertenecen a la clase, pero no a ningún objeto particular de la misma.

For instance, we have `Article` objects and need a function to compare them. The natural choice would be `Article.compare`, like this:

Por ejemplo, tenemos objetos `Article` y necesitamos una función para compararlos. La elección natural sería `Article.compare`, así:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("Mind", new Date(2016, 1, 1)),
  new Article("Body", new Date(2016, 0, 1)),
  new Article("JavaScript", new Date(2016, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // Body
```

Aquí `Article.compare` se encuentra" sobre "los artículos, como un medio para compararlos. No es un método de un artículo, sino de toda la clase.

Otro ejemplo sería el llamado método de "fábrica". Imagínate, necesitamos algunas formas de crear un artículo:

1. Crear por parámetros dados (`título`,`fecha`, etc.).
2. Crea un artículo vacío con la fecha de hoy.
3. ...

La primera forma puede ser implementada por el constructor. Y para el segundo podemos hacer un método estático de la clase.

como `Article.createTodays()` aquí:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```

Ahora, cada vez que necesitamos crear un resumen de hoy, podemos llamar a `Article.createTodays()`. Una vez más, ese no es un método de un artículo, sino un método de toda la clase.

Los métodos estáticos también se utilizan en clases relacionadas con la base de datos para buscar/guardar/eliminar entradas de la base de datos, como esto:

```js
// assuming Article is a special class for managing articles
// static method to remove the article:
Article.remove({ id: 12345 });
```

## Summary

La sintaxis de clase básica se ve así:

```js
class MyClass {
  constructor(...) {
    // ...
  }
  method1(...) {}
  method2(...) {}
  get something(...) {}
  set something(...) {}
  static staticMethod(..) {}
  // ...
}
```

El valor de `MyClass` es una función proporcionada como `constructor`. Si no hay un `constructor`, entonces una función vacía.

En cualquier caso, los métodos listados en la declaración de clase se convierten en miembros de su `prototype`, con la excepción de los métodos estáticos que se escriben en la función y se pueden llamar como `MyClass.staticMethod()`. Los métodos estáticos se utilizan cuando necesitamos una función vinculada a una clase, pero no a ningún objeto de esa clase.
