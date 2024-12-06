# API de E-commerce

Bem-vindo à API de E-commerce, uma solução robusta e escalável desenvolvida com o [NestJS](https://nestjs.com/), um framework moderno e eficiente para aplicações em Node.js. Este projeto foi criado para oferecer uma plataforma completa para o gerenciamento de produtos, usuários e operações relacionadas, com foco em segurança, desempenho e experiência do usuário.

## 📖 Visão Geral

A API de E-commerce foi projetada com uma arquitetura modular e flexível, garantindo fácil expansão e adaptação às demandas de negócios. Com princípios sólidos de arquitetura de software e as melhores práticas em segurança de dados, ela oferece um ambiente confiável para o desenvolvimento de soluções personalizadas para comércio eletrônico.

---

## 🚀 Funcionalidades

### 🔐 **Autenticação e Autorização Segura**
- Implementação de **JSON Web Tokens (JWT)** para autenticação e autorização.
- Rotas públicas e protegidas para diferentes níveis de acesso.
- Controle granular de permissões para usuários e administradores.

### 📦 **Gerenciamento Completo de Produtos**
- Endpoints para **CRUD de produtos** (criação, leitura, atualização e exclusão).
- Integração com categorias para organização e melhor navegabilidade.

### 🗂️ **Estruturação por Categorias**
- Organização de produtos em categorias para facilitar a descoberta e melhorar a experiência de compra.

### 🏠 **Gerenciamento de Endereços**
- Endpoints para cadastro, edição e exclusão de endereços.
- Integração com a API dos Correios para validação de CEPs.

### 🚚 **Simulação de Frete com Melhor Envio**
- Integração com a API do Melhor Envio para cálculo de frete com base nos produtos cadastrados.

### 🛒 **Gestão de Compras**
- Cadastro e recuperação de compras associadas a usuários.
- Endpoints para visualizar compras pessoais e por usuários específicos (admin).

### 🛠️ **Documentação Interativa com Swagger**
- Interface gráfica para explorar e testar endpoints diretamente na documentação.
- Fácil compreensão das funcionalidades e rápida integração por desenvolvedores.

---

## 🌐 Estrutura de Endpoints
**Atenção:** Algumas rotas são protegidas e exigem permissões de administrador.  

### **Autenticação**
- `POST /login` - Realiza login e retorna o token JWT.

### **Usuários**
- `POST /usuarios/admin` - Cadastro de um administrador.
- `POST /usuarios` - Cadastro de um usuário comum.
- `GET /usuarios` - Lista todos os usuários (admin).
- `GET /usuarios/email/{email}` - Consulta um usuário pelo e-mail.
- `GET /usuarios/{id}` - Consulta um usuário pelo ID.
- `PATCH /usuarios/{id}` - Atualiza dados de um usuário.
- `DELETE /usuarios/{id}` - Exclui um usuário.

### **Categorias**
- `POST /categorias` - Criação de categorias.
- `GET /categorias` - Lista todas as categorias.
- `GET /categorias/{id}` - Consulta uma categoria pelo ID.
- `PATCH /categorias/{id}` - Atualiza uma categoria.
- `DELETE /categorias/{id}` - Exclui uma categoria.
- `GET /categorias/{id}/produtos` - Lista produtos de uma categoria.

### **Produtos**
- `POST /produtos` - Cadastro de produtos.
- `GET /produtos` - Lista todos os produtos.
- `GET /produtos/{id}` - Consulta um produto pelo ID.
- `PATCH /produtos/{id}` - Atualiza um produto.
- `DELETE /produtos/{id}` - Exclui um produto.

### **Endereços**
- `POST /enderecos` - Cadastro de um endereço.
- `GET /enderecos/me` - Recupera os endereços do usuário logado.
- `GET /enderecos/usuario/{id}` - Lista endereços de um usuário específico.
- `PATCH /enderecos/{id}` - Atualiza um endereço.
- `DELETE /enderecos/{id}` - Exclui um endereço.

### **Correios**
- `GET /correios/{cep}` - Consulta e validação de CEP usando a API dos Correios.

### **Melhor Envio**
- `POST /melhor-envio/preco/{produtoId}` - Calcula o frete de um produto.

### **Compras**
- `POST /compras` - Realiza uma compra.
- `GET /compras/me` - Lista compras do usuário logado.
- `GET /compras/usuario/{id}` - Lista compras de um usuário específico (admin).

---

## 🛠️ Tecnologias Utilizadas
- **NestJS** - Framework back-end em Node.js.
- **TypeScript** - Superset para JavaScript, utilizado para maior segurança e escalabilidade.
- **JWT** - Para autenticação e autorização.
- **Swagger** - Documentação interativa da API.
- **API dos Correios** - Validação de endereços.
- **Melhor Envio** - Cálculo de frete.

---

## 💻 Como Começar

1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>
   
2. Instale as dependências:
   ```bash
   npm install
   
3. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   
4. Inicie o servidor:
   ```bash
   npm run install
