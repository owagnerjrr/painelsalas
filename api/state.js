const {getAdmin,noCache}=require('./_common');
module.exports=async(req,res)=>{
 noCache(res);
 try{
  const admin=getAdmin(),db=admin.firestore(),ref=db.collection('app').doc('state');
  if(req.method==='GET'){
   const snap=await ref.get();
   const s=snap.exists?snap.data():{data:{},maintenance:{},people:[],version:0};
   return res.status(200).json({data:s.data||{},maintenance:s.maintenance||{},people:s.people||[],version:s.version||0});
  }
  if(req.method==='POST'){
   const b=req.body||{};
   if(!b.data||typeof b.data!=='object'||!b.maintenance||typeof b.maintenance!=='object'||!Array.isArray(b.people))return res.status(400).json({error:'Estado inválido'});
   let nv=0;
   await db.runTransaction(async tx=>{
    const snap=await tx.get(ref),cur=snap.exists?(snap.data().version||0):0;
    nv=cur+1;
    tx.set(ref,{data:b.data,maintenance:b.maintenance,people:b.people,version:nv,updatedAt:admin.firestore.FieldValue.serverTimestamp()});
   });
   return res.status(200).json({ok:true,version:nv});
  }
  return res.status(405).json({error:'Método não permitido'});
 }catch(e){console.error(e);return res.status(500).json({error:e.message||'Erro interno'})}
};