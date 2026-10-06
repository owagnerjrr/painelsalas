PAINEL DE SALAS - SENAC TRÊS CORAÇÕES

Arquivos:
- index.html = painel público
- admin.html = administração
- api/state.js = API compartilhada
- api/_common.js = conexão Firebase Admin
- package.json = dependência firebase-admin

IMPORTANTE: na Vercel, mantenha estas variáveis de ambiente em Produção:
- FIREBASE_PROJECT_ID (ou ID_DO_PROJETO_FIREBASE)
- FIREBASE_CLIENT_EMAIL (ou EMAIL_DO_CLIENTE_FIREBASE / E-MAIL DO CLIENTE FIREBASE)
- FIREBASE_PRIVATE_KEY

Depois de extrair/substituir os arquivos, abra PowerShell dentro desta pasta e rode:
  npx vercel link
(se já estiver vinculada ao projeto correto, pode pular)
  npx vercel --prod

Links depois do deploy:
- Painel: https://painel-salas-senac-tc.vercel.app/
- Administração: https://painel-salas-senac-tc.vercel.app/admin.html

Teste:
1. Abra admin.html.
2. Cadastre uma aula futura de hoje.
3. Abra o painel em outra aba/computador.
4. O painel consulta /api/state automaticamente a cada 2 segundos.