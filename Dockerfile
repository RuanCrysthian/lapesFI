# Use uma imagem base com o Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /src

# Copie os arquivos de dependências para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte da aplicação para o diretório de trabalho
COPY . .

RUN npm run build

# Exponha a porta que a aplicação está ouvindo
EXPOSE 4000

# Comando padrão para iniciar a aplicação e criar as tabelas do banco de dados

CMD ["npm", "run" , "start"]
