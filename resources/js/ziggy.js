const Ziggy = {"url":"http:\/\/127.0.0.1","port":null,"defaults":{},"routes":{"debugbar.openhandler":{"uri":"_debugbar\/open","methods":["GET","HEAD"]},"debugbar.clockwork":{"uri":"_debugbar\/clockwork\/{id}","methods":["GET","HEAD"]},"debugbar.telescope":{"uri":"_debugbar\/telescope\/{id}","methods":["GET","HEAD"]},"debugbar.assets.css":{"uri":"_debugbar\/assets\/stylesheets","methods":["GET","HEAD"]},"debugbar.assets.js":{"uri":"_debugbar\/assets\/javascript","methods":["GET","HEAD"]},"debugbar.cache.delete":{"uri":"_debugbar\/cache\/{key}\/{tags?}","methods":["DELETE"]},"quotes.store":{"uri":"quotes","methods":["POST"]},"quotes.show":{"uri":"quotes\/{quote}","methods":["GET","HEAD"],"bindings":{"quote":"id"}},"quotes.update":{"uri":"quotes\/{quote}","methods":["PUT","PATCH"],"bindings":{"quote":"id"}},"quotes.destroy":{"uri":"quotes\/{quote}","methods":["DELETE"],"bindings":{"quote":"id"}}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    for (let name in window.Ziggy.routes) {
        Ziggy.routes[name] = window.Ziggy.routes[name];
    }
}

export { Ziggy };
