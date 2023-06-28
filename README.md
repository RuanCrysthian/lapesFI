# LapesFI

<img src="./docs/logo_lapes.png" alt="logo Lapes">

## Visão Geral

O LapesFI é uma API REST desenvolvida como parte de um projeto da FAPESP, relacionado a criação de um injetor de erros em aplicações de Cidades Inteligentes. Essa API foi desenvolvida com o objetivo de fornecer funcionalidades para a injeção de erros controlados em sistemas baseados no middleware InterSCity.

## Funcionalidades Principais

- Injeção de erros controlados na plataforma InterSCity
- Simulação de diferentes tipos de falhas, incluindo:
  - Bias
  - Drift
  - Loss of Accuracy
  - Freezing
  - Calibration Error
- Avaliação da resiliência e confiabilidade dos dados de sensores.

## Deploy

TODO

## Endpoints

### Resources

`POST /resources`

Descrição: Cria um novo Resource e suas Capabilities.

Parâmetros:

- `description` (obrigatório): uma breve descrição do Resource.
- `capabilities` (obrigatório): são as capabilities que o Resource possui.
- `resourceEnvironment` (obrigatório): é o ambiente que o Resource se encontra.

EXEMPLO

```
{
  "description": "Environment temperature monitor",
  "capabilities": [
    {
      "name": "temperature",
      "value": 30
    },
		{
      "name": "temperature",
      "value": 30.8
    },
		{
      "name": "temperature",
      "value": 31
    }
  ],
  "resourceEnvironment": "Departamento de Computação UFSCar"
}
```

`GET /resources`

Descrição: Retorna a lista de Resources cadastrados.

EXEMPLO

```
[
  {
		"uuid": "207cd829-a1b6-4162-a26f-3eec4c9d0ad4",
		"description": "A public bus 1",
		"capabilities": [
			{
				"capability_uuid": "ec313a48-3009-4bfe-8308-5a008cd42701",
				"name": "temperature",
				"value": 25
			}
		],
		"resourceEnvironment": "Avenida São Carlos"
	},
	{
	"uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
	"description": "Environment temperature monitor",
	"capabilities": [
		{
			"name": "temperature",
			"value": 30
		},
		{
			"name": "temperature",
			"value": 30.8
		},
		{
			"name": "temperature",
			"value": 31
		}
	],
	"resourceEnvironment": "Departamento de Computação UFSCar"
}
]
```

`GET /resources/{uuid}`

Descrição: Retorna os detalhes de um Resource específico.

Parâmetros de rota:

- uuid: O UUID do Resource.

EXEMPLO

`GET /resources/33864b89-7b24-4a73-960a-f6b9e1e8661f `

```
{
	"uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
	"description": "Environment temperature monitor",
	"capabilities": [
		{
			"name": "temperature",
			"value": 30
		},
		{
			"name": "temperature",
			"value": 30.8
		},
		{
			"name": "temperature",
			"value": 31
		}
	],
	"resourceEnvironment": "Departamento de Computação UFSCar"
}
```

### Erros

`POST /errors`

Descrição: Injeta erros em um determinado Resource.

Parâmetros:

- `uuid` (obrigatório): é o uuid de um Resource já criado.
- `type_of_error` (obrigatório): é o tipo de erro que será injeta nos valores da Capability do Resource.
- `error_duration` (obrigatório): ???

EXEMPLO

```
{
	"uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
	"type_of_error": "loss accuracy",
	"error_duration": 11
}
```

`GET /errors`

Descrição: Retorna a lista de Errors cadastrados.

EXEMPLO

```
[
	{
		"error_uuid": "21ca2581-da4e-46fc-9584-750434c5f312",
		"resource_uuid": "4456a0c5-d7eb-4232-b51a-0ab9427e4245",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"error_duration": 11,
		"capability_value": 25,
		"capability_error": 30
	},
	{
		"error_uuid": "ecebf8b6-4a31-4651-9f74-e3165aa93c70",
		"resource_uuid": "4456a0c5-d7eb-4232-b51a-0ab9427e4245",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"error_duration": 11,
		"capability_value": 26,
		"capability_error": 31
	},
	{
		"error_uuid": "aa32a824-10e4-441d-8af4-6721be3767ff",
		"resource_uuid": "4456a0c5-d7eb-4232-b51a-0ab9427e4245",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"error_duration": 11,
		"capability_value": 25.1,
		"capability_error": 30.1
	}
]
```

`GET /errors/{uuid}`

Descrição: Retorna os Errors de um determinado Resource por seu uuid.

Parâmetros de rota:

- uuid: O UUID do Resource.

EXEMPLO

`GET /resources/33864b89-7b24-4a73-960a-f6b9e1e8661f `

```
[
	{
		"error_uuid": "3934eefc-ccaa-4d1f-848d-59ac4cd5fc24",
		"resource_uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"error_duration": 11,
		"capability_value": 30,
		"capability_error": 35
	},
	{
		"error_uuid": "12e92f5d-68c1-46b1-b85a-d8479890d5be",
		"resource_uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"error_duration": 11,
		"capability_value": 30.8,
		"capability_error": 35.8
	},
	{
		"error_uuid": "68846b21-5b28-467c-8f17-194f04bfc7ed",
		"resource_uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"error_duration": 11,
		"capability_value": 31,
		"capability_error": 36
	},
	{
		"error_uuid": "0175f324-c771-4040-857b-316841b13ace",
		"resource_uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
		"type_of_error": {
			"type": "bias"
		},
		"error_duration": 11,
		"capability_value": 30,
		"capability_error": 33
	},
	{
		"error_uuid": "8def8781-80f0-4a61-8265-e0d803946064",
		"resource_uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
		"type_of_error": {
			"type": "bias"
		},
		"error_duration": 11,
		"capability_value": 30.8,
		"capability_error": 33.8
	},
	{
		"error_uuid": "7ffc55f5-fbec-4018-b47e-ab5b5412d52c",
		"resource_uuid": "33864b89-7b24-4a73-960a-f6b9e1e8661f",
		"type_of_error": {
			"type": "bias"
		},
		"error_duration": 11,
		"capability_value": 31,
		"capability_error": 34
	}
]
```

## Autenticação

TODO

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
