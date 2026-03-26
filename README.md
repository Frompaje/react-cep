# ZipRange Locator

Frontend em React + TypeScript para busca de CEPs por raio, consumindo a API backend.

## Requisitos

- Node.js `20.19+` ou `22.12+`
- npm `10+`
- Backend rodando com endpoint `GET /ceps/radius`

## Como baixar o projeto

```bash
git clone <url-do-repositorio>
cd react-cep
```

## Como instalar

```bash
npm install
```

## Configurar ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

`VITE_API_URL` deve apontar para a URL base da API backend.

## Como usar

Inicie o projeto:

```bash
npm run dev
```

Abra no navegador:

`http://localhost:5173`

## Contrato da API usado no frontend

### Requisição

`GET /ceps/radius?cep=69005010&raioKm=4`

### Exemplo de resposta

```json
{
  "cepOrigem": "69010300",
  "raioKm": 10,
  "total": 14,
  "ceps": [
    "69005010",
    "69005110",
    "69010060"
  ]
}
```

## Scripts úteis

- `npm run dev`: inicia em desenvolvimento
- `npm run build`: gera build de produção
- `npm run preview`: serve build localmente
- `npm run lint`: roda lint

## Funcionalidades

- Formulário com validação (`react-hook-form` + `zod`)
- Busca por CEP de origem e raio
- Exibição de resultados em cards
- Telemetria de RTT no frontend
- Toaster para sucesso e erro
- Loading com Skeleton
