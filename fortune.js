(function(window){
    'use strict';

    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

    function readFile(filePath,callback) {
        reader.open('get', filePath, true); 
        reader.onreadystatechange = function(){
            if(reader.readyState === 4) {
                if(reader.status === 200){
                    callback(true,reader.responseText);
                }else{
                    callback(false);
                }
            }
        };
        reader.send(null);
    }


    function define_fortune(){
        var fortune = {};
        var fileContents;
        var filePath;

        function getRandomLine(callback){
            var random = Math.floor(Math.random() * fileContents.length);
            var line = fileContents[random];
            return line;
        }

        function setFile(callback,filePath){
            if(typeof filePath === 'undefined'){
                var scripts = document.getElementsByTagName("script"),
                src = scripts[scripts.length-1].src;
                var fileFolder = src.substr(0, src.lastIndexOf("/"));
                filePath = fileFolder + '/quotes.txt';
            }

            readFile(filePath, function(loaded,content){
                if(loaded){
                    fileContents = content.split("\n");
                    callback();
                }else{
                    console.error("File couldn't be read");
                }
            });
        }

        fortune.getQuote = function(callback,filePath){
            if(typeof fileContents === 'undefined'){
                setFile(function(){
                    callback(getRandomLine());
                },filePath);
            }else{
                callback(getRandomLine());
            }
        }

        return fortune;
    }    


    if(typeof(Fortune) === 'undefined'){
        window.fortune = define_fortune();
    }
    else{
        console.log("Fortune already defined.");
    }
})(window);