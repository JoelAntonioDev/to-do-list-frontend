📌 To-Do List Front-End

Este projeto é a interface de um sistema de gerenciamento de tarefas, desenvolvido com React + TypeScript + Vite.
🚀 Tecnologias Utilizadas

    React 19
    TypeScript
    Vite
    React Router
    ESLint

📦 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:
1️⃣ Clonar o repositório

git clone https://github.com/JoelAntonioDev/to-do-list-frontend.git

cd to-do-list-frontend

2️⃣ Instalar as dependências

npm install

3️⃣ Executar o projeto

npm run dev

    O projeto será iniciado em http://localhost:5173/.

📜 Scripts Disponíveis

Os seguintes scripts estão disponíveis no package.json:
Comando	Descrição
npm run dev	Inicia o servidor de desenvolvimento.
npm run lint	Analisa e corrige problemas no código com o ESLint.
🛠️ Configuração do ESLint

Este projeto usa ESLint para manter um código limpo e padronizado.
Para rodar a verificação manualmente:

npm run lint

📝 Estrutura do Projeto

📦 to-do-list-front
├── 📂 src
│   ├── 📂 components  # Componentes reutilizáveis
│   ├── 📂 pages       # Páginas principais
│   ├── 📂 services    # Comunicação com a API
│   ├── 📂 styles      # Estilos globais
│   ├── 📜 main.tsx    # Arquivo principal do React
│   ├── 📜 App.tsx     # Configuração das rotas
│   ├── 📜 vite-env.d.ts  # Tipagem do Vite
├── 📜 package.json    # Dependências e scripts
├── 📜 tsconfig.json   # Configuração do TypeScript
├── 📜 vite.config.ts  # Configuração do Vite
└── 📜 README.md       # Este arquivo
...


🔗 Backend

Este projecto comunica-se com o backend disponível em:
🔗 http://localhost:3000

Certifique-se de que a API esteja rodando antes de iniciar o front-end.

🛠️ Personalizações

Caso precise alterar a porta do servidor de desenvolvimento, edite o arquivo vite.config.ts:

export default defineConfig({
  server: {
    port: 3001, // Altere a porta conforme necessário
  },
});


📌 Feito com 💙 por Joel António