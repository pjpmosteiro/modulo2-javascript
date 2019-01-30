# Date and time

Encontremos un nuevo objeto integrado: [Date](mdn:js/Date). Almacena la fecha, hora y proporciona métodos para la gestión de date/time.

Por ejemplo, podemos usarlo para almacenar los tiempos de creación/modificación, para medir el tiempo o simplemente para imprimir la fecha actual.

## Creation

Para crear un nuevo objeto `Date`, llame a `new Date()` con uno de los siguientes argumentos:

`new Date()`
: Sin argumentos: crea un objeto `Date` para la fecha y hora actuales:

    ```js run
    let now = new Date();
    alert( now ); // shows current date/time
    ```

`new Date(milliseconds)`
: Crea un objeto `Date` con el tiempo igual al número de milisegundos (1/1000 de un segundo) transcurrido después del 1 de enero de 1970 UTC + 0.

    ```js run
    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // now add 24 hours, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    La cantidad de milisegundos que ha pasado desde principios de 1970 se denomina *timestamp*.


    Es una representación numérica ligera de una fecha. Siempre podemos crear una fecha a partir de una marca de timestamp `new Date (timestamp)` y convertir el objeto `Date` existente en una marca de tiempo usando el método` date.getTime()` (ver más abajo).

`new Date(datestring)`
: Si hay un solo argumento, y es una cadena, se analiza con el algoritmo `Date.parse` (ver más abajo).

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // The time portion of the date is assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)



    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Cree la fecha con los componentes dados en la zona horaria local. Solo dos primeros argumentos son obligatorios.

    Nota:

    - El `año` debe tener 4 dígitos:` 2013` está bien, `98` no lo está.

    - El recuento de `mes` comienza con` 0` (enero), hasta `11` (diciembre).

    - El parámetro `fecha` es en realidad el día del mes, si está ausente, se asume` 1`.

    - Si `horas / minutos / segundos / ms 'están ausentes, se asume que son iguales a` 0`.

    Por ejemplo:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
    ```


    La precisión mínima es de 1 ms (1/1000 seg):


    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Access date components

Hay muchos métodos para acceder al año, mes, etc. desde el objeto `Date`. Pero se pueden recordar fácilmente cuando se categorizan.

[getFullYear()](mdn:js/Date/getFullYear)
: Obtener el año (4 digitos)

[getMonth()](mdn:js/Date/getMonth)
: Obtener el mes, **from 0 to 11**.

[getDate()](mdn:js/Date/getDate)
: Obtenga el día del mes, del 1 al 31.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
:Consigue los componentes de tiempo correspondientes..

##### "Not `getYear()`, but `getFullYear()`"

Muchos motores de JavaScript implementan un método no estándar `getYear()`. Este método está en desuso. Devuelve año de 2 dígitos a veces. Por favor nunca lo uses. Hay `getFullYear()` para el año.

Adicionalmente, podemos obtener un día de la semana:

[getDay()](mdn:js/Date/getDay)
: Obtenga el día de la semana, de `0` (domingo) a `6` (sábado). El primer día siempre es el domingo, en algunos países no es así, pero no se puede cambiar.

**All the methods above return the components relative to the local time zone.**

También están los de UTC, que devuelven día, mes, año, etc. para la zona horaria UTC+0:

[getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Sólo inserta el `"UTC"` justo después de `"get"`.

Si su zona horaria local se desplaza en relación con UTC, entonces el código a continuación muestra diferentes horas:

```js run
// current date
let date = new Date();

// the hour in your current time zone
alert(date.getHours());

