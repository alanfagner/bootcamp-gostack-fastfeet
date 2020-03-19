<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="./frontend/src/assets/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio Final
</h3>

<p align="center">Esse é o desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) Bootcamp GoStack </p>


## :rocket: Sobre o desafio

Durante esse desafio eu aprimorei a aplicação FastFeet, implementando funcionalidades que aprendemos durante as aulas do bootcamp-gostack ministrado pela rockeseat. 

### **Projeto**

O Projeto foi divido em 3 partes
 
 - backend
 - frontend
 - mobile(Testando apenas no Android)


### **Banco de dados utilizados**

Foi adicionando uma pasta docker com um docker-compose configurado com as databases utilizada para o projeto. Ele contem as seguintes images.

 - redis
 - postgres
 
### Informações importantes para utilizar
 
  A applicaçao foi configurada para executar no docker.

  - Configurar mailtrap
    - editar o arquivo [./backend/.env.docker](./backend/.env.docker)
    - adicionar o ```MAIL_USER``` e ```MAIL_PASS```

  - Docker
    - acessar a pasta docker/
    - executar o comando docker-compose up -d

  - Backend
    - a applicaçao vai estar disponivel na url: ```http://localhost:3333```

  - Frontend
    - o frontend vai estar disponivel na url ```http://localhost:3000```    

  - Mobile(Apenas testado no android)
    - acessar a pasta mobile
    - caso precise, alterar a url para o seu backend, navegando ate o arquivo [./mobile/src/services/api/index.js](./mobile/src/services/api/index.js) e alterar a baseURL ```export const baseURL = 'http://10.0.2.2:3333';```
    - executar o comando ```npm install```
    - apos terminar executa o comando ```npm run start```

