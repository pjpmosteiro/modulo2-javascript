# Constructor, operator "new"

La sintaxis regular `{...}` permite crear un objeto. Pero a menudo necesitamos crear muchos objetos similares, como varios usuarios o elementos de menú, etc.

Eso se puede hacer usando las funciones del constructor y el operador `"new"`.

## Constructor function

Las funciones constructoras técnicamente son funciones regulares. Sin embargo, hay dos convenciones:

1. Se nombran con mayúscula primero.
2. Deben ejecutarse solo con el operador `"new"`.

Por ejemplo:

```js run
function User(name, isAdmin) {
  this.name = name;
  this.isAdmin = isAdmin;
  this.isOldEnough = true
}

*!*
let user = new User("Jack", true);
let user2 = new User("Pepe", false);

*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Cuando una función se ejecuta como `new User(...)`, realiza los siguientes pasos:

1. Se crea un nuevo objeto vacío y se asigna a `this`.
2. El cuerpo de la función se ejecuta. Por lo general, modifica `this`, le agrega nuevas propiedades.
3. Se devuelve el valor de `this`.

En otras palabras, `new User (...)` hace algo como:

```js
function User(name) {
*!*
  // this = {};  (implicitly)
*/!*

  // add properties to this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (implicitly)
*/!*
}
```

Así que el resultado de `new User("Jack")` es el mismo objeto que:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Ahora, si queremos crear otros usuarios, podemos llamar `new User("Ann")`, `new User("Alice")` y así sucesivamente. Mucho más corto que usar literales cada vez, y también fácil de leer.

Ese es el propósito principal de los constructores: implementar un código de creación de objeto reutilizable.

Notemos una vez más: técnicamente, cualquier función se puede utilizar como un constructor. Es decir: cualquier función se puede ejecutar con `new`, y ejecutará el algoritmo anterior. La "letra mayúscula primero" es un acuerdo común, para dejar claro que una función debe ejecutarse con `new`.

"new function() { ... }"
Si tenemos muchas líneas de código relacionadas con la creación de un único objeto complejo, podemos envolverlas en una función constructora, como esta:

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
}();
```

No se puede volver a llamar al constructor porque no se guarda en ninguna parte, solo se crea y llama. Por lo tanto, este truco pretende encapsular el código que construye el único objeto, sin reutilización futura.

## Dual-syntax constructors: new.target

##### "Advanced stuff"

La sintaxis de esta sección rara vez se utiliza, omítala a menos que desee saberlo todo.

Dentro de una función, podemos verificar si fue llamada con `new` o sin ella, usando una propiedad especial `new.target`.

Está vacío para las llamadas regulares y es igual a la función si se llama con `new`:

```js run
function User() {
  alert(new.target);
}

// without "new":
*!*
User(); // undefined
*/!*

// with "new":
*!*
new User(); // function User { ... }
*/!*
```

Se puede usar para permitir que las llamadas `new` y regulares funcionen igual. Es decir, crea el mismo objeto:

```js run
function User(name) {
  if (!new.target) {
    // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John
```

Este enfoque se usa a veces en las bibliotecas para hacer que la sintaxis sea más flexible. Para que las personas puedan llamar a la función con o sin `new`, y todavía funciona.

Sin embargo, probablemente no sea algo bueno para usar en todas partes, porque omitir `new` hace que sea un poco menos obvio lo que está sucediendo. Con `new` todos sabemos que el nuevo objeto se está creando.

## Return from constructors

Usualmente, los constructores no tienen una declaración de `return`. Su tarea es escribir todo lo necesario en `this`, y automáticamente se convierte en el resultado.

Pero si hay una declaración de `return`, entonces la regla es simple:

- Si se llama a `return` con un objeto, entonces se devuelve en lugar de`this`.
- Si se llama a `return` con un primitivo, se ignora.

En otras palabras, `return` con un objeto devuelve ese objeto, en todos los demás casos se devuelve `this`.

Por ejemplo, aquí `return` anula `this` devolviendo un objeto:

```js run
function BigUser() {
  this.name = "John";

  return { name: "Godzilla" }; // <-- returns an object
}

alert(new BigUser().name); // Godzilla, got that object ^^
```

And here's an example with an empty `return` (or we could place a primitive after it, doesn't matter):

Y aquí hay un ejemplo con un `return` vacío (o podríamos colocar una primitiva después, no importa):

```js run
function SmallUser() {
  this.name = "John";

  return; // finishes the execution, returns this

  // ...
}

alert(new SmallUser().name); // John
```

Normalmente los constructores no tienen una declaración de `return`. Aquí mencionamos el comportamiento especial con los objetos devueltos, principalmente por el bien de la integridad.

"Omitiendo paréntesis"
Por cierto, podemos omitir paréntesis después de `new`, si no tiene argumentos:

```js
let user = new User(); // <-- no parentheses
// same as
let user = new User();
```

La omisión de paréntesis aquí no se considera un "buen estilo", pero la sintaxis está permitida por la especificación.

## Methods in constructor

El uso de funciones de construcción para crear objetos le da una gran flexibilidad. La función constructora puede tener parámetros que definen cómo construir el objeto y qué poner en él.

Por supuesto, podemos agregar a `this` no solo las propiedades, sino también los métodos.

Por ejemplo, `new User(name)` a continuación crea un objeto con el `name` dado y el método `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

## Summary

- Las funciones de constructor o, brevemente, constructores, son funciones regulares, pero hay un acuerdo común para nombrarlas con mayúscula primero.
- Las funciones de constructor solo deben ser llamadas usando `new`. Una llamada de este tipo implica una creación de `this` vacío al comienzo y devolver el poblado al final.

Podemos usar funciones de constructor para hacer múltiples objetos similares.

JavaScript proporciona funciones de construcción para muchos objetos de lenguaje incorporados: como `Date` para fechas, `Set` para conjuntos y otros que planeamos estudiar.

##### "Objects, we'll be back!"

En este capítulo solo cubrimos los conceptos básicos sobre objetos y constructores. Son esenciales para aprender más sobre los tipos de datos y las funciones en los próximos capítulos.

Después de que aprendamos que, en el capítulo <info:object-oriented-programming> volvemos a los objetos y los cubrimos en profundidad, incluyendo la herencia y las clases.