// the hour in UTC+0 time zone (London time without daylight savings)
alert(date.getUTCHours());
```

Además de los métodos dados, hay dos métodos especiales que no tienen una variante UTC:

[getTime()](mdn:js/Date/getTime)
: Devuelve la marca de tiempo para la fecha: una cantidad de milisegundos transcurridos desde el 1 de enero de 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Devuelve la diferencia entre la zona horaria local y UTC, en minutos:

    ```js run
    // if you are in timezone UTC-1, outputs 60
    // if you are in timezone UTC+3, outputs -180
    alert( new Date().getTimezoneOffset() );

    ```

## Setting date components

The following methods allow to set date/time components:

Los siguientes métodos permiten configurar los componentes de fecha/hora:

- [`setFullYear(year [, month, date])`](mdn:js/Date/setFullYear)
- [`setMonth(month [, date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](mdn:js/Date/setHours)
- [`setMinutes(min [, sec, ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec [, ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (establece la fecha completa en milisegundos desde el 01.01.1970 UTC)

Cada uno de ellos, excepto `setTime()`, tiene una variante UTC, por ejemplo: `setUTCHours()`.

Como podemos ver, algunos métodos pueden configurar múltiples componentes a la vez, por ejemplo `setHours`. Los componentes que no se mencionan no se modifican.

Por ejemplo:

```js run
let today = new Date();

today.setHours(0);
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.
```

## Autocorrection

La _autocorrección_ es una característica muy útil de los objetos `Date`. Podemos establecer valores fuera de rango, y se ajustará automáticamente.

Por ejemplo:

```js run
let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
```

Los componentes de fecha fuera de rango se distribuyen automáticamente.

Digamos que necesitamos aumentar la fecha "28 de febrero de 2016" en 2 días. Puede ser "2 de marzo" o "1 de marzo" en caso de un año bisiesto. No necesitamos pensar en ello. Sólo agregue 2 días. El objeto `Date` hará el resto:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Esa característica se utiliza a menudo para obtener la fecha después de un período de tiempo determinado. Por ejemplo, obtengamos la fecha para "70 segundos después de ahora":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert(date); // shows the correct date
```

También podemos establecer cero o incluso valores negativos. Por ejemplo:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert(date);

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert(date); // 31 Dec 2015
```

## Date to number, date diff

Cuando un objeto `Date` se convierte en número, se convierte en la marca de tiempo igual a `date.getTime()`:

```js run
let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
```

El efecto secundario importante: las fechas se pueden restar, el resultado es su diferencia en ms.

Eso puede ser usado para mediciones de tiempo:

```js run
let start = new Date(); // start counting

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // done

alert(`The loop took ${end - start} ms`);
```

## Date.now()

Si solo queremos medir la diferencia, no necesitamos el objeto `Date`.

Hay un método especial `Date.now()` que devuelve la marca de tiempo actual.

Es semánticamente equivalente a `new Date().getTime()`, pero no crea un objeto `Date` intermedio. Así que es más rápido y no ejerce presión sobre el recolector de basura.

Se usa principalmente por conveniencia o cuando el rendimiento es importante, como en juegos en JavaScript u otras aplicaciones especializadas.

Así que esto es probablemente mejor:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## Benchmarking

Si queremos unas medidas de confiable de una función que usa mucha CPU, debemos tener cuidado.

Por ejemplo, midamos dos funciones que calculan la diferencia entre dos fechas: ¿cuál es más rápida?

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Estos dos hacen exactamente lo mismo, pero uno de ellos usa un `date.getTime()` explícito para obtener la fecha en ms, y el otro se basa en una transformación de fecha a número. Su resultado es siempre el mismo.

So, which one is faster?

La primera idea puede ser ejecutarlos varias veces seguidas y medir la diferencia horaria. Para nuestro caso, las funciones son muy simples, por lo que tenemos que hacerlo alrededor de 100000 veces.

Vamos a medir:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert("Time of diffSubtract: " + bench(diffSubtract) + "ms");
alert("Time of diffGetTime: " + bench(diffGetTime) + "ms");
```

Usar `getTime()` es mucho más rápido. Esto se debe a que no hay conversión de tipo, es mucho más fácil para los motores optimizar.

Está bien, tenemos algo. Pero eso no es un buen punto de referencia todavía.

Imagínese que en el momento de ejecutar `bench(diffSubtract)` la CPU estaba haciendo algo en paralelo, y estaba tomando recursos. Y al momento de ejecutar `bench(diffGetTime)` el trabajo ha finalizado.

Un escenario bastante real para un moderno sistema operativo multiproceso.

Como resultado, el primer punto de referencia tendrá menos recursos de CPU que el segundo. Eso puede llevar a resultados erróneos.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

Aquí está el ejemplo del código:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// run bench(upperSlice) and bench(upperLoop) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Los motores modernos de JavaScript comienzan a aplicar optimizaciones avanzadas solo para el código que se ejecuta muchas veces (sin necesidad de optimizar cosas que rara vez se ejecutan). Entonces, en el ejemplo anterior, las primeras ejecuciones no están bien optimizadas. Es posible que queramos agregar un tiempo de calentamiento:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

##### "Be careful doing microbenchmarking"

Los motores modernos de JavaScript realizan muchas optimizaciones. Pueden modificar los resultados de las "pruebas artificiales" en comparación con el "uso normal", especialmente cuando comparamos algo muy pequeño. Entonces, si realmente quieres entender el rendimiento, estudia cómo funciona el motor de JavaScript. Y entonces probablemente no necesitarás hacer microbenchmarking(micro pruebas).

El gran paquete de artículos sobre V8 se puede encontrar en <http://mrale.ph>.

## Date.parse from a string

El método [Date.parse(str)](mdn:js/Date/parse) puede leer una fecha de una cadena.

El formato de cadena debe ser: `YYYY-MM-DDTHH:mm:ss.sssZ`, donde:

- `YYYY-MM-DD` -- es la fecha: año-mes-día.
- El carácter `"T"` se usa como delimitador.
- `HH:mm:ss.sss` -- Es el tiempo: horas, minutos, segundos y milisegundos.
- La parte `'Z'` opcional denota la zona horaria en el formato `+-hh:mm`. Una sola letra `Z` que significaría UTC+0.

También son posibles variantes más cortas, como `YYYY-MM-DD` o `YYYY-MM` o incluso `YYYY`.

La llamada a `Date.parse(str)` analiza la cadena en el formato dado y devuelve la marca de tiempo (número de milisegundos desde el 1 de enero de 1970 UTC+0). Si el formato no es válido, devuelve `NaN`.

Por ejemplo:

```js run
let ms = Date.parse("2012-01-26T13:51:50.417-07:00");

alert(ms); // 1327611110417  (timestamp)
```

Podemos crear instantáneamente un objeto `new Date` a partir de un timestamp(marca de tiempo):

```js run
let date = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));

alert(date);
```

## Summary

- La fecha y la hora en JavaScript se representan con el objeto [Date](mdn:js/Date). No podemos crear un objeto Date de "solo fecha" o "solo tiempo": los objetos `Date` siempre llevan ambos.
- Los meses se cuentan desde cero (sí, enero es un mes cero).
- Los días de la semana en `getDay()` también se cuentan desde cero (es decir, el domingo).
- `Date` se corrige automáticamente cuando se establecen componentes fuera de rango. Esto es bueno para sumar/restar días/meses/horas.
- Las fechas se pueden restar, dando su diferencia en milisegundos. Esto se debe a que una `Date` se convierte en timestamp cuando se convierte en un número.

* Usa `Date.now()` para obtener la marca de tiempo actual rápidamente.

Tenga en cuenta que a diferencia de muchos otros sistemas, las marcas de tiempo en JavaScript están en milisegundos, no en segundos.

Además, a veces necesitamos mediciones de tiempo más precisas. JavaScript en sí no tiene una manera de medir el tiempo en microsegundos (1 millonésima de segundo), pero la mayoría de los entornos lo proporcionan. Por ejemplo, el navegador tiene [performance.now()](mdn:api/Performance/now) que da la cantidad de milisegundos desde el inicio de la carga de la página en microsegundos de precisión :

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, but only the first 3 are correct
```

Node.JS tiene el módulo `microtime` y otras formas. Técnicamente, cualquier dispositivo y entorno permite obtener más precisión, simplemente no está en `Date`.
