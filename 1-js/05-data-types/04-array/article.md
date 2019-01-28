# Arrays 

Los objetos le permiten almacenar colecciones de valores con clave. Esta bien.

Pero muy a menudo nos encontramos con que necesitamos una *colección ordenada*, donde tenemos un primero, un segundo, un tercer elemento y así sucesivamente. Por ejemplo, necesitamos eso para almacenar una lista de algo: usuarios, productos, elementos HTML, etc.

No es conveniente usar un objeto aquí, porque no proporciona métodos para administrar el orden de los elementos. No podemos insertar una nueva propiedad "entre" las existentes. Los objetos simplemente no están destinados para tal uso.

Existe una estructura de datos especial llamada `Array`, para almacenar las colecciones ordenadas.

## Declaration

Hay dos sintaxis para crear un array vacío:

```js
let arr = new Array();
let arr = [];
```

Casi todo el tiempo, se utiliza la segunda sintaxis. Podemos suministrar elementos iniciales entre paréntesis:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

Los elementos del array están numerados, comenzando con cero.

Podemos obtener un elemento por su número entre corchetes:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

POdemos reeemplazar un elemento:

```js
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
```

...O añadir uno nuevo al array:

```js
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
```

El recuento total de los elementos en el array es su`length`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

También podemos usar `alert` para mostrar todo el array.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

Un array puede almacenar elementos de cualquier tipo.

Por ejemplo:

```js run no-beautify
// mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// get the object at index 1 and then show its name
alert( arr[1].name ); // John

// get the function at index 3 and run it
arr[3](); // hello
```


##### "Trailing comma"
Un array, al igual que un objeto, puede terminar con una coma:
```js 
let fruits = [
  "Apple", 
  "Orange", 
  "Plum"*!*,*/!*
];
```

El estilo de "coma final" facilita la inserción/eliminación de elementos, ya que todas las líneas se vuelven iguales.


## Methods pop/push, shift/unshift

Un [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) es uno de los usos más comunes de un array. En informática, esto significa una colección ordenada de elementos que admite dos operaciones:

- `push` añade un elemento al final.
- `shift` obtiene un elemento desde el principio, avanzando en la cola, de modo que el segundo elemento se convierta en el primero.
![](queue.png)

Los arrays soportan ambas operaciones.

En la práctica lo encontramos muy a menudo. Por ejemplo, una cola de mensajes que deben mostrarse en pantalla.

Hay otro caso de uso para los arrays: la estructura de datos llamada [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). 

Soporta dos operaciones:

- `push` agrega un elemento al final.
- `pop` toma un elemento del final.

Así que los nuevos elementos se agregan o se toman siempre del "fin".

Una pila generalmente se ilustra como un paquete de cartas: las nuevas cartas se agregan a la parte superior o se toman de la parte superior:

![](stack.png)

Para las pilas, el último artículo pushed se recibe primero, también se denomina principio LIFO (último en entrar, primero en salir). Para las colas, tenemos FIFO (Primero en entrar, primero en salir).

Lps arrays en JavaScript pueden funcionar como una cola y como una pila. Le permiten agregar/eliminar elementos tanto desde el principio como desde el final.

