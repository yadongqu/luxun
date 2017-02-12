var fs = require('fs');
var path = require('path');

var DEFAULT_SOURCE_FOLDER = './awesome'

var showHelpMenu = function(){
    console.log("show help menu");
}

var commandHandler = function(){
    
}

module.exports.run = function(args) {
    var num = args.length;
    
    if (num > 2){
        if(args[2] === 'init'){
            if (num === 3){
                if (!fs.existsSync(DEFAULT_SOURCE_FOLDER)){
                    fs.mkdirSync(DEFAULT_SOURCE_FOLDER);
                }
            } else {
                var folder = './' + args[3];
                if (!fs.existsSync(folder)){
                    fs.mkdirSync(folder);
                }
            }
        }

    } else {
        showHelpMenu();
    }
}



