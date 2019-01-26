# Methods of primitives

JavaScript nos permite trabajar con primitivas (cadenas, números, etc.) como si fueran objetos.

También proporcionan métodos para llamar como tal. Los estudiaremos pronto, pero primero veremos cómo funciona porque, por supuesto, las primitivas no son objetos (y aquí lo haremos aún más claro).

Veamos las distinciones clave entre primitivos y objetos.

Una primitiva

- Es un valor de un tipo primitivo.
- Hay 6 tipos primitivos: `string`,`number`, `boolean`,`symbol`, `null` y `undefined`.

Un objeto

- Es capaz de almacenar múltiples valores como propiedades.
- Se puede crear con `{}`, por ejemplo: `{nombre: "John", edad: 30}`. Hay otros tipos de objetos en JavaScript; Las funciones, por ejemplo, son objetos.

Una de las mejores cosas de los objetos es que podemos almacenar una función como una de sus propiedades.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```
Así que aquí hemos creado un objeto `john` con el método` sayHi`.

Ya existen muchos objetos incorporados, como los que funcionan con fechas, errores, elementos HTML, etc. Tienen diferentes propiedades y métodos.

¡Pero, estas características vienen con un costo!

Los objetos son "más pesados" que los primitivos. Requieren recursos adicionales para soportar la maquinaria interna. Pero como las propiedades y los métodos son muy útiles en la programación, los motores de JavaScript intentan optimizarlos para reducir la carga adicional.

## A primitive as an object

Aquí está la paradoja que enfrenta el creador de JavaScript:

- Hay muchas cosas que uno querría hacer con una primitiva como una cadena o un número. Sería genial acceder a ellos como métodos.
- Los primitivos deben ser lo más rápidos y livianos posible.

La solución parece un poco incómoda, pero aquí está:

1. Los primitivos son todavía primitivos. Un solo valor, según se desee.
2. El lenguaje permite el acceso a métodos y propiedades de cadenas, números, booleanos y símbolos.
3. Cuando esto sucede, se crea un "contenedor de objetos" especial que proporciona la funcionalidad adicional y luego se destruye.

Los "envoltorios de objetos" son diferentes para cada tipo primitivo y se denominan: `String`, `Number`, `Boolean` y `Symbol`. Por lo tanto, proporcionan diferentes conjuntos de métodos.

Por ejemplo, existe un método [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) que devuelve una cadena en mayúscula.

Así es como funciona:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, ¿verdad? Esto es lo que realmente sucede en `str.toUpperCase()`:

1. La cadena `str` es una primitiva. Entonces, en el momento de acceder a su propiedad, se crea un objeto especial que conoce el valor de la cadena y tiene métodos útiles, como `toUpperCase()`.
2. Ese método se ejecuta y devuelve una nueva cadena (mostrada por `alert`).
3. El objeto especial se destruye, dejando solo el `str` primitivo.

Así que los primitivos pueden proporcionar métodos, pero aún siguen siendo ligeros.

El motor de JavaScript optimiza altamente este proceso. Incluso puede omitir la creación del objeto extra en absoluto. Pero aún debe cumplir con la especificación y comportarse como si creara una.

Un número tiene métodos propios, por ejemplo, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) redondea el número a la precisión dada:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```
Veremos métodos más específicos en los capítulos <info:number> y <info:string>.

Algunos lenguajes como Java nos permiten crear "objetos envoltorios" para primitivos utilizando explícitamente una sintaxis como `new Number(1)` o `new Boolean(false)`.

En JavaScript, eso también es posible por razones históricas, pero altamente **no recomendado**. Las cosas se volverán locas en varios lugares.

Por ejemplo:

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object"!
```

Y porque lo que sigue, `cero`, es un objeto, la alerta se mostrará:

```js run
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy?!?" );
}
```

Por otro lado, usar las mismas funciones `String/Number/Boolean` sin `new` es algo totalmente sano y útil. Convierten un valor al tipo correspondiente: a una cadena, un número o un valor booleano (primitivo).

Por ejemplo, esto es completamente válido:

```js
let num = Number("123"); // convert a string to number
```

Las primitivas especiales `null` y `undefined` son excepciones. No tienen "objetos de envoltura" correspondientes y no proporcionan ningún método. En cierto sentido, son "los más primitivos".

Un intento de acceder a una propiedad de tal valor daría el error:

```js run
alert(null.test); // error
````

## Summary

- Los primitivos, excepto `null` y `undefined`, proporcionan muchos métodos útiles. Los estudiaremos en los próximos capítulos.
- Formalmente, estos métodos funcionan a través de objetos temporales, pero los motores de JavaScript están bien ajustados para optimizar eso internamente, por lo que no son costosos de llamar.