En informática la estructura de datos que lo permite se denomina [deque](https://en.wikipedia.org/wiki/Double-ended_queue).

**Methods that work with the end of the array:**

`pop`
:Extrae el último elemento del array y lo devuelve:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // remove "Pear" and alert it

    alert( fruits ); // Apple, Orange
    ```

`push`
: Agrega el elemento al final del array:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    El llamado `fruits.push(...)` es igual a `fruits[fruits.length] = ...`.

**Methods that work with the beginning of the array:**

`shift`
: Extrae el primer elemento del array y lo devuelve:

    ```js
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // remove Apple and alert it

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: Agregue el elemento al principio del array:

    ```js
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

Los métodos `push` y `unshift` pueden agregar múltiples elementos a la vez:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## Internals

Un array es un tipo especial de objeto. Los corchetes utilizados para acceder a una propiedad `arr[0]` en realidad provienen de la sintaxis del objeto. Los números se utilizan como claves.

Extienden objetos que proporcionan métodos especiales para trabajar con colecciones ordenadas de datos y también la propiedad `length`. Pero en el núcleo sigue siendo un objeto.

Recuerda, solo hay 7 tipos básicos en JavaScript. El array es un objeto y por lo tanto se comporta como un objeto.

Por ejemplo, se copia por referencia:

```js run
let fruits = ["Banana"]

let arr = fruits; // copy by reference (two variables reference the same array)

alert( arr === fruits ); // true
 
arr.push("Pear"); // modify the array by reference

alert( fruits ); // Banana, Pear - 2 items now
```

... Pero lo que hace que los arreglos sean realmente especiales es su representación interna. El motor intenta almacenar sus elementos en el área de memoria contigua, uno tras otro, tal como se muestra en las ilustraciones de este capítulo, y también hay otras optimizaciones para hacer que los arreglos funcionen realmente rápido.

Pero todos se rompen si dejamos de trabajar con un array como con una "colección ordenada" y comenzamos a trabajar con ella como si fuera un objeto normal.

Por ejemplo, técnicamente podemos hacer esto:

```js
let fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name
```

Eso es posible, porque los arreglos son objetos en su base. Podemos añadirles cualquier propiedad.

Pero el motor verá que estamos trabajando con el array como con un objeto normal. Las optimizaciones específicas del array no son adecuadas para estos casos y se desactivarán, sus beneficios desaparecerán.

Las formas de hacer mal uso de un array:


- Agrega una propiedad no numérica como `arr.test = 5`.
- Hace agujeros, como: agrega `arr[0]` y luego `arr[1000]` (y nada entre ellos).
- Rellene la matriz en el orden inverso, como `arr[1000]`, `arr[999]` y así sucesivamente.

Por favor, piense en los arrays como estructuras especiales para trabajar con los *datos ordenados . Proporcionan métodos especiales para eso. Los arrays se ajustan cuidadosamente dentro de los motores de JavaScript para trabajar con datos ordenados contiguos, utilícelos de esta manera. Y si necesita claves arbitrarias, es muy probable que realmente necesite un objeto regular `{}`.

## Performance

Los métodos `push/pop` se ejecutan rápidamente, mientras que` shift/unshift` son lentos.

![](array-speed.png)

¿Por qué es más rápido trabajar con el final de un array que con su comienzo? Veamos que pasa durante la ejecución:

```js
fruits.shift(); // take 1 element from the start
```

No es suficiente tomar y eliminar el elemento con el número `0`. Otros elementos también deben ser renumerados.

La operación `shift` debe hacer 3 cosas:

1. Eliminar el elemento con el índice `0`.
2. Mueva todos los elementos a la izquierda, renumévelos del índice `1` a` 0`, de `2` a `1` y así sucesivamente.
3. Actualizar la propiedad `length`.
![](array-shift.png)

**The more elements in the array, the more time to move them, more in-memory operations.**

Lo mismo sucede con `unshift`: para agregar un elemento al principio del array, primero necesitamos mover los elementos existentes a la derecha, aumentando sus índices.

¿Y qué hay de `push/pop`? No necesitan mover nada. Para extraer un elemento del final, el método `pop` limpia el índice y acorta `length`.

Las acciones para la operación `pop`:

```js
fruits.pop(); // take 1 element from the end
```

![](array-pop.png)

**The `pop` method does not need to move anything, because other elements keep their indexes. That's why it's blazingly fast.**

Lo similar con el método `push`.
## Loops

Una de las formas más antiguas de ciclar elementos de array es el bucle `for` sobre los índices:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

Pero para arrays hay otra forma de bucle,`for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit ); 
}
```

El `for..of` no da acceso al número del elemento actual, solo su valor, pero en la mayoría de los casos es suficiente. Y es más corto.

Técnicamente, como los arrays son objetos, también es posible usar `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

But that's actually a bad idea. There are potential problems with it:

