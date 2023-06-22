# LapesFI

<img src="./docs/logo_lapes.png" alt="logo Lapes">

## Visão Geral

A LapesFI é uma API REST desenvolvida como parte de um projeto da FAPESP, relacionado a criação de um injetor de erros em aplicações de Cidades Inteligentes. Essa API foi desenvolvida com o objetivo de fornecer funcionalidades para a injeção de erros controlados em sistemas baseados no middleware InterSCity.

## Funcionalidades Principais

- Injeção de erros controlados na plataforma InterSCity
- Simulação de diferentes tipos de falhas, incluindo:
  - Bias
  - Drift
  - Loss of Accuracy
  - Freezing
  - Calibration Error
- Avaliação da resiliência e confiabilidade do sistema

## Requisitos

TODO

## Endpoints

`POST /resources`

Descrição: Cria um novo Resource e suas Capabilities.

Parâmetros:

- `description` (obrigatório): uma breve descrição do Resource.
- `capabilities` (obrigatório): são as capabilities que o Resource possui.
- `resourceEnvironment`(obrigatório): é o ambiente que o Resource se encontra (Indoor e Outdoor).

EXEMPLO

```
{
  "description": "A public bus",
  "capabilities": [
    {
      "name": "temperature",
      "value": 23
    },
    {
      "name": "humidity",
      "value": 100
    }
  ],
  "resourceEnvironment": "Indoor"
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
		"resourceEnvironment": "Indoor"
	},
	{
		"uuid": "252fa054-d401-43ce-859d-6bb25c12e8f6",
		"description": "A public bus 2",
		"capabilities": [
			{
				"capability_uuid": "e4315e35-787a-490b-aa2d-b10c73622ecd",
				"name": "temperature",
				"value": 25
			},
			{
				"capability_uuid": "ecd230c5-1dab-43ff-88da-b309e6325a80",
				"name": "humidity",
				"value": 25.2
			}
		],
		"resourceEnvironment": "Indoor"
	}
]
```

`GET /resources/{uuid}`

Descrição: Retorna os detalhes de um Resource específico.

Parâmetros de rota:

- uuid: O UUID do Resource.

TODO

`DELETE /resources/{uuid}`

Descrição: Deleta um Resource específico.

Parâmetros de rota:

- uuid: O UUID do Resource.

TODO

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
