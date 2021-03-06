var core = require('@actions/core');
var ftp = require('promise-ftp');

var host =  core.getInput('host', { required: true })
var user =  core.getInput('user', { required: true })
var password =  core.getInput('password', { required: true })
var excluded = JSON.parse(core.getInput('exclude',  { required: true }));

(async function clean(host, user, password, ftp) {
    await ftp.connect({ host: host, user: user, password: password });
    var list = await ftp.list('/')
    if(list.filter(obj => obj.name == 'web.config').length > 0){
        await ftp.delete('web.config');  //force IIS to unload the application
        console.log("Deleting: web.config");
    }
    for (var i = 0; i < list.length; i++) {
        var current = list[i];
        var system_exclusions = ["web.config", ".", ".."]
        if(excluded.filter(obj => obj == current.name) == 0 && system_exclusions.filter(obj => obj == current.name) == 0){
            console.log("Deleting: " + current.name);
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
})(host, user, password, new ftp());