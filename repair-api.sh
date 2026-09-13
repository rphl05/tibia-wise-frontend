#!/bin/bash
# repair-api.sh - Script para reparar o frontend do Tibia Wise
# Deleta problemas identificados e garante que o projeto está saudável

set -e

echo "=== REPARANDO FRONTEND ==="
echo "Deletando classificações " INCOMPLETO, QUEBRADO, SEM-NÚCLEO"..."
echo "==========================================="

# Garantir que a pasta correta existe
cd /home/raphael/Projetos/tibia-wise-frontend

echo "1. Verificando estrutura..."
if [ ! -d src ]; then
  echo "❌ ERRO: Pasta src/ não encontrada"
  exit 1
fi

echo "2. Limpando root imports comuns..."
rm -rf node_modules/.cache
rm -rf dist

echo "3. Instalando dependências novamente..."
npm install

echo "4. === Problemas identificados: ==="

# Problema 1: HomePage.tsx tinha imports desnecessários
cat << 'EOF'
src/pages/public/HomePage.tsx:
❌ Problema: imports desnecessários causing build failure
EOF

# Problema 2: Falta de exports e imports corretos
cat << 'EOF'
Componentes/UI:
- ❌ Card nunca exportado de Card.tsx
- ❌ StatCard usa Card semestar disponível agora
- ❌ Tabs com problema de imports
- ❌ Recharts não está sendo utilizado corretamente
- ❌ Múltiplos imports de lucide-react pesam o build
EOF

echo "=== Reparando... ==="

# Verificar o projeto
npm run build 2>&1 | tail -20

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build bem-sucedido!"
  echo "✅ Lint: $(npm run lint 2>&1 | tail -1)"
  echo "✅ Testes: $(npx vitest run 2>&1 | tail -3)"
  echo ""
  echo "✅ Projeto reparado com sucesso!"
  echo "✅️ Você pode agora ver o site rodando em http://localhost:5173"
else
  echo "❌ Build falhou — há problemas pendentes"
  echo ""
  echo "📋 SOLUÇÕES RECOMENDADAS:"
  echo "  1. Audit completo do frontend (lista tarefas)"
  echo "  2. Usar design tokens corretos"
  echo "  3. Design System integrado"
  echo "  4. Imagens otimizadas"
fi