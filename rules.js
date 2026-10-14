/* Shared battlefield and equipment rules, usable by both the browser and tests. */
(function(root){
 const WORLD=22;
 const buildings=[{x:4,y:5,w:2.4,d:2.4,h:2.2,type:'plant'},{x:16.5,y:5,w:3,d:2,h:2,type:'base'},{x:5,y:16,w:2,d:2,h:1.5,type:'base'},{x:17,y:16,w:2.3,d:2.3,h:2.8,type:'plant'}];
 function blocked(x,y,r=.5){return x<r||y<r||x>WORLD-r||y>WORLD-r||buildings.some(b=>x>b.x-r&&x<b.x+b.w+r&&y>b.y-r&&y<b.y+b.d+r);}
 function clearLine(a,b,r=.55){const d=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.max(1,Math.ceil(d/.2));for(let i=0;i<=steps;i++)if(blocked(a.x+(b.x-a.x)*i/steps,a.y+(b.y-a.y)*i/steps,r))return false;return true;}
 const nodes=[];for(let y=0;y<WORLD;y++)for(let x=0;x<WORLD;x++)if(!blocked(x+.5,y+.5,.6))nodes.push({x:x+.5,y:y+.5,id:y*WORLD+x});
 const nodeMap=new Map(nodes.map(n=>[n.id,n]));
 function nearestNode(p){return nodes.reduce((best,n)=>!best||Math.hypot(n.x-p.x,n.y-p.y)<Math.hypot(best.x-p.x,best.y-p.y)?n:best,null);}
 function path(from,to){const first=nearestNode(from),goal=nearestNode(to),queue=[first],prev=new Map([[first.id,null]]);for(let i=0;i<queue.length;i++){const n=queue[i];if(n.id===goal.id)break;for(const id of [n.id-1,n.id+1,n.id-WORLD,n.id+WORLD]){const next=nodeMap.get(id);if(next&&!prev.has(id)&&Math.abs(n.x-next.x)+Math.abs(n.y-next.y)===1){prev.set(id,n.id);queue.push(next);}}}if(!prev.has(goal.id))return [];const route=[];for(let id=goal.id;id!==null;id=prev.get(id))route.push(nodeMap.get(id));return route.reverse();}
 function spawns(level){const used=[],count=3+level;for(let i=0;i<count;i++){const angle=i/count*Math.PI*2,ideal={x:11+Math.cos(angle)*8,y:10+Math.sin(angle)*7};const candidates=nodes.filter(n=>Math.hypot(n.x-11,n.y-15)>4&&!used.some(p=>Math.hypot(n.x-p.x,n.y-p.y)<1.5)).sort((a,b)=>Math.hypot(a.x-ideal.x,a.y-ideal.y)-Math.hypot(b.x-ideal.x,b.y-ideal.y));const n=candidates.find(p=>path(p,{x:11,y:15}).length>0);if(!n)throw new Error('No reachable enemy spawn');used.push({x:n.x,y:n.y});}return used;}
 const parts={
  armor:{name:'Reactive hull',short:'HULL',description:'Layered ceramic plating keeps you fighting longer.',appearance:'Extra armor tiles, reinforced fenders and a front glacis.',base:200,anchor:[-.35,.27,.5]},
  cannon:{name:'Rail accelerator',short:'CANNON',description:'A longer barrel delivers harder hits with faster reloads.',appearance:'Extended barrel, copper coils and a reinforced muzzle.',base:200,anchor:[1.05,0,.76]},
  engine:{name:'Plasma engine',short:'ENGINE',description:'Plasma exhaust increases your movement speed.',appearance:'Larger exhaust stacks with glowing plasma vents.',base:200,anchor:[-.7,-.2,.65]},
  tracks:{name:'Magnetic tracks',short:'TRACKS',description:'Grip modules boost speed and reduce incoming damage.',appearance:'Cyan tread cleats and armored wheel hubs.',base:250,anchor:[0,.6,.2]},
  shield:{name:'Aegis projector',short:'SHIELD',description:'A rechargeable energy shield absorbs incoming hits.',appearance:'Twin cyan emitter pylons and a visible energy field.',base:350,anchor:[.15,-.44,.9]},
  repair:{name:'Nanite workshop',short:'REPAIR',description:'Repair your hull after five seconds without taking damage.',appearance:'A rear repair module with green service lights.',base:300,anchor:[-.52,.2,.85]},
  rockets:{name:'Swarm launcher',short:'ROCKETS',description:'Launch a homing rocket with splash damage. Press R or tap the rocket button.',appearance:'Shoulder-mounted rocket pods and orange missile tips.',base:400,anchor:[.05,.35,1.05]}
 };
 function stats(u){return {hull:100+(u.armor||0)*30,damage:24+(u.cannon||0)*9,reload:Math.max(.22,.6-(u.cannon||0)*.045),speed:3.4+(u.engine||0)*.42+(u.tracks||0)*.18,mitigation:(u.tracks||0)*.03,shield:(u.shield||0)*20,shieldRegen:(u.shield||0)*3,repair:(u.repair||0)*1.5,rocketDamage:u.rockets?38+u.rockets*22:0,rocketCooldown:12-(u.rockets||0)};}
 function cost(part,level){return parts[part].base+level*175;}
 function damage(t,amount,mitigation=0){const hit=amount*(1-mitigation),absorbed=Math.min(t.shield||0,hit);t.shield=Math.max(0,(t.shield||0)-absorbed);t.hp-=hit-absorbed;return hit-absorbed;}
 function recover(t,s,dt){if(t.sinceHit>=5)t.hp=Math.min(t.maxHp,t.hp+s.repair*dt);if(t.sinceHit>=6)t.shield=Math.min(s.shield,t.shield+s.shieldRegen*dt);}
 const api={WORLD,buildings,blocked,clearLine,path,spawns,parts,stats,cost,damage,recover};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TankRules=api;
})(typeof globalThis!=='undefined'?globalThis:this);
