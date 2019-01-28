# Destructuring assignment

Las dos estructuras de datos más utilizadas en JavaScript son `Object` y `Array`.

Los objetos nos permiten empaquetar muchos datos en una sola entidad y los arreglos nos permiten almacenar colecciones ordenadas. Entonces podemos hacer un objeto o una matriz y manejarlos como una sola entidad, o tal vez pasarlo a una llamada de función.

_Destructura de asignación_ o _destructuring_ es una sintaxis especial que nos permite "descomprimir" arreglos u objetos en un grupo de variables, ya que a veces son más convenientes. La destrucción también funciona muy bien con funciones complejas que tienen muchos parámetros, valores predeterminados y pronto veremos cómo se manejan estos también.

## Array destructuring

Un ejemplo de cómo se desestructura la matriz en variables:

```js
// we have an array with the name and surname
let arr = ["Ilya", "Kantor"]

*!*
// destructuring assignment
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

Ahora podemos trabajar con variables en lugar de miembros de matriz.

Se ve muy bien cuando se combina con `split` u otros métodos de devolución de matriz:

```js
let [firstName, surname] = "Ilya Kantor".split(" ");
```

##### "Destructuring" does not mean "destructive"."

Se llama "asignación de desestructuración" porque "se desestructura" al copiar elementos en variables. Pero la matriz en sí no se modifica.

Es solo una forma más corta de escribir:

```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```

##### "Ignore first elements"

Los elementos no deseados de la matriz también se pueden desechar mediante una coma adicional:

```js run
*!*
// first and second elements are not needed
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

En el código anterior, aunque se omiten los elementos primero y segundo de la matriz, el tercero se asigna a `title`, y el resto también se omite.

##### "Works with any iterable on the right-side"

... En realidad, podemos usarlo con cualquier iterable, no solo con arreglos:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

##### "Assign to anything at the left-side"

Podemos usar cualquier "asignables" en el lado izquierdo.

Por ejemplo, una propiedad de objeto:

```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(" ");

alert(user.name); // Ilya
```

##### "Looping with .entries()"

En el capítulo anterior vimos la [Object.entries(obj)](mdn:js/Object/entries) method.

Podemos usarlo con la desestructuración para repasar las claves y valores de un objeto:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over keys-and-values
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

... Y lo mismo para un mapa:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

for (let [key, value] of user.entries()) {
  alert(`${key}:${value}`); // name:John, then age:30
}
```

### The rest '...'

Si no solo queremos obtener los primeros valores, sino también reunir todo lo que sigue, podemos agregar un parámetro más que obtenga "el resto" utilizando tres puntos `"..."`:

```js run
let [name1, name2, ...rest] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic"
];

alert(name1); // Julius
alert(name2); // Caesar

alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

El valor de `rest` es la matriz de los elementos de matriz restantes. Podemos usar cualquier otro nombre de variable en lugar de `rest`, solo asegúrese de que tenga tres puntos antes y que sea el último en la tarea de desestructuración.

### Default values

Si hay menos valores en la matriz que variables en la asignación, no habrá error. Los valores ausentes se consideran indefinidos:

```js run
let [firstName, surname] = [];

alert(firstName); // undefined
```

Si queremos que un valor "predeterminado" reemplace al faltante, podemos proporcionarlo usando `=`:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

Los valores predeterminados pueden ser expresiones más complejas o incluso llamadas a funciones. Se evalúan solo si no se proporciona el valor.

Por ejemplo, aquí usamos la función `prompt` para dos valores predeterminados. Pero solo correrá por el que falta:

```js run
// runs only prompt for surname
let [name = prompt("name?"), surname = prompt("surname?")] = ["Julius"];

alert(name); // Julius (from array)
alert(surname); // whatever prompt gets
```

## Object destructuring

La tarea de desestructuración también funciona con objetos.

La sintaxis básica es:

```js
let {var1, var2} = {var1:…, var2…}
```

Tenemos un objeto existente en el lado derecho, que queremos dividir en variables. El lado izquierdo contiene un "patrón" para las propiedades correspondientes. En el caso simple, es una lista de nombres de variables en `{...}`.

Por ejemplo:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let { title, width, height } = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200
```

Las propiedades `options.title`, `options.width` y `options.height` son asignadas a las variables correspondientes. El orden no importa. Esto funciona también:

```js
// changed the order of properties in let {...}
let { height, width, title } = { title: "Menu", height: 200, width: 100 };
```

El patrón en el lado izquierdo puede ser más complejo y especificar la asignación entre propiedades y variables.

Si queremos asignar una propiedad a una variable con otro nombre, por ejemplo, `options.width` para ir a la variable llamada `w`, entonces podemos establecerla con dos puntos:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let { width: w, height: h, title } = options;

// width -> w
// height -> h
// title -> title

alert(title); // Menu
alert(w); // 100
alert(h); // 200
```

El colon muestra "qué: va a dónde". En el ejemplo anterior, la propiedad `width` va a `w`, la propiedad `height` va a `h`, y `title` se asigna al mismo nombre.

Para propiedades potencialmente faltantes, podemos establecer valores predeterminados usando `"="`, como esto:

```js run
let options = {
  title: "Menu"
};

let { width = 100, height = 200, title } = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200
```

Al igual que con matrices o parámetros de función, los valores predeterminados pueden ser cualquier expresión o incluso función de llamadas. Se evaluarán si no se proporciona el valor.

