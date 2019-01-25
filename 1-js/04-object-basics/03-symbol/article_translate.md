# Symbol type

Por especificación, las claves de propiedad de objeto pueden ser de tipo `string` o de tipo de `symbol`. No son `numbers`, no son `booleans`, sólo `string` o `symbols`, sólo estos dos `types`.

Hasta ahora sólo hemos visto `strings`. Ahora veamos las ventajas que nos pueden dar los `symbols`.

## Symbols

"Symbol" representa un único identificador.

Un valor de este _type_ lo podemos crear usando `Symbol()`:

```js
// id es un nuevo symbol
let id = Symbol();
```

Al `symbol` le podemos dar una descripción (también conocida como _symbol name_), muy útil para propósitos de depuración:

```js
// id es un symbol con la descripción "id"
let id = Symbol("id");
```

Se garantiza que los `symbols` son únicos. Incluso si creamos muchos símbolos con la misma descripción, son valores diferentes. La descripción es sólo una etiqueta que no afecta a nada.

Por ejemplo, aquí hay dos `symbols` con la misma descripción, pero no son iguales:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Si estás familiarizado con Ruby u otro idioma que también tenga algún tipo de `symbols`, no te dejes engañar. Los `symbols` de JavaScript son diferentes.

##### "Los symbols no se convierten automáticamente a una cadena"

La mayoría de los valores en JavaScript admiten la conversión implícita a un `string`. Por ejemplo, podemos hacer `alert` a casi cualquier valor, y funcionará. Los `symbols` son especiales. No se convierten automáticamente.

Por ejemplo, este `alert` nos mostrará un error:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Si realmente queremos mostrar un `symbol`, necesitamos instanciarlo con un `.toString()`, tal y como mostramos aquí:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ahora funciona
*/!*
```

Eso es una "protección del lenguaje" (language guard) contra el desorden, porque los `strings` y los `symbols` son fundamentalmente diferentes.

## Propiedades "ocultas" - "Hidden" properties

Los símbolos nos permiten crear propiedades "ocultas" de un objeto, a las que ninguna otra parte del código puede acceder o sobrescribir.

Por ejemplo, si queremos almacenar un "identificador" (identifier) para el objeto `user`, podemos usar `symbol` como una llave para ello:

```js run
let user = { name: "John" };
let id = Symbol("id");

user[id] = "ID Value";
alert(user[id]); //podemos acceder a los datos usando el symbol
```

¿Cuál es el principal beneficio de usar `Symbol("id")` sobre el string `"id"`?

Veamos el siguiente ejemplo un poco más en profundidad.

Imagina que una secuencia de comandos desea tener su propia propiedad "id" dentro de `user`, para sus propios fines. Esa puede ser otra biblioteca de JavaScript, por lo que los scripts no son conscientes entre sí.

Luego, ese script puede crear su propio `Symbol (" id ")`, como este:

```js
// ...
let id = Symbol("id");

user[id] = "Tercer id value";
```

No habrá conflicto, porque los `symbols` siempre son diferentes, incluso si tienen el mismo nombre.

Ahora note que si usamos una cadena `" id "` en lugar de un `symbol` para el mismo propósito, entonces _habrá_ un conflicto:

```js run
let user = { name: "John" };

//  nuestro script usa la propiedad "id"
user.id = "ID Value";

// si después otro script usa el "id" para esta finalidad...

user.id = "Their id value";
// boom! sobreescrito!
```

### Symbols en un literal

Si queremos usar el `symbol` en un objecto literal, necesitamos los brackets (llaves).

Como por ejemplo:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // no solo "id: 123"
*/!*
};
```

Esto es debido a que necesitamos el valor desde la variable `id` como una 'key', no el String `id`.

### Symbols saltan en for..in

Las propiedades "symbolic" no participan en el bucle `for..in`.

Por ejemplo:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // nombre, age (no symbols)
*/!*

// el acceso directo por el symbol funciona!
alert( "Direct: " + user[id] );
```

Eso es parte del concepto general de "esconderse". Si otro script o una biblioteca recorre nuestro objeto, no accederá de manera inesperada a una propiedad `symbol`.

Por el contrario, [Object.assign](mdn:js/Object/assign) copian ambas propiedades de `string` y `symbol`:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert(clone[id]); // 123
```

No hay paradoja aquí. Eso es por diseño. La idea es que cuando clonamos o fusionamos objetos, generalmente queremos que _todas_ las propiedades se copien (incluyendo símbolos como `id`).

##### "Las propiedades de las claves de otros types son _forzadas_ (coerced) a strings"

Solo podemos usar `strings` o `symbols` como claves en objetos. Otros tipos se convierten en `strings`.

