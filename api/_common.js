const admin=require('firebase-admin');
function env(...names){for(const n of names){const v=process.env[n];if(v)return v}return ''}
function getAdmin(){
 if(!admin.apps.length){
  const raw=env('FIREBASE_SERVICE_ACCOUNT_JSON');
  let cred;
  if(raw){cred=JSON.parse(raw)}else{
   const projectId=env('FIREBASE_PROJECT_ID','ID_DO_PROJETO_FIREBASE');
   const clientEmail=env('FIREBASE_CLIENT_EMAIL','E-MAIL DO CLIENTE FIREBASE','EMAIL_DO_CLIENTE_FIREBASE');
   let privateKey=env('FIREBASE_PRIVATE_KEY');
   if(privateKey)privateKey=privateKey.replace(/\\n/g,'\n');
   if(!projectId||!clientEmail||!privateKey)throw new Error('Configure FIREBASE_PROJECT_ID/ID_DO_PROJETO_FIREBASE, FIREBASE_CLIENT_EMAIL/E-MAIL DO CLIENTE FIREBASE e FIREBASE_PRIVATE_KEY na Vercel');
   cred={project_id:projectId,client_email:clientEmail,private_key:privateKey};
  }
  admin.initializeApp({credential:admin.credential.cert(cred),projectId:cred.project_id});
 }
 return admin;
}
function noCache(res){res.setHeader('Cache-Control','no-store, max-age=0')}
module.exports={getAdmin,noCache};
