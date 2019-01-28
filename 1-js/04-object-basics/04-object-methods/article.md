# Object methods, "this"

Los objetos generalmente se crean para representar entidades del mundo real, como usuarios, órdenes, etc.

```js
let user = {
  name: "John",
  age: 30
};
```

Y, en el mundo real, un usuario puede _act_: seleccionar algo del carrito de compras, iniciar sesión, cerrar sesión, etc.

Las acciones están representadas en JavaScript por funciones en propiedades.

## Method examples

Para empezar, enseñemos al `user` a decir hola:

```js run
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!
```

Aquí acabamos de utilizar una expresión de función para crear la función y asignarla a la propiedad `user.sayHi` del objeto.

Entonces podemos llamarlo. ¡El usuario ya puede hablar!

Una función que es la propiedad de un objeto se llama su _method_.

Entonces, aquí tenemos un método `sayHi` del objeto `user`.

Por supuesto, podríamos usar una función declarada previamente como un método, como este:

```js run
let user = {
  // ...
};

// first, declare
function sayHi() {
  alert("Hello!");
}

// then add as a method
user.sayHi = sayHi;

user.sayHi(); // Hello!
```

##### "Object-oriented programming"

Cuando escribimos nuestro código usando objetos para representar entidades, eso se llama [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: "OOP".

OOP es una gran cosa, una ciencia interesante por sí misma. ¿Cómo elegir las entidades adecuadas? ¿Cómo organizar la interacción entre ellos? Eso es arquitectura, y hay grandes libros sobre ese tema, como "Patrones de diseño: elementos de software orientado a objetos reutilizables" por E.Gamma, R.Helm, R.Johnson, J.Vissides o "Análisis y diseño orientados a objetos con Aplicaciones "por G.Booch, y más. Vamos a arañar la superficie de ese tema más adelante en el capítulo <info:object-oriented-programming>.

### Method shorthand

Existe una sintaxis más corta para los métodos en un objeto literal:

```js
// these objects do the same

let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// method shorthand looks better, right?
let user = {
  sayHi() {
    // same as "sayHi: function()"

    alert("Hello");
  }
};
```

Como se demostró, podemos omitir `"function"` y simplemente escribir `sayHi()`.

A decir verdad, las notaciones no son totalmente idénticas. Existen diferencias sutiles relacionadas con la herencia de objetos (que se tratarán más adelante), pero por ahora no importan. En casi todos los casos se prefiere la sintaxis más corta.

## "this" in methods

IEs común que un método de objeto necesite acceder a la información almacenada en el objeto para hacer su trabajo.

Por ejemplo, el código dentro de `user.sayHi()` puede necesitar el nombre del `usuario`.

**To access the object, a method can use the `this` keyword.**

El valor de `this` es el objeto" antes del punto ", el que se usa para llamar al método.

Por ejemplo:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(this.name);
  }
};

user.sayHi(); // John
```

Aquí, durante la ejecución de `user.sayHi ()`, el valor de `this` será `user`.

Técnicamente, también es posible acceder al objeto sin `this`, haciendo referencia a él a través de la variable externa:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" instead of "this"
*/!*
  }

};
```

... Pero tal código no es confiable. Si decidimos copiar `user` a otra variable, por ejemplo. `admin = user` y sobrescribe`user` con otra cosa, luego accederá al objeto equivocado.

Eso se demuestra a continuación:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // leads to an error
*/!*
  }

};


let admin = user;
user = null; // overwrite to make things obvious

admin.sayHi(); // Whoops! inside sayHi(), the old name is used! error!
```

Si usamos `this.name` en lugar de `user.name` dentro de `alert`, entonces el código funcionaría.

## "this" is not bound

En JavaScript, "this" palabra clave se comporta a diferencia de la mayoría de los otros lenguajes de programación. En primer lugar, se puede utilizar en cualquier función.

No hay error de sintaxis en el código de esa manera:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

El valor de `this` se evalúa durante el tiempo de ejecución. Y puede ser cualquier cosa.

Por ejemplo, la misma función puede tener diferente "esto" cuando se llama desde diferentes objetos:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert(this.name);
}

// use the same functions in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin["f"](); // Admin (dot or square brackets access the method – doesn't matter)
```

En realidad, podemos llamar a la función sin ningún objeto:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

En este caso, `this` es `undefined` en modo estricto. Si intentamos acceder a `this.name`, habrá un error.

En modo no estricto (si se olvida de `use strict`) el valor de`this` en ese caso será el _global object_ (`window` en un navegador, lo veremos más adelante). Este es un comportamiento histórico que ``use strict'`.

Tenga en cuenta que normalmente una llamada de una función que usa `this` sin un objeto no es normal, sino un error de programación. Si una función tiene `this`, entonces generalmente está destinada a ser llamada en el contexto de un objeto.

##### "The consequences of unbound `this`"

Si viene de otro lenguaje de programación, entonces probablemente esté acostumbrado a la idea de un "límite `this` ", donde los métodos definidos en un objeto siempre tienen `this` que hace referencia a ese objeto.