1. El bucle `for..in` itera sobre *todas las propiedades*, no solo las numéricas.

  En el navegador y en otros entornos, los llamados objetos "de tipo array" *se ven como arrays*. Es decir, tienen propiedades `length` e indexes, pero también pueden tener otras propiedades y métodos no numéricos, que normalmente no necesitamos. Sin embargo, el bucle `for..in` los listará. Entonces, si necesitamos trabajar con objetos similares a un array, estas propiedades "adicionales" pueden convertirse en un problema.
2. El bucle `for..in` está optimizado para objetos genéricos, no para arreglos, y por lo tanto es 10-100 veces más lento. Por supuesto, todavía es muy rápido. La aceleración puede ser importante solo en cuellos de botella o simplemente irrelevante. Pero aún así debemos ser conscientes de la diferencia.

En general, no deberíamos usar `for..in` para arrays.


## A word about "length"

La propiedad `length` se actualiza automáticamente cuando modificamos el array. Para ser precisos, en realidad no es el conteo de valores en el array, sino el mayor índice numérico más uno.

Por ejemplo, un solo elemento con un índice grande da una gran longitud:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Tenga en cuenta que normalmente no usamos arrays de esa manera.

Otra cosa interesante acerca de la propiedad `length` es que se puede escribir.

Si lo aumentamos manualmente, no pasa nada interesante. Pero si lo disminuimos, el array se trunca. El proceso es irreversible, aquí está el ejemplo:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return
```
 Entonces, la forma más sencilla de borrar la matriz es:`arr.length = 0;`.


## new Array() [#new-array]


Hay una sintaxis más para crear un array:
```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

Rara vez se usa, porque los corchetes `[]` son más cortos. También hay una característica difícil con él.

Si se llama a `new Array` con un solo argumento que es un número, entonces crea un array *sin elementos, pero con la longitud dada*.

Veamos cómo se puede disparar en el pie:

```js run
let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2
```

En el código anterior, `new Array(number)` tiene todos los elementos `undefined`.

Para evadir tales sorpresas, usualmente usamos corchetes, a menos que realmente sepamos lo que estamos haciendo.

## Multidimensional arrays

Los arrays pueden tener elementos que también son arrays. Podemos usarlo para arrays multidimensionales, para almacenar arrays:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // the central element
```

## toString

Los arrays tienen su propia implementación del método `toString` que devuelve una lista de elementos separados por comas.

Por ejemplo:

```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Además, intentemos esto:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Los arrays no tienen `Symbol.toPrimitive`, ni un `valueOf` viable, implementan solo la conversión `toString`, por lo que aquí `[]`se convierte en una cadena vacía, `[1]` se convierte en `"1"` y `[1,2]` se convierte en `"1,2"`.

Cuando el operador binario más `"+"` agrega algo a una cadena, también la convierte en una cadena, por lo que el siguiente paso es así:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Summary

Array es un tipo especial de objeto, adecuado para almacenar y administrar elementos de datos ordenados.

- La declaracion:

    ```js
    // square brackets (usual)
    let arr = [item1, item2...];

    // new Array (exceptionally rare)
    let arr = new Array(item1, item2...);
    ```

    La llamada a `new Array(number)` crea un array con la longitud dada, pero sin elementos.

- La propiedad `length` es la longitud del array o, para ser precisos, su último índice numérico más uno. Se ajusta automáticamente por métodos de array.
- Si acortamos `length` manualmente, el array se trunca.

Podemos usar un array como deque con las siguientes operaciones:

- `push(...items)` añade`items` al final.
- `pop()` elimina el elemento del final y lo devuelve.
- `shift()` elimina el elemento desde el principio y lo devuelve.
- `unshift(...items)` agrega elementos al principio.

Para recorrer los elementos del array:
  - `for (let i=0; i<arr.length; i++)` -- Funciona más rápido, compatible con el navegador antiguo.
  - `for (let item of arr)` -- la sintaxis moderna para los artículos solamente,
  - `for (let i in arr)` -- nunca usar.

Volveremos a los arrays y estudiaremos más métodos para agregar, eliminar, extraer elementos y ordenar arrays en el capítulo. <info:array-methods>.

