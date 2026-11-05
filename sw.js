var CACHE='gym-plan-v1';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
  e.respondWith(caches.open(CACHE).then(function(cache){
    return cache.match(req,{ignoreSearch:true}).then(function(hit){
      var net=fetch(req).then(function(res){
        if(res&&res.status===200)cache.put(req,res.clone());
        return res;
      }).catch(function(){return hit});
      return hit||net;
    });
  }));
});
