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

# Exponha a porta que a aplicação está ouvindo
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["node", "dist/server.js"]
