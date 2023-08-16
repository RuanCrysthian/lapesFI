# Fault 

### `POST /faults`

Descrição: Injeta erros em uma determinada Capability.

Parâmetros:

- `uuid` (obrigatório): é o uuid de uma Capability já criada.
- `type_of_error` (obrigatório): é o tipo de erro que será injetado nos valores da Capability.
- `initial_date` (obrigatório): é o tempo inicial que será injetado erros nos valores do sensor.
- `final_date` (obrigatório): é o tempo final que será injetado erros nos valores do sensor.
- `intensity` (obrigatório): valor que dita o quanto o valor da injeção de erro vai variar.

EXEMPLO

```
{
	"uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
	"type_of_error": "loss accuracy",
	"initial_date": "2023-07-09T12:03Z",
	"final_date": "2023-07-09T12:09Z",
	"intensity": 3
}
```

### `GET /faults`

Descrição: Retorna a lista de Faults cadastrados.

EXEMPLO

```
[
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:00Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13,
		"sensor_error": 13
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:00Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13,
		"sensor_error": 13
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:01Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.2,
		"sensor_error": 13.2
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:01Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.2,
		"sensor_error": 13.2
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:02Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.1,
		"sensor_error": 13.1
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:02Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.1,
		"sensor_error": 13.1
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:03Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.15,
		"sensor_error": 16.15
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:03Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.15,
		"sensor_error": 10.15
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:04Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.2,
		"sensor_error": 16.2
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:04Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.2,
		"sensor_error": 16.2
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:05Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.4,
		"sensor_error": 10.4
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:05Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.4,
		"sensor_error": 16.4
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:06Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.5,
		"sensor_error": 16.5
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:06Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.5,
		"sensor_error": 16.5
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:07Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.42,
		"sensor_error": 16.42
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:07Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.42,
		"sensor_error": 10.42
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:08Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.39,
		"sensor_error": 10.39
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:08Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.39,
		"sensor_error": 16.39
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:09Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.35,
		"sensor_error": 16.35
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:09Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.35,
		"sensor_error": 16.35
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:10Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.37,
		"sensor_error": 13.37
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:10Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.37,
		"sensor_error": 13.37
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:11Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.28,
		"sensor_error": 13.28
	},
	{
		"capability_uuid": "310913bf-3089-4394-ae8d-0c80c13a5dac",
		"type_of_error": {
			"type": "loss accuracy"
		},
		"sensor_date": "2023-07-09T12:11Z",
		"initial_date": "2023-07-09T12:03Z",
		"final_date": "2023-07-09T12:09Z",
		"intensity": 3,
		"sensor_value": 13.28,
		"sensor_error": 13.28
	}
]
```

### `GET /faults/{uuid}`

Descrição: Retorna os Faults de uma determinada Capability por seu uuid.

Parâmetros de rota:

- `uuid`: O UUID da Capability.

EXEMPLO

`GET /faults/04025dee-a676-48c7-996e-6c3999454a07 `

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

### `DELETE faults/{uuid}`

Descrição: Deleta os dados de uma determinado UUID da Capability

Parâmetros de rota:
- `uuid`: O UUID da Capability.

EXEMPLO

`DELETE faults/04025dee-a676-48c7-996e-6c3999454a07`