Para encontrar todos los anagramas, dividamos cada palabra en letras y clasifiquemos. Cuando se clasifican las letras, todos los anagramas son iguales.

Por ejemplo:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Usaremos las variantes ordenadas por letras como claves de mapa para almacenar solo un valor por cada clave:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // split the word by letters, sort them and join back
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

La clasificación de las letras se realiza mediante la cadena de llamadas en la línea `(*)`.

Para mayor comodidad, dividámoslo en varias líneas:

```js
let sorted = arr[i] // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Dos palabras diferentes `'PAN'` y`' nap'` reciben la misma forma ordenada por letras `'anp'`.

La siguiente línea pone la palabra en el mapa:

```js
map.set(sorted, word);
```

Si alguna vez volvemos a encontrarnos con una palabra de la misma forma ordenada por letras, entonces se sobrescribiría el valor anterior con la misma clave en el mapa. Así que siempre tendremos como máximo una palabra por letra.

Al final, `Array.from map.values())` toma un iterable sobre los valores del mapa (no necesitamos claves en el resultado) y devuelve un array de ellos.

Aquí también podríamos usar un objeto plano en lugar del `Mapa`, porque las claves son strings.

Así es como se ve la solución:

```js run
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
