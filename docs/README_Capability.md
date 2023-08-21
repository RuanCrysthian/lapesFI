# Capability

**`GET /capabilities/{uuid}/data `**

Descrição: Retorna todos os dados de uma determinada Capability.

Parâmetro de rota:
  - `uuid`: UUID da Capability

EXEMPLO:

`GET capabilities/04025dee-a676-48c7-996e-6c3999454a07/data`

```
[
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "sensor_values": [
      {
        "value": "10.000",
        "date": "2023-07-09T12:00Z"
      },
      {
        "value": "11.000",
        "date": "2023-07-09T12:01Z"
      },
      {
        "value": "12.000",
        "date": "2023-07-09T12:02Z"
      }
    ]
  }
]
```