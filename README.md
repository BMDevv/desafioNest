# IN HOUSE AirTag Rental API

Esta API permite gerenciar clientes, AirTags e locações (rentals) para a empresa IN HOUSE. A seguir estão os passos para testar os principais endpoints utilizando o Postman.

## Pré-requisitos
- Node.js instalado
- Postman instalado
- Banco de dados PostgreSQL rodando e configurado

## Instalação

Clone o repositório:

```bash
git clone <repository_url>
cd <repository_directory>
cp .env.example .env
start <docker-compose up -d>


Endpoints

1. Criar um Cliente
Método: POST
URL: http://localhost:3000/clients
Corpo (Body):
{
  "name": "Cliente 1",
  "email": "cliente1@example.com"
}


2. Criar uma AirTag
Método: POST
URL: http://localhost:3000/airtags
Corpo (Body):
{
  "macAddress": "00:1A:7D:DA:71:13",
  "name": "AirTag 1"
}


3. Iniciar uma Locação
Método: POST
URL: http://localhost:3000/rentals/start
Corpo (Body):
{
  "clientId": 1,
  "airTagId": 1
}

4. Finalizar uma Locação
Método: PUT
URL: http://localhost:3000/rentals/end
Corpo (Body):
{
  "airTagId": 1,
  "clientId": 1
}

5. Obter Clientes com Locações Ativas e Suas Dívidas
Método: GET
URL: http://localhost:3000/clients


