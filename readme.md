
# Aplicação Mensageria

O resumo dos conceitos se encontra em `./conceitos.txt`

Aplicação simples de mensageria criada utilizando as seguintes tecnologias:

* Express
* RabbitMQ
* TypeScript
* Docker
* Redis

## Instalação

Instale as dependências

```bash
  npm install
```

Em seguida inicie o docker

```bash
  docker-compose up --build -d
```

## API

Certifique-se de utilizar insomnia ou postman, o arquivo de configuração se encontra em `Insomnia_mensageria.json` na raiz do projeto.

#### Envia a mensagem

```
  POST /mensagens/enviar
```

#### Recebe uma mensagem

```
  GET /mensagens/receber
```
