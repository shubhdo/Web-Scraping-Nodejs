var express=require("express")
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.get('/scrape', function(req, res){

     var url = 'http://www.imdb.com/title/tt1229340/';
     request(url,function (error,res,html) {
         if(!error) {
             var $=cheerio.load(html)
             
             var title,release,rating;
             var json={title:"",release:"",rating:""}
             
             $(".header").filter(function() {
                 var data=$(this);
                 
                 title=data.children().first().text()
                 
                 json.title=title
                 
                 release=data.children().last().text()
                 
                 json.release=release
                 
                 
             })
             
             $(".star-box-giga-star").filter(function () {
                 
                 var data=$(this).load()
                 
                 rating=data.text()
                 
                 json.rating=rating
                 
                 
             })
         }
         
         fs.writeFile('output.json',JSON.stringify(json,null,4),function(err) {
             console.log('File successfully written')
         })

     })
     
     

})

app.listen(process.env.PORT||8081);
console.log("listening on port 8081")
exports=module.exports=app