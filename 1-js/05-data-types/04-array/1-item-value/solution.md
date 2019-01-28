EL resultado es`4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Eso es porque los arrays son objetos. Entonces, tanto `shoppingCart` como` fruits` son las referencias al mismo array.

