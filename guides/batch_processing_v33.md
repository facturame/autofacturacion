## Alta masiva de tickets

El alta masiva de tickets no es muy diferente del alta de un ticket, pues en ambos casos se deberá elaborar individualmente cada comprobante, estructurarlo en una petición con sus correspondientes metadatos y hacerlo llegar a **factúrame** a través de un servicio por HTTPS.

A continuación se presenta un ejemplo paso a paso del alta de 1 comprobante a través del servicio masivo.

### 1) Requisitos

Para llegar hasta el último paso será indispensable tener el **token** (una cadena alfanúmerica) que le de derecho de uso de la plataforma.

El **token** se obtiene una vez que **factúrame** obtiene los siguientes datos del emisor:

- RFC
- ID y Token de su proveedor de facturación
- Número de certificado
- Nombre de plantilla para generar PDF
- Régimen Fiscal


### 2) ¿Cómo formar el comprobante?

El siguiente es un ejemplo de comprobante CFDI versión 3.3 de tipo ingreso.

Es de señalar que los atributos `Certificado` y `Sello` deben estar presentes, pero su valor será asignado automáticamente durante la emisión.

Por otro lado, el nodo `Receptor` es opcional, de tal manera que puede omitirse, pues se entiende que el receptor aún no solicita este comprobante. Si el emisor cuenta con **generación de factura global** y este comprobante no es solicitado en determinado plazo, será emitido posteriormente con el receptor **Público En General**.

