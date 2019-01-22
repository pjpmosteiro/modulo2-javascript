# Hello, world!

El tutorial que estás leyendo trata sobre el núcleo de JavaScript, que es independiente de la plataforma. Más adelante, aprenderá sobre Node.JS y otras plataformas que lo utilizan.

Pero necesitamos un entorno de trabajo para ejecutar nuestros scripts y, como estamos en línea, el navegador es una buena elección.

Así que primero, veamos cómo adjuntamos un script a una página web. Para entornos del lado del servidor (como Node.JS), puede ejecutar el script con un comando como ``"node my.js"`.

## The "script" tag

Los programas JavaScript se pueden insertar en cualquier parte de un documento HTML con la ayuda de la etiqueta `<script>`.

Por ejemplo:

```html run height=100
<!DOCTYPE html>
<html>
  <body>
    <p>Before the script...</p>

    *!*
    <script>
      alert("Hello, world!");
    </script>
    */!*

    <p>...After the script.</p>
  </body>
</html>
```

La etiqueta `<script>` contiene código JavaScript que se ejecuta automáticamente cuando el navegador procesa la etiqueta.

## Modern markup

La etiqueta `<script>` tiene algunos atributos que son raramente usados hoy en día pero que todavía se pueden encontrar en el código antiguo:

El atributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: El antiguo estándar HTML, HTML4, requería un script que tuviera un "tipo". Normalmente era `type="text/javascript"`. Ya no es necesario. Además, el moderno estándar HTML, HTML5, cambió totalmente el significado de este atributo. Ahora, se puede utilizar para módulos JavaScript. Pero ese es un tema avanzado; hablaremos de los módulos en otra parte del tutorial.

El atributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Este atributo estaba destinado a mostrar el lenguaje del script. Este atributo ya no tiene sentido porque JavaScript es el lenguaje por defecto. No hay necesidad de usarla.

Comentarios antes y después de los scripts.
: En libros y guías realmente antiguos, puedes encontrar comentarios dentro de `<script>` tags, como este:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Este truco no se usa en JavaScript moderno. Estos comentarios ocultaban el código JavaScript de navegadores antiguos que no sabían cómo procesar la etiqueta `<script>`. Dado que los navegadores lanzados en los últimos 15 años no tienen este problema, este tipo de comentario puede ayudarle a identificar código realmente antiguo.

## External scripts

Si tenemos mucho código JavaScript, podemos ponerlo en un archivo separado.

Los archivos de script se adjuntan a HTML con el atributo `src`:

```html
<script src="/path/to/script.js"></script>
```

Aquí, `/path/to/script.js` es una ruta absoluta al archivo de script (desde la raíz del sitio).

También puede proporcionar una ruta relativa desde la página actual. Por ejemplo, `src="script.js"` significaría un archivo ``"script.js"` en la carpeta actual.

También podemos dar una URL completa. Por ejemplo:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Para adjuntar varios scripts, utilice varias etiquetas:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

Como regla general, sólo los scripts más simples se ponen en HTML. Los más complejos residen en archivos separados.

La ventaja de un archivo separado es que el navegador lo descarga y lo almacena en su[caché](https://en.wikipedia.org/wiki/Web_cache).

Otras páginas que hacen referencia al mismo script lo tomarán de la caché en lugar de descargarlo, por lo que el archivo se descarga sólo una vez.

Esto reduce el tráfico y hace que las páginas sean más rápidas.

``warn header="Si `src` está establecido, el contenido del guión es ignorado."
Una sola etiqueta `<script>` no puede tener tanto el atributo `src` como el código dentro.

Esto no funcionará:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

Debemos elegir un `<script src="...">` externo o un `<script>` regular con código.

El ejemplo anterior puede dividirse en dos scripts para que funcione:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```

## Summary

- Podemos usar una etiqueta `<script>` para añadir código JavaScript a una página.
- Los atributos `type` y `language` no son necesarios.
- Un script en un archivo externo puede ser insertado con `<script src="path/to/script.js"></script>`.

Hay mucho más que aprender sobre los scripts de los navegadores y su interacción con la página web. Pero tengamos en cuenta que esta parte del tutorial está dedicada al lenguaje JavaScript, por lo que no debemos distraernos con implementaciones específicas del mismo. Vamos a utilizar el navegador como una forma de ejecutar JavaScript, que es muy conveniente para la lectura en línea, pero sólo uno de muchos.