Por ejemplo, un número `0` se convierte en una cadena`"0"` cuando se usa como clave de propiedad:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// Ambas alertas acceden a la misma propiedad( el numero 0 es forzado a ser un  string "0")
alert(obj["0"]); // test
alert(obj[0]); // test (same property)
```

## Global symbols

Como hemos visto, generalmente todos los `symbols` son diferentes, incluso si tienen los mismos nombres. Pero a veces queremos que los `symbols` con el mismo nombre sean entidades iguales.

Por ejemplo, diferentes partes de nuestra aplicación quieren acceder al `symbol`: `id` "que significa la misma propiedad.

Para lograrlo, existe un símbolo _global registry_. Podemos crear `symbols` y acceder a ellos más tarde, y garantiza que los accesos repetidos con el mismo nombre devuelvan exactamente el mismo símbolo.

Para crear o leer un `symbol` en el registro, usa `Symbol.for (key)`.

Esa llamada verifica el registro global, y si hay un símbolo descrito como `key`, luego lo devuelve, de lo contrario crea un nuevo símbolo`Symbol (key)`y lo almacena en el registro mediante la `key` dada.

Por ejemplo:

```js run
// lo lee desde el registro global
let id = Symbol.for("id"); // si el symbol no existe, es creado

// leelo de nuevo
let idAgain = Symbol.for("id");

// el mismo simbolo
alert(id === idAgain); // true
```

Simbolos dentro del registro son llamados _global symbols_. Queremos una _application_wide symbol_, accesibles desde cualquier lugar en el código, y para eso han sido creados.

```smart header="Suena como Ruby"

En algunos lenguajes de programación como Ruby, sólo hay un `symbol` por nombre

En JavaScript, como podemos ver, es perfecto para los simbolos globales.
```

### Symbol.keyFor

Para los símbolos globales, no solo `Symbol.for (key)` devuelve un símbolo por nombre, sino que hay una llamada inversa: `Symbol.keyFor (sym)`, que hace lo contrario: devuelve un nombre por un símbolo global.

Por ejemplo:

```js run
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// consigue un nombre para el simbolo
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

El `Symbol.keyFor` utiliza internamente el registro global de símbolos para buscar la clave del símbolo. Así que no funciona para los símbolos no globales. Si el símbolo no es global, no podrá encontrarlo y devolverá "undefined".

Por ejemplo:

```js run
alert(Symbol.keyFor(Symbol.for("name"))); // name, simbolo global

alert(Symbol.keyFor(Symbol("name2"))); // undefined, el argumento no es un simbolo global
```

## Símbolos del sistema

Existen muchos símbolos de "sistema" que JavaScript usa internamente, y podemos usarlos para afinar varios aspectos de nuestros objetos.

Estos están listados en: [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...y demás.

Por ejemplo, `Symbol.toPrimitive` nos permite describir objeto a conversión primitiva. Veremos su uso muy pronto.

Los otros símbolos nos serán familiares una vez estudiemos las correspondientes características del lenguaje.

## En resumen

`Symbol` es un primitivo type para únicos identificadores.

Symbols son creados con `Symbol()`, llamados con una descripción opcional.

Los símbolos son siempre valores diferentes, incluso si tienen el mismo nombre. Si queremos que los símbolos con el mismo nombre sean iguales, entonces deberíamos usar el registro global: `Symbol.for (key)` que devuelve (crea si es necesario) un símbolo global con `key` como nombre. Las llamadas múltiples de `Symbol.for` devuelven exactamente el mismo símbolo.

Symbols tienen dos casos de uso principales:

1. "Ocultas" propiedades.
   Si queremos agregar una propiedad a un objeto que "pertenece" a otro script o una biblioteca, podemos crear un símbolo y usarlo como una clave de propiedad. Una propiedad simbólica no aparece en `for..in`, por lo que no se incluirá ocasionalmente. Además, no se podrá acceder directamente, ya que otro script no tiene nuestro símbolo, por lo que no intervendrá ocasionalmente en sus acciones.

   Así que podemos "ocultamente" esconder algo en los objetos que necesitamos, pero otros no deberían verlos, usando propiedades simbólicas.

2. Hay muchos símbolos de sistema utilizados por JavaScript que son accesibles como `Símbolo. *`. Podemos usarlos para alterar algunos comportamientos incorporados. Por ejemplo, más adelante en el tutorial usaremos `Symbol.iterator` para [iterables] (info: iterable),`Symbol.toPrimitive` para configurar [conversión de objeto a primitivo] (info: object-toprimitive) y así sucesivamente.

Técnicamente, los símbolos no están 100% ocultos. Existe un método incorporado [Object.getOwnPropertySymbols (obj)] (mdn: js / Object / getOwnPropertySymbols) que nos permite obtener todos los símbolos. También hay un método llamado [Reflect.ownKeys (obj)] (mdn: js / Reflect / ownKeys) que devuelve todas las claves de un objeto, incluidas las simbólicas. Así que no están realmente ocultos. Pero la mayoría de las bibliotecas, los métodos incorporados y las construcciones de sintaxis se adhieren a un acuerdo común de que lo son. Y el que explícitamente llama a los métodos antes mencionados probablemente entiende bien lo que está haciendo.