```
<?xml version="1.0" encoding="utf-8" ?>
<cfdi:Comprobante xmlns:tdCFDI="http://www.sat.gob.mx/sitio_internet/cfd/tipoDatos/tdCFDI" xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" LugarExpedicion="06300" Moneda="MXN" Certificado="" Descuento="0.00" Fecha="2017-05-02T10:15:49" Folio="4119" FormaPago="01" MetodoPago="PUE" NoCertificado="20001000000200001428" Sello="" Serie="B" SubTotal="616.37" TipoDeComprobante="I" Total="715.00" Version="3.3">
    <cfdi:Emisor Nombre="Empresa TEST Emisor SA de CV" Rfc="AAA010101AAA" RegimenFiscal="601"/>
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

[Descarga el esquema XSD versión 3.3](../assets/xsd/v33/cfdi_33.xsd) que puedes usar para validar la estructura del XML, junto a los [catálogos](../assets/xsd/v33/catCFDI.xsd) y [tipos de dato](../assets/xsd/v33/tdCFDI.xsd).

### 3) ¿Cómo formar la petición?

Una vez construido el documento, éste deberá ser codificado en Base64 y posteriormente como objeto JSON con sus respectivos metadatos, tales como número de ticket, método de generación de folio, etc. Se recomienda visitar la sección "**Alta y bloqueo de un documento**" donde se describen y explican los metadatos de la petición.

Para este ejemplo, se utilizará el número de ticket *"gUhCv7TiKG-c6vs1Uu6UoQ"*. Luego de haber codificado el xml, el resultado luce así:

```
{
  "cfdi":{
    "ref_id":"gUhCv7TiKG-c6vs1Uu6UoQ",
    "ticket_number":"gUhCv7TiKG-c6vs1Uu6UoQ",
    "document":"PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+DQo8Y2ZkaTpDb21wcm9iYW50ZSB4bWxuczp0ZENGREk9Imh0dHA6Ly93d3cuc2F0LmdvYi5teC9zaXRpb19pbnRlcm5ldC9jZmQvdGlwb0RhdG9zL3RkQ0ZESSIgeG1sbnM6Y2ZkaT0iaHR0cDovL3d3dy5zYXQuZ29iLm14L2NmZC8zIiB4c2k6c2NoZW1hTG9jYXRpb249Imh0dHA6Ly93d3cuc2F0LmdvYi5teC9jZmQvMyBodHRwOi8vd3d3LnNhdC5nb2IubXgvc2l0aW9faW50ZXJuZXQvY2ZkLzMvY2ZkdjMzLnhzZCIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM6dGZkPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvVGltYnJlRmlzY2FsRGlnaXRhbCIgTHVnYXJFeHBlZGljaW9uPSIwNjMwMCIgTW9uZWRhPSJNWE4iIENlcnRpZmljYWRvPSIiIERlc2N1ZW50bz0iMC4wMCIgRmVjaGE9IjIwMTctMDUtMDJUMTA6MTU6NDkiIEZvbGlvPSI0MTE5IiBGb3JtYVBhZ289IjAxIiBNZXRvZG9QYWdvPSJQVUUiIE5vQ2VydGlmaWNhZG89IjIwMDAxMDAwMDAwMjAwMDAxNDI4IiBTZWxsbz0iIiBTZXJpZT0iQiIgU3ViVG90YWw9IjYxNi4zNyIgVGlwb0RlQ29tcHJvYmFudGU9IkkiIFRvdGFsPSI3MTUuMDAiIFZlcnNpb249IjMuMyI+DQogICAgPGNmZGk6RW1pc29yIE5vbWJyZT0iRW1wcmVzYSBURVNUIEVtaXNvciBTQSBkZSBDViIgUmZjPSJBQUEwMTAxMDFBQUEiIFJlZ2ltZW5GaXNjYWw9IjYwMSIvPg0KICAgIDxjZmRpOkNvbmNlcHRvcz4NCiAgICAgICAgPGNmZGk6Q29uY2VwdG8gQ2xhdmVQcm9kU2Vydj0iMDEwMTAxMDEiIENhbnRpZGFkPSIxIiBEZXNjcmlwY2lvbj0iQXJ0aWN1bG8gVGVzdCAwMDEiIEltcG9ydGU9IjYxNi4zNyIgQ2xhdmVVbmlkYWQ9IkU0OCIgVW5pZGFkPSJTZXJ2aWNpbyIgVmFsb3JVbml0YXJpbz0iNjE2LjM3Ij4NCiAgICAgICAgICAgIDxjZmRpOkltcHVlc3Rvcz4NCiAgICAgICAgICAgICAgICA8Y2ZkaTpUcmFzbGFkb3M+DQogICAgICAgICAgICAgICAgICAgIDxjZmRpOlRyYXNsYWRvIEJhc2U9IjYxNi4zNyIgVGlwb0ZhY3Rvcj0iVGFzYSIgVGFzYU9DdW90YT0iMC4xNjAwMDAiIEltcHVlc3RvPSIwMDIiIEltcG9ydGU9Ijk4LjYyIi8+DQogICAgICAgICAgICAgICAgPC9jZmRpOlRyYXNsYWRvcz4NCiAgICAgICAgICAgIDwvY2ZkaTpJbXB1ZXN0b3M+DQogICAgICAgIDxjZmRpOlBhcnRlIENsYXZlUHJvZFNlcnY9IjAxMDEwMTAxIiBOb0lkZW50aWZpY2FjaW9uPSJDT0QwNSIgQ2FudGlkYWQ9IjEuMDAiIFVuaWRhZD0iUGllemEiIERlc2NyaXBjaW9uPSJQYXJ0ZSAxIiBWYWxvclVuaXRhcmlvPSIxMDAuMDAiIEltcG9ydGU9IjEwMC4wMCI+DQogICAgICAgIDxjZmRpOkluZm9ybWFjaW9uQWR1YW5lcmEgTnVtZXJvUGVkaW1lbnRvPSIxNyAgMDEgIDMxNzMgIDcxMjM0NTYiLz4NCiAgICAgIDwvY2ZkaTpQYXJ0ZT4NCiAgICAgICAgPC9jZmRpOkNvbmNlcHRvPg0KICAgIDwvY2ZkaTpDb25jZXB0b3M+DQogICAgPGNmZGk6SW1wdWVzdG9zIFRvdGFsSW1wdWVzdG9zVHJhc2xhZGFkb3M9Ijk4LjYyIj4NCiAgICAgICAgPGNmZGk6VHJhc2xhZG9zPg0KICAgICAgICAgICAgPGNmZGk6VHJhc2xhZG8gSW1wb3J0ZT0iOTguNjIiIEltcHVlc3RvPSIwMDIiIFRpcG9GYWN0b3I9IlRhc2EiIFRhc2FPQ3VvdGE9IjAuMTYwMDAwIi8+DQogICAgICAgIDwvY2ZkaTpUcmFzbGFkb3M+DQogICAgPC9jZmRpOkltcHVlc3Rvcz4NCjwvY2ZkaTpDb21wcm9iYW50ZT4="
  }
}
```

### 4) ¿Cómo volverlo masivo?

Si se tratara del alta de un documento habría que enviar el JSON del paso anterior a través de un servicio y habríamos terminado.

La diferencia aquí es que una vez obtenido el JSON, éste (y la cantidad que sean) se agrupan y comprimen en un archivo zip. La estructura al interior del zip es completamente libre, el único requisito es que los tickets tengan la extensión **.json** y su formato sea válido.

### 5) ¿Cómo llega a factúrame?

A través de un servicio HTTPS autenticado por **token**, con el zip y un identificador de lote codificados como `multipart/form-data`.

Ejemplo:


- URL: https://rest.facturame.mx/api/v3/businesses/cfdi/v33_batch.json
- Método: POST
- Headers:
   - Content-Type: multipart/form-data
   - X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ
- Body (form-data):
   - batchId: 57ba73b6-0df9-4e3f-9363-b140c9c49b13
   - file[0]: (contenido del archivo zip)


En bash:


```
curl -X POST https://rest.facturame.mx/api/v3/businesses/cfdi/v33_batch.json \
  -H "Content-Type: multipart/form-data" \
  -H "X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ" \
  --form "batchId=57ba73b6-0df9-4e3f-9363-b140c9c49b13" \
  --form "file[0]=@path/to/file.zip"
```

Posibles respuestas:

1) Lote procesado previamente

    HTTP/1.1 422 Unprocessable Entity

    {"message":"Batch already seen."}
    
2) Lote añadido correctamente

    HTTP/1.1 201 Created

    {"message":"Batch processing in progress..."}