En JavaScript `this` es" libre ", su valor se evalúa en el momento de la llamada y no depende de dónde se declaró el método, sino de cuál es el objeto "antes del punto ".

El concepto de tiempo de ejecución evaluado `this` tiene ventajas y desventajas. Por un lado, una función puede ser reutilizada para diferentes objetos. Por otro lado, una mayor flexibilidad abre un lugar para los errores.

Aquí nuestra posición no es juzgar si esta decisión de diseño de lenguaje es buena o mala. Entenderemos cómo trabajar con él, cómo obtener beneficios y evadir problemas.

## Internals: Reference Type

##### "In-depth language feature"

Esta sección cubre un tema avanzado, para comprender mejor ciertos casos de borde.

Si quieres continuar más rápido, puedes omitirlo o posponerlo.

Una intrincada llamada de método puede perder `this`, por ejemplo:

```js run
let user = {
  name: "John",
  hi() {
    alert(this.name);
  },
  bye() {
    alert("Bye");
  }
};

user.hi(); // John (the simple call works)

// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

En la última línea hay un operador ternario que elige `user.hi` o `user.bye`. En este caso el resultado es `user.hi`.

El método se llama inmediatamente con paréntesis `()`. ¡Pero no funciona bien!

Puede ver que la llamada produce un error, porque el valor de `"this"` dentro de la llamada se convierte en `undefined`.

Esto funciona (método de punto de objeto):

```js
user.hi();
```

Esto no (método evaluado):

```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

¿Por qué? Si queremos entender por qué sucede, veamos cómo funciona la llamada `obj.method()`.

Mirando de cerca, podemos observar dos operaciones en la declaración `obj.method()`:

1. Primero, el punto `'.'` recupera la propiedad `obj.method`.
2. Luego los paréntesis `()` lo ejecutan.

Entonces, ¿cómo se pasa la información sobre `this` de la primera parte a la segunda?

Si colocamos estas operaciones en líneas separadas, entonces se perderá `this`:

```js run
let user = {
  name: "John",
  hi() {
    alert(this.name);
  }
};

// split getting and calling the method in two lines
let hi = user.hi;
hi(); // Error, because this is undefined
```

Aquí `hi = user.hi` coloca la función en la variable, y luego, en la última línea, es completamente independiente, por lo que no hay`this`.

**Para que las llamadas `user.hi ()` funcionen, JavaScript usa un truco: el punto `'.'` no devuelve una función, sino un valor del especial [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

El tipo de referencia es un "specification type". No podemos usarlo explícitamente, pero el lenguaje lo usa internamente.

El valor de Tipo de referencia es una combinación de tres valores `(base, name, strict)`, donde:

- `base` es el objeto.
- `name` es la propiedad.
- `strict` es verdadero si `use strict` está en efecto.

El resultado de un acceso de propiedad `user.hi` no es una función, sino un valor de Tipo de referencia. Para `user.hi` en modo estricto es:

```js
// Reference Type value
user, "hi", true;
```

Cuando se llama a los paréntesis `()` en el Tipo de referencia, reciben la información completa sobre el objeto y su método, y pueden establecer el correcto `this` (`=user` en este caso).

Cualquier otra operación como la asignación `hi = user.hi` descarta el tipo de referencia como un todo, toma el valor de`user.hi` (una función) y lo pasa. Así que cualquier otra operación "pierde" `this`.

Entonces, como resultado, el valor de `this` solo se pasa de la manera correcta si se llama a la función directamente mediante la sintaxis `obj.method()`o de corchetes `obj ['method']()` haz lo mismo aquí). Más adelante en este tutorial, aprenderemos varias maneras de resolver este problema, como [func.bind()](/bind#solution-2-bind).

## Arrow functions have no "this"

Arrow functions son especiales: no tienen su "propio" `this`. Si hacemos referencia a `this` de dicha función, se toma de la función "normal"externa.

Por ejemplo, aquí `arrow ()` usa `this` del método externo`user.sayHi ()`:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};


user.sayHi(); // Ilya
```

Esa es una característica especial de las funciones de flecha, es útil cuando en realidad no queremos tener un `this` separado, sino que lo tomamos del contexto externo. Mas adelante en el capitulo <info:arrow-functions> Vamos a profundizar más en las arrow functions.

## Summary

- Las funciones que se almacenan en las propiedades del objeto se denominan "methods".
- Los métodos permiten que los objetos "actúen" como `object.doSomething ()`.
- Los métodos pueden hacer referencia al objeto como `"this"`.

El valor de `this` se define en tiempo de ejecución.

- Cuando se declara una función, puede usar `this`, pero ese `this` no tiene valor hasta que se llama a la función.
- Esa función puede ser copiada entre objetos.
- Cuando se llama a una función en la sintaxis del "método": `object.method()`, el valor de `this` durante la llamada es `object`.

Tenga en cuenta que las funciones de flecha son especiales: no tienen ningún `this`. Cuando se accede a `this` dentro de una función de flecha, se toma desde afuera.
