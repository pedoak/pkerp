# Sistema de Controle de Extrusão

Sistema web para gerenciamento de processos de extrusão, incluindo controle de insumos, receitas e custos.

## Funcionalidades

- Cadastro e gerenciamento de insumos
- Formulação de receitas
- Cálculo de custos de produção
- Gestão de fornecedores e preços
- Controle de máquinas
- Sistema de autenticação e autorização

## Tecnologias

- React + TypeScript
- Tailwind CSS
- Supabase (Banco de dados e autenticação)
- Vite (Build tool)

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React
  ├── contexts/      # Contextos React
  ├── hooks/         # Custom hooks
  ├── lib/           # Configurações
  ├── pages/         # Páginas
  ├── services/      # Serviços
  ├── types/         # Types
  └── utils/         # Utilitários
```

## Banco de Dados

Principais tabelas:
- `insumos`: Matérias-primas
- `receitas`: Formulações
- `fornecedores`: Fornecedores
- `precos_insumos`: Preços
- `maquinas`: Máquinas

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm run dev
```

## Segurança

- Autenticação via Supabase
- Row Level Security (RLS)
- Aprovação de usuários
- Controle de acesso (admin/usuário)