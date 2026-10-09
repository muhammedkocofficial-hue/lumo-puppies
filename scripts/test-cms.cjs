/* eslint-disable @typescript-eslint/no-require-imports -- isolated server handler tests */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ts=require('typescript');
const {NextRequest}=require('next/server');
let authorized=false,calls=0,upstreamStatus=200,rows=[{id:'test'}];
class CmsError extends Error{constructor(message,status=500){super(message);this.status=status;}}
const environment={NODE_ENV:'production',NEXT_PUBLIC_SITE_URL:'https://lumo.test',SUPABASE_URL:'https://project.supabase.co'};
function load(file,custom={}){const sandbox={exports:{},process:{env:environment},Buffer,TextDecoder,URL,crypto:require('node:crypto').webcrypto,require:name=>name in custom?custom[name]:require(name)};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,sandbox);return sandbox.exports;}
const validation=load('src/lib/cms-validation.ts');
const handlers=load('src/app/api/admin/[action]/route.ts',{'@/lib/cms-validation':validation,'@/lib/cms-server':{CmsError,sessionCookie:'lumo_admin_session',config:()=>({url:environment.SUPABASE_URL}),requireAdmin:async()=>{if(!authorized)throw new CmsError('Login required',401);return 'token';},supabase:async(url)=>{calls++;if(url.startsWith('/auth/v1/token'))return Response.json({access_token:'test-token',expires_in:3600,user:{id:'test-user'}},{status:upstreamStatus});return Response.json(rows,{status:upstreamStatus});}}});
const ctx=action=>({params:Promise.resolve({action})});
function request(action,body,origin='https://lumo.test'){return new NextRequest('https://lumo.test/api/admin/'+action+'/',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
let checks=0;
(async()=>{
let response=await handlers.GET(new NextRequest('https://lumo.test/api/admin/content/'),ctx('content'));assert.equal(response.status,401);checks++;
for(const action of ['save','delete','upload']){response=await handlers.POST(request(action,{}),ctx(action));assert.equal(response.status,401);checks++;}
response=await handlers.POST(request('login',{},'https://attacker.test'),ctx('login'));assert.equal(response.status,403);assert.equal(calls,0);checks++;
response=await handlers.POST(request('login',{email:'owner@example.com',password:'secret-password'}),ctx('login'));assert.equal(response.status,200);const cookie=response.headers.get('set-cookie');assert.ok(cookie.includes('HttpOnly')&&cookie.includes('Secure')&&cookie.includes('SameSite=strict'));assert.ok(!(await response.text()).includes('test-token'));checks++;
authorized=true;
const entry={kind:'puppy',slug:'luna',published:true,payload:{title:'Luna',description:'Approved profile',breed:'Toy Poodle',images:[{src:'/media/examples/poodle-portrait.webp',alt:'Luna'}],body:''}};
assert.equal(validation.validateEntry({...entry,payload:{...entry.payload,featured:true}}).payload.featured,true);checks++;
assert.equal(validation.validateEntry({...entry,payload:{...entry.payload,featured:"true"}}).payload.featured,false);checks++;
response=await handlers.POST(request('save',entry),ctx('save'));assert.equal(response.status,200);checks++;
for(const src of ['javascript:alert(1)','https://attacker.test/image.webp','/media/../../secret.png','/media/photo.svg']){assert.throws(()=>validation.validateEntry({...entry,payload:{...entry.payload,images:[{src,alt:'Test'}]}}));checks++;}
assert.throws(()=>validation.validateEntry({...entry,payload:{...entry.payload,images:[]}}));checks++;
assert.throws(()=>validation.validateEntry({...entry,payload:{...entry.payload,birthDate:'2099-01-01'}}));checks++;
rows=[];response=await handlers.POST(request('save',{...entry,id:'12345678-1234-1234-1234-123456789012',updated_at:'2026-01-01T00:00:00Z'}),ctx('save'));assert.equal(response.status,409);checks++;
response=await handlers.POST(new NextRequest('https://lumo.test/api/admin/upload/',{method:'POST',headers:{origin:'https://lumo.test'},body:'<svg onload="alert(1)"></svg>'}),ctx('upload'));assert.equal(response.status,400);checks++;
response=await handlers.POST(request('save',{body:'a'.repeat(100001)}),ctx('save'));assert.equal(response.status,413);checks++;
response=await handlers.POST(request('logout',{}),ctx('logout'));assert.ok(response.headers.get('set-cookie').includes('Max-Age=0'));checks++;
console.log(JSON.stringify({passed:true,checks,scope:'Validation and API boundary unit tests; real Supabase RLS needs live project verification.'}));
})().catch(e=>{console.error(e);process.exitCode=1;});
