# LapesFI

<img src="./docs/logo_lapes.png" alt="logo Lapes">

## Visão Geral

O LapesFI é uma API REST desenvolvida como parte de um projeto da FAPESP, relacionado à criação de um injetor de erros em aplicações de Cidades Inteligentes. Essa API foi criada com o objetivo de fornecer funcionalidades para a injeção de erros controlados, permitindo a simulação e o teste de cenários de falhas em sistemas de Cidades Inteligentes.

## Funcionalidades Principais

- Injeção de erros controlados.
- Simulação de diferentes tipos de falhas, incluindo:
  - Bias
  - Drift
  - Loss of Accuracy
  - Freezing
  - Calibration Error
- Possibilidade de testar mecanismos de validação e recuperação de dados corrompidos.

## Dependências

- docker
- docker-compose

## Deploy

Criar os contêineres

`sudo docker-compose build`

Subir os contêineres

`sudo docker-compose up`

Para verificar se os contêineres:

`sudo docker ps`

## Endpoints

### Resources

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
      "description": "Measure the temperature"
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

### Capability

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


### Fault 

`POST /faults`

Descrição: Injeta erros em uma determinada Capability.

Parâmetros:

- `uuid` (obrigatório): é o uuid de uma Capability já criada.
- `type_of_error` (obrigatório): é o tipo de erro que será injetado nos valores da Capability.

EXEMPLO

```
{
  "uuid": "04025dee-a676-48c7-996e-6c3999454a07",
  "type_of_error": "freezing"
}
```

`GET /faults`

Descrição: Retorna a lista de Faults cadastrados.

EXEMPLO

```
[
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "type_of_error": {
      "type": "freezing"
    },
    "sensor_value": 10,
    "sensor_error": 15
  },
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "type_of_error": {
      "type": "freezing"
    },
    "sensor_value": 11,
    "sensor_error": 15
  },
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "type_of_error": {
      "type": "freezing"
    },
    "sensor_value": 12,
    "sensor_error": 15
  }
]
```

**`GET /faults/{uuid}`**

Descrição: Retorna os Faults de uma determinada Capability por seu uuid.

Parâmetros de rota:

- `uuid`: O UUID da Capability.

EXEMPLO

`GET /errors/04025dee-a676-48c7-996e-6c3999454a07 `

```
[
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "type_of_error": {
      "type": "freezing"
    },
    "sensor_value": 10,
    "sensor_error": 15
  },
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "type_of_error": {
      "type": "freezing"
    },
    "sensor_value": 11,
    "sensor_error": 15
  },
  {
    "capability_uuid": "04025dee-a676-48c7-996e-6c3999454a07",
    "type_of_error": {
      "type": "freezing"
    },
    "sensor_value": 12,
    "sensor_error": 15
  }
]
```

**`DELETE faults/{uuid}`**

Descrição: Deleta os dados de uma determinado UUID da Capability

Parâmetros de rota:
- `uuid`: O UUID da Capability.

EXEMPLO

`DELETE faults/04025dee-a676-48c7-996e-6c3999454a07`

## Contribuição

Se você deseja contribuir para o desenvolvimento da LapesFI, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para suas modificações: git checkout -b feature/nova_feature.
3. Faça as alterações desejadas e salve.
4. Faça o commit das suas alterações: git commit -m 'Adiciona nova feature'.
5. Faça o push para o branch correspondente: git push origin feature/nova_feature.
6. Abra um pull request para revisão das suas modificações.

## Suporte

Se você encontrar algum problema ou tiver alguma dúvida em relação ao uso da LapesFI, sinta-se à vontade para entrar em contato com nossa equipe de suporte em ruanlima@estudante.ufscar.br.
