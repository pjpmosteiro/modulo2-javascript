importance: 5

---

# Create an extendable calculator


Cree una función constructora `Calculator` que crea objetos de calculadora" extendable ".

La tarea consta de dos partes.

1. Primero, implemente el método `calculate(str)` que toma una cadena como `" 1 + 2 "` en el formato "NÚMBER operator NUMBER" (delimitado por espacios) y devuelve el resultado. Debe entenderse más `+` y menos `-`.

     Ejemplo de uso:
    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2.Luego agregue el método `addMethod(name, func)` que enseña a la calculadora una nueva operación. Toma el operador `name` y la función de dos argumentos` func(a, b) `que lo implementa.

     Por ejemplo, agreguemos la multiplicación  `*`, la división `/` y la potencia `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- No hay corchetes o expresiones complejas en esta tarea.
- Los números y el operador están delimitados con exactamente un espacio.
- Puede haber un manejo de errores si desea agregarlo.
