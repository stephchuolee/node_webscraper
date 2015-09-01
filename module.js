var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')


function getContent(url, callback){
  request(url, function(error, response, body){

    if (!error && response.statusCode == 200){
      callback(null, body) 
    }

    else {
      callback(error);
    }
  })
}

function filterContent(content, callback){
  var $ = cheerio.load(content);
  var output = "";

  $('table tr').each(function(i, elem){
    var row = $(elem);
    var permission = row.find('code').first().text()
    var url = "http://substack.net" + row.find('a').attr('href')
    var extRegex = /(?:\.([^.]+))?$/;
    var ext = extRegex.exec(row.find('a').text())[0]
    
    if (ext === "") { 
      output += permission + "," + url + "\n";
    }
    else {
      output += permission + "," + url + "," + ext + "\n";
    }

  });

  callback(output);

};

function outputToCSV(output){
  fs.writeFile('output.csv', output)
};


module.exports = {
  getContent: getContent, 
  filterContent: filterContent,
  outputToCSV: outputToCSV,
}
