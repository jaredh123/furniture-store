$(document).ready(function() {
  // $("#run").submit(function(event) {
  //   event.preventDefault();
  // });
  
  var request = new XMLHttpRequest();
  request.open('GET', "https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture/", true);
  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {
      let body = JSON.parse(this.response);
      let types = [];
      
      for (let i = 0; i < body.body.data.length; i++) {
        body.body.data[i].id = i;
        if (!types.includes(body.body.data[i].type)) {
          types.push(body.body.data[i].type);
        }
      }
      
      console.log(types);
      
    }
  }

  request.send()
  
});