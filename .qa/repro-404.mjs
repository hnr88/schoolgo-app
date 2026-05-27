import fs from 'node:fs';
import { chromium } from '@playwright/test';
const JWT = fs.readFileSync('/tmp/parent.jwt','utf8').trim();
const H = { Authorization:`Bearer ${JWT}`, 'X-User-Type':'parent' };
// 1) upload photo
const fd = new FormData();
fd.append('files', new Blob([fs.readFileSync('tests/e2e/fixtures/photo.png')], {type:'image/png'}), 'photo.png');
const up = await fetch('http://localhost:1337/api/upload', { method:'POST', headers:H, body:fd });
const upJson = await up.json();
const media = Array.isArray(upJson) ? upJson[0] : upJson;
console.log('upload status', up.status, 'mediaId', media?.id, 'url', media?.url, 'formats', media?.formats?JSON.stringify(Object.keys(media.formats)):'none');
// 2) create student with photo
const body = { data: { firstName:'Repro', lastName:'Kid'+Date.now(), nationality:'Australia', targetEntryYear:'2027', targetEntryTerm:'Term 1', parentGuardianName:'P G', parentGuardianPhone:'+61400000001', preferredContactChannel:'whatsapp', photo: media.id } };
const cr = await fetch('http://localhost:1337/api/students', { method:'POST', headers:{...H,'Content-Type':'application/json'}, body:JSON.stringify(body) });
const crJson = await cr.json();
const docId = crJson?.data?.documentId;
console.log('create status', cr.status, 'documentId', docId);
// 3) probe detail immediately
const b = await chromium.launch();
const ctx = await b.newContext({ storageState:'tests/e2e/.auth/parent.json', viewport:{width:1440,height:900} });
const page = await ctx.newPage();
const failed=[];
page.on('response', r=>{ if(r.status()>=400) failed.push(r.status()+' '+decodeURIComponent(r.url()).slice(0,160)); });
await page.goto('http://localhost:3000/parent/students/'+docId, { waitUntil:'networkidle', timeout:45000 });
await page.waitForTimeout(2000);
console.log('FAILED:', JSON.stringify(failed,null,1));
await b.close();
