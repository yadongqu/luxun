var fs = require('fs');
var path = require('path');

var marked = require('marked');

var DEFAULT_SOURCE_FOLDER = './awesome'
var DEFAULT_CONTENT_FOLDER = '/content'
var DEFAULT_STYLE_FOLDER = '/css'
var DEFAULT_JS_FOLDER = '/js'

var PUBLIC_FOLDER = './public'

var showHelpMenu = function(){
    console.log("show help menu");
}

var commandHandler = function(){
    
}

var initBlog = function(folder){
    fs.mkdirSync(folder);
    fs.mkdirSync(folder + DEFAULT_CONTENT_FOLDER);
    fs.mkdirSync(folder + DEFAULT_STYLE_FOLDER);
    fs.mkdirSync(folder + DEFAULT_JS_FOLDER);
}


module.exports.run = function(args) {
    var num = args.length;
    
    if (num > 2){
        if(args[2] === 'init'){
            if (num === 3){
                initBlog(DEFAULT_SOURCE_FOLDER)
            } else {
                var folder = './' + args[3];
                initBlog(folder);
            }
        }

        if(args[2] === 'generate'){
            fs.mkdirSync(PUBLIC_FOLDER);
            fs.readFile('./blog/content/helloworld.md','utf8', function(err, content){
                console.log(typeof content);
                console.log(marked(content));
                fs.open('index.html', 'wx', (err, fd) => {
                if (err) {
                    if (err.code === "EEXIST") {
                        console.error('myfile already exists');
                        return;
                    } else {
                    throw err;
                    }
                }

                fs.writeFile('./public/index.html', marked(content), function(err){
                    if(err){
                        return console.log(err);
                    }
                    console.log("Thie file was saved!");
                })
                });
            });
            console.log('after clalling readFile');
        }

        if (args[2] === 'serve'){
            var express = require('express');
            var app = express();
            app.use(express.static('./public'));
            app.listen(3000, function(){
                console.log('Example app listening on port 3000!')
            })
        }
    } else {
        showHelpMenu();
    }
}



