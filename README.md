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

<table>
  <tr>
    <th>Entidade</th>
    <th>Endpoint</th>
    <th>Requisições</th>
  </tr>
  <tr>
    <td>Resource</td>
    <td>/resources</td>
    <td><a href="docs/README_Resource.md">Resource</a></td>
  </tr>
  <tr>
    <td>Capability</td>
    <td>/capabilities</td>
    <td><a href="docs/README_Capability.md">Capability</a></td>
  </tr>
  <tr>
    <td>Erros</td>
    <td>/faults</td>
    <td><a href="docs/README_Faults.md">Faults</a></td>
  </tr>
</table>






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
