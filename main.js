var scraper = require('./module.js')

scraper.getContent('http://substack.net/images/', function(error, body){
  if (error){
    console.log(error)
  } 
  else {
    scraper.filterContent(body, function(output){
      scraper.outputToCSV(output)
    })
  }
})