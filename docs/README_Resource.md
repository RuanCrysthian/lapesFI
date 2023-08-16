# Resources

**`POST /resources`**

Descrição: Cria um novo Resource e suas Capabilities.

Parâmetros:

- `description` (obrigatório): uma breve descrição do Resource.
- `capabilities` (obrigatório): são as capabilities que o Resource possui.
- `location` (obrigatório): localização que o Resource se encontra.

EXEMPLO

```
{
  "description": "Environment Monitor",
  "capabilities": [
    {
      "name": "temperature",
      "description": "Measure the temperature"
    },
    {
      "name": "humidity",
      "description": "Measure the humidity"
    }
  ],
  "location": "Departamento de Computação UFSCar"
}
```

**`GET /resources`**

Descrição: Retorna a lista de Resources cadastrados.

EXEMPLO

```
[
  {
    "uuid": "883f12a5-ace0-4ff4-b6db-404b944e8a4e",
    "description": "Environment Monitor",
    "capabilities": [
      {
        "uuid": "7b76b4dc-1e4d-4d7b-ac78-513be20b5875",
        "name": "humidity",
        "function": "sensor",
        "description": "Environment Monitor"
      },
      {
      "uuid": "04025dee-a676-48c7-996e-6c3999454a07",
      "name": "temperature",
      "function": "sensor",
      "description": "Environment Monitor"
      }
    ],
    "location": "Departamento de Computação UFSCar"
	},
  {
    "uuid": "4a723ead-c7f1-4479-b6d4-6c43c3bc4b31",
    "description": "Temperature Monitor",
    "capabilities": [
      {
      "uuid": "76cdc37b-1e4a-4527-9f59-507259493e0e",
      "name": "temperature",
      "function": "sensor",
      "description": "Temperature Monitor"
      }
    ],
    "location": "Departamento de Computação UFSCar"
  }
]
```

**`GET /resources/{uuid}`**

Descrição: Retorna um Resource específico.

Parâmetros de rota:

- `uuid`: O UUID do Resource.

EXEMPLO

**`GET /resources/883f12a5-ace0-4ff4-b6db-404b944e8a4e `**

```
{
  "uuid": "883f12a5-ace0-4ff4-b6db-404b944e8a4e",
  "description": "Environment Monitor",
  "capabilities": [
    {
      "uuid": "7b76b4dc-1e4d-4d7b-ac78-513be20b5875",
      "name": "humidity",
      "function": "sensor",
      "description": "Environment Monitor"
    },
    {
      "uuid": "04025dee-a676-48c7-996e-6c3999454a07",
      "name": "temperature",
      "function": "sensor",
      "description": "Environment Monitor"
    }
  ],
  "location": "Departamento de Computação UFSCar"
}
```

**`DELETE /resources/{uuid}`**

Descrição: Deleta um Resource específico.

Parâmetros de rota:

- `uuid`: O UUID do Resource.

EXEMPLO

`DELETE /resources/883f12a5-ace0-4ff4-b6db-404b944e8a4e `


**`POST /resources/{uuid}/data`**

Descrição: Envia os valores do sensor de uma Capability de um determinado Resource.

Parâmetro de rota:
  - `uuid`: UUID do Resource

Parâmetros:
  - `capability_uuid`: UUID da Capability
  - `value`: valor do sensor.
  - `date`: data de envio no formato: "YYYY-MM-DDTHH:MMZ"

EXEMPLO

`POST /resources/883f12a5-ace0-4ff4-b6db-404b944e8a4e/data`

```
{
  "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
  "sensor_values": [
    {
      "value": 10,
      "date": "2023-07-09T12:00Z"
    },
    {
      "value": 11,
      "date": "2023-07-09T12:01Z"
    },
    {
      "value": 12,
      "date": "2023-07-09T12:02Z"
    }
  ]
}
```