El siguiente código solicita el ancho, pero no el título.

```js run
let options = {
  title: "Menu"
};

let { width = prompt("width?"), title = prompt("title?") } = options;

alert(title); // Menu
alert(width); // (whatever you the result of prompt is)
```

También podemos combinar los dos puntos y la igualdad:

```js run
let options = {
  title: "Menu"
};

let { width: w = 100, height: h = 200, title } = options;

alert(title); // Menu
alert(w); // 100
alert(h); // 200
```

### The rest operator

¿Qué pasa si el objeto tiene más propiedades que nosotros tenemos variables? ¿Podemos tomar algo y luego asignar el "rest" en alguna parte?

La especificación para usar el operador de descanso (tres puntos) aquí está casi en el estándar, pero la mayoría de los navegadores aún no la admiten.

Se parece a esto:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

let { title, ...rest } = options;

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height); // 200
alert(rest.width); // 100
```

##### "Gotcha without `let`"

En los ejemplos anteriores, las variables se declararon justo antes de la asignación: `let {…} = {…}`. Por supuesto, podríamos usar variables existentes también. Pero hay una trampa.

Esto no funcionará:

```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

El problema es que JavaScript trata `{...}` en el flujo de código principal (no dentro de otra expresión) como un bloque de código. Dichos bloques de código pueden usarse para agrupar declaraciones, como esto:

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert(message);
}
```

Para mostrar a JavaScript que no es un bloque de código, podemos ajustar la tarea completa entre corchetes `(...)`:

```js run
let title, width, height;

// okay now
({ title, width, height } = { title: "Menu", width: 200, height: 100 });

alert(title); // Menu
```

## Nested destructuring

Si un objeto o una matriz contienen otros objetos y matrices, podemos usar patrones del lado izquierdo más complejos para extraer partes más profundas.

En el código siguiente, `options` tiene otro objeto en la propiedad`size` y una matriz en la propiedad `items`. El patrón en el lado izquierdo de la tarea tiene la misma estructura:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true // something extra that we will not destruct
};

// destructuring assignment on multiple lines for clarity
let {
  size: {
    // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title); // Menu
alert(width); // 100
alert(height); // 200
alert(item1); // Cake
alert(item2); // Donut
```

El objeto `options` completo, excepto `extra` que no se mencionó, se asigna a las variables correspondientes.

![](destructuring-complex.png)

Finalmente, tenemos `width`,`height`, `item1`, `item2` y `title` del valor predeterminado.

Eso sucede a menudo con las tareas de desestructuración. Tenemos un objeto complejo con muchas propiedades y queremos extraer solo lo que necesitamos.

Incluso aquí sucede:

```js
// take size as a whole into a variable, ignore the rest
let { size } = options;
```

## Smart function parameters

Hay ocasiones en que una función puede tener muchos parámetros, la mayoría de los cuales son opcionales. Eso es especialmente cierto para las interfaces de usuario. Imagina una función que crea un menú. Puede tener un ancho, una altura, un título, una lista de elementos, etc.

Aquí hay una mala manera de escribir tal función:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

En la vida real, el problema es cómo recordar el orden dusere los argumentos. Por lo general, los IDE intentan ayudarnos, especialmente si el código está bien documentado, pero aún así ... Otro problema es cómo llamar a una función cuando la mayoría de los parámetros están bien por defecto.

Como esto?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
```

Eso es feo. Y se vuelve ilegible cuando tratamos con más parámetros.

¡La destrucción viene al rescate!

Podemos pasar parámetros como un objeto, y la función los descompone inmediatamente en variables:

```js run
// we pass object to function
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...and it immediately expands it to variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

También podemos utilizar la desestructuración más compleja con objetos anidados y asignaciones de dos puntos:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({
  title = "Untitled",
  width: w = 100, // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
  alert(`${title} ${w} ${h}`); // My Menu 100 200
  alert(item1); // Item1
  alert(item2); // Item2
}

showMenu(options);
```

La sintaxis es la misma que para una asignación de desestructuración:

```js
function({
  incomingProperty: parameterName = defaultValue
  ...
})
```

Tenga en cuenta que dicha destrucción asume que `showMenu()` tiene un argumento. Si queremos todos los valores por defecto, deberíamos especificar un objeto vacío:

```js
showMenu({});

showMenu(); // this would give an error
```

Podemos solucionar este problema haciendo de `{}` el valor predeterminado para todo el proceso de desestructuración:

```js run
// simplified parameters a bit for clarity
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert(`${title} ${width} ${height}`);
}

showMenu(); // Menu 100 200
```

En el código anterior, todo el objeto de argumentos es `{}` por defecto, por lo que siempre hay algo que desestructurar.

## Summary

- La asignación de destrucción permite mapear instantáneamente un objeto o una matriz en muchas variables.
- La sintaxis del objeto:

```js
let {prop : varName = default, ...} = object
```

Esto significa que la propiedad `prop` debe ir a la variable `varName` y, si no existe tal propiedad, entonces debe usarse el valor `default`.

- La sintaxis de la matriz:

```js
let [item1 = default, item2, ...rest] = array
```

El primer elemento va a `item1`; el segundo entra en `item2`, todo el resto hace que la matriz `rest`.

- Para casos más complejos, el lado izquierdo debe tener la misma estructura que el derecho.
