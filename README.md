# Portal de Autofacturación

> Ejemplo del funcionamiento de un portal de autofacturación en **factúrame**

### Nota

A partir del 1 de junio del 2017 este documento estará centrado en la versión de **CFDI 3.3**, dada a conocer por el Servicio de Administración Tributaria (SAT) y que será de uso general y obligatorio a partir del 1 de diciembre de 2017.

La documentación archivada puede encontrarse a continuación.

- [Autofacturación con *CFDI 3.2*.](guides/CFDI_32.md)

## Índice

- [Provisión de cuenta](#provisi%C3%B3n-de-cuenta)
- [Formación de un documento](#formaci%C3%B3n-de-un-documento)
- [Alta y bloqueo de un documento](#alta-y-bloqueo-de-un-documento)
- [Alta masiva](#alta-masiva)
- [Devoluciones](#devoluciones)
- [Solicitud de facturación](#solicitud-de-facturaci%C3%B3n)


## [Provisión de cuenta](id:provision_cuenta)

Para completar con éxito la provisión de la cuenta son requeridos los siguientes datos:

- RFC
- ID y Token de su proveedor de facturación
- Número de certificado
- Nombre de plantilla para generar PDF
- Régimen Fiscal

Para usuarios de los siguientes proveedores, los datos pueden ser solicitados automáticamente por Factúrame:

- [Diverza](http://diverza.com)


## [Formación de un documento](id:formacion_documento)

Para la emisión de comprobantes fiscales es necesario que el emisor envíe la información necesaria para generar el comprobante, para lo cual se utiliza un archivo XML de tipo **Comprobante**.

**Factúrame**, a través de los servicios de un proveedor de facturación, se encargará de generar el CFDI con el sello correspondiente y la certificación del timbre cuando sea requerido.

El siguiente es un ejemplo de comprobante para emisión de CFDI de tipo ingreso.

```
<?xml version="1.0" encoding="utf-8" ?>
<cfdi:Comprobante xmlns:tdCFDI="http://www.sat.gob.mx/sitio_internet/cfd/tipoDatos/tdCFDI" xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" LugarExpedicion="06300" Moneda="MXN" Certificado="" Descuento="0.00" Fecha="2017-05-02T10:15:49" Folio="4119" FormaPago="01" MetodoPago="PUE" NoCertificado="20001000000200001428" Sello="" Serie="B" SubTotal="616.37" TipoDeComprobante="I" Total="715.00" Version="3.3">
    <cfdi:Emisor Nombre="Empresa TEST Emisor SA de CV" Rfc="AAA010101AAA" RegimenFiscal="601"/>
    <cfdi:Receptor Nombre="Empresa TEST Receptor SA de CV" Rfc="XAXX010101000"/>
    <cfdi:Conceptos>
        <cfdi:Concepto ClaveProdServ="01010101" Cantidad="1" Descripcion="Articulo Test 001" Importe="616.37" ClaveUnidad="E48" Unidad="Servicio" ValorUnitario="616.37">
            <cfdi:Impuestos>
                <cfdi:Traslados>
                    <cfdi:Traslado Base="616.37" TipoFactor="Tasa" TasaOCuota="0.160000" Impuesto="002" Importe="98.62"/>
                </cfdi:Traslados>
            </cfdi:Impuestos>
        <cfdi:Parte ClaveProdServ="01010101" NoIdentificacion="COD05" Cantidad="1.00" Unidad="Pieza" Descripcion="Parte 1" ValorUnitario="100.00" Importe="100.00">
        <cfdi:InformacionAduanera NumeroPedimento="17  01  3173  7123456"/>
      </cfdi:Parte>
        </cfdi:Concepto>
    </cfdi:Conceptos>
    <cfdi:Impuestos TotalImpuestosTrasladados="98.62">
        <cfdi:Traslados>
            <cfdi:Traslado Importe="98.62" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000"/>
        </cfdi:Traslados>
    </cfdi:Impuestos>
</cfdi:Comprobante>
```

---

[Descarga el esquema XSD versión 3.3](assets/xsd/v33/cfdi_33.xsd) que puedes usar para validar la estructura del XML, junto a los [catálogos](assets/xsd/v33/catCFDI.xsd) y [tipos de dato](assets/xsd/v33/tdCFDI.xsd).


## [Alta y bloqueo de un documento](id:alta_documento)

Una vez construido el documento, y luego de haber recibido un **web token** por parte del equio de **factúrame**, el alta del documento se realiza enviando una petición HTTPS con el archivo codificado en Base64 y posteriormente como valor en un objeto JSON.

A continuación se describen los parámetros requeridos en la petición.

Parámetro           | Tipo         | Descripción
:------------------ | :----------: | :-----------
ref_id              | String       | Requerido. Para control interno del contribuyente. Acepta un valor alfanumérico. Debe ser único. Se recomienda el uso de una función de UUID.
ticket_number       | String       | Requerido. Expresa el número de ticket con el cual el usuario receptor de la factura se referirá a la transacción, incluyendo la búsqueda y el procesamiento del ticket.
direct_emission     | Boolean      | Requerido. Indicar si la emisión debe hacerse al instante en lugar de ser pospuesta a su futura solicitud por parte del receptor. Cuando se utilice esta opción los datos del receptor deben ser los definitivos.
customer_email      | Array        | Opcional. Una lista de 1 ó más direcciones de correo a las cuales se les hará llegar la representación en XML y PDF del comprobante emitido, siempre y cuando se trate de emisión directa (*direct_emission: true*). Ejemplo: ["cliente@example.com"]
branch_id           | String       | Opcional. Expresa la sucursal, en caso de haberla, desde la que se emite el comprobante. Para el uso de este parámetro debe configurarse un catálogo de sucursales y series.
document            | String       | Requerido. Es la representación codificada en Base64 del archivo xml de tipo **Comprobante**
generate_folio      | String       | Opcional. Cadena que expresa la estrategia a seguir para asignar una serie y un folio al comprobante en emisión. Los valores posibles son: "**from_document**" y "**empty**". En el primer caso, el servicio tomará el valor de la serie que tenga el xml y con ese dato generará el consecutivo del folio. En el segundo caso, el servicio tomará el valor de la serie "NULL" que tenga el xml y con ese dato generará el consecutivo del folio. Si no se utiliza este parámetro, se asume que los datos de serie y folio que aparezcan en el xml son los que deben usarse.


### Ejemplos de código

A continuación encontrarás ejemplos básicos de cómo realizar una petición de alta en diferentes lenguajes de programación.


- [C#](examples/v33/csharp/post.cs)
- [Go](examples/v33/go/post.go)
- [Java](examples/v33/java/post.java)
- [Javascript](examples/v33/javascript/post.js)
- [Node.js](examples/v33/node/post.js)
- [PHP](examples/v33/php/post.php)
- [Python](examples/v33/python/post.py)
- [Ruby](examples/v33/ruby/post.rb)
- [Shell (curl)](examples/v33/shell/post.sh)



### Códigos de respuesta

La siguiente lista comprende todos los posibles códigos de respuesta del servicio de alta y sus posibles soluciones:

###### Códigos 200

**201** - Operación exitosa. El documento fue creado con éxito.

    {
        "ref_id":"123abc",
        "ticket_number":"QFAuxk5l6CWQ/xZyuFN2",
        "processed":false,
        "is_available":true,
        "created_at":"2017-06-01T18:44:29.737Z"
    }

En el caso de que el parámetro *direct_emission* se utiice con el valor *verdadero (**true**)*, la respuesta incluirá además los campos *uuid*, *stamp_chain*, *qr_code* y *cfdi* correspondientes al cfdi emitido. *qr_code* y *cfdi* estarán codificados en Base64.

    {
        "ref_id":"123abc",
        "ticket_number":"QFAuxk5l6CWQ/xZyuFN2",
        "processed":false,
        "is_available":true,
        "created_at":"2017-06-01T18:44:29.737Z",
        "uuid":"3bf4707e-2afb-4bd2-bf1f-dd6ff0f7f35d",
        "stamp_chain":"||1.1|3bf4707e-2afb-4bd2-bf1f-dd6ff0f7f35d|2017-06-01T14:44:13|DIA031002LZ2|Gh5COoX1m6oxSLGR960uqYZi+EO6tHBa36tMAMGVdM3yhW82t5hBTQCso9Nxw/DN7+pPL7VMUdRaoaI1JjYFWAfg6hTpcbxhahMBtJmrw4TP+Gx6lXdvvgMwXPOZGrEklXfIukXzipuikosOxVt8z5zv8FAzn1naV71PkRKt4Mg=|20001000000300022323||",
        "qr_code":"BASE64_ENCODED_QR_CODE",
        "cfdi":"BASE64_ENCODED_CFDI"
    }

###### Códigos 400

**401** - No fue posible autenticar la petición.

**422** - La petición no pudo ser procesada exitosamente. Se incluye una respuesta indicando el parámetro y las causas que impidieron una respuesta exitosa.

Ejemplo: el documento no es válido.

    {
      "document_path":["can't be blank"]
    }

---    

Ejemplo: el RFC del documento no corresponde a la autenticación.

    {
	    "document": ["attribute Rfc on Emisor node does not match"]
    }

---

Para determinados casos se provee también la posibilidad de **bloquear y desbloquear** la solicitud de facturación del receptor de un documento ya emitido. Los parámetros requeridos para el consumo de este servicio son:

- *Web token*, para la autenticación de la petición.
- El *ticket_number* que fue generado a partir de un documento. El bloqueo o desbloqueo se hará sobre el documento al que se haga referencia en este parámetro.
- *is_available*, un valor de tipo booleano que indica si el documento puede estar o no disponible para su facturación.

### Ejemplos de código

A continuación encontrarás ejemplos básicos de cómo realizar una petición para actualizar la disponibilidad de un documento en diferentes lenguajes de programación.


- [C#](examples/v33/csharp/put.cs)
- [Go](examples/v33/go/put.go)
- [Java](examples/v33/java/put.java)
- [Javascript](examples/v33/javascript/put.js)
- [Node.js](examples/v33/node/put.js)
- [PHP](examples/v33/php/put.php)
- [Python](examples/v33/python/put.py)
- [Ruby](examples/v33/ruby/put.rb)
- [Shell (curl)](examples/v33/shell/put.sh)



### Códigos de respuesta

La siguiente lista comprende todos los posibles códigos de respuesta del servicio de bloqueo y sus posibles soluciones:

###### Códigos 200

**204** - Operación exitosa. La disponibilidad de la remisión fue actualizada con éxito.

###### Códigos 400

**401** - No fue posible autenticar la petición.

**422** - La petición no pudo ser procesada exitosamente.

Ejemplo: no se encontró el documento.

    {
	    "message": "The resource cannot be found"
    }

---    


## [Alta masiva](id:alta-masiva)

En ocasiones, dar de alta un documento a la vez podría no ser lo más conveniente. Después de todo, no es lo mismo preparar una cafetera grande para 8 personas que poner una cafetera individual 8 veces.

Para esos casos, un alta masiva de tickets puede ser la alternativa. [Aprende más a continuación.](guides/batch_processing_v33.md)

## [Devoluciones](id:devoluciones)

Para los casos en que deba efectuarse una devolución o cancelación, existe la posibilidad de generar un **comprobante de nota de ingreso**. Para esto deberá generarse un comprobante por los conceptos correspondientes y darlo de alta enviando una petición HTTPS con el archivo codificado en Base64 y posteriormente como valor en un objeto JSON.

A continuación se describen los parámetros requeridos en la petición.

Parámetro             | Tipo         | Descripción
:-------------------- | :----------: | :-----------
related_ticket_number | String       | Requerido. Expresa el número de ticket con el cual el usuario receptor de la factura se referirá a la transacción, incluyendo la búsqueda y el procesamiento del ticket. Cuando se emita el comprobante original se emitirá también esta nota de crédito.
document              | String       | Requerido. Es la representación codificada en Base64 del archivo xml de tipo **Comprobante**. En este servicio el comprobante es de tipo **Egreso**.
ref_id                | String       | Requerido. Para control interno del contribuyente y para garantizar la unicidad de la transacción. Acepta un valor alfanumérico que debe ser único.
generate_folio        | String       | Opcional. Cadena que expresa la estrategia a seguir para asignar una serie y un folio al comprobante en emisión. Los valores posibles son: "**from_document**" y "**empty**". En el primer caso, el servicio tomará el valor de la serie que tenga el xml y con ese dato generará el consecutivo del folio. En el segundo caso, el servicio tomará el valor de la serie "NULL" que tenga el xml y con ese dato generará el consecutivo del folio. Si no se utiliza este parámetro, se asume que los datos de serie y folio que aparezcan en el xml son los que deben usarse.



## [Solicitud de facturación](id:solicitud_facturacion)

Una vez registrada la venta, el receptor podrá solicitar la facturación de su ticket a partir del número de ticket que le haya sido entregado.

Este paso requiere solamente la captura por parte del receptor del folio único de ticket.

A continuación se muestra una representación de esta acción.

![Formulario](assets/images/alta1.png "Formulario")


## Licencia

MIT © Keemo Negocios por Tecnología SAPI de CV
