var PromiseFtp = require('promise-ftp');

var exluded = JSON.parse(core.getInput('exclude')) || ['source.zip'];
var host =  core.getInput('host', { required: true });
var user =  core.getInput('user', { required: true });
var password =  core.getInput('password', { required: true });

(async function clean(host, user, password) {
    var ftp = new PromiseFtp();
    await ftp.connect({ host: host, user: user, password: password });
    var list = await ftp.list('/')
    if(list.filter(obj => obj.name == 'web.config').length > 0){
        await ftp.delete('web.config');  //force IIS to unload the application
        console.log("Deleting: web.config");
    }
    for (var i = 0; i < list.length; i++) {
        var current = list[i];
        console.log("Deleting: " + current.name);
        if(exluded.filter(obj => obj == current.name) == 0 && current.name != "web.config"){
            switch(current.type){
                case '-':
                    await ftp.delete(current.name)
                    break;
                case 'd':
                    await ftp.rmdir("/" + current.name, true);
                    break;
            }
        }
    }
    await ftp.end();
})(host, user, password);
