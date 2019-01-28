La llamada `arr[2]()` es sintácticamente el antiguo `obj[método]()`, en la función de `obj` tenemos `arr`, y en la función de `method` tenemos `2` .

Entonces tenemos una llamada de la función `arr[2]` como un método de objeto. Naturalmente, recibe `this` que hace referencia al objeto `arr` y genera el array:
```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // "a","b",function
```

El array tiene 3 valores: inicialmente tenía dos, más la función.