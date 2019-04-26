$(document).ready(function() {

  var request = new XMLHttpRequest();
  request.open('GET', "https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture/", true);
  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {
      let body = JSON.parse(this.response);
      let types = [];

      //Reset ID's and list types
      for (let i = 0; i < body.body.data.length; i++) {
        body.body.data[i].id = i;
        if (!types.includes(body.body.data[i].type)) {
          types.push(body.body.data[i].type);
        }
      }

      //List types on page
      for (let i = 0; i < types.length; i++) {
        $("#furnitureTypes").append(`<li class="type" id="${types[i]}">${types[i]}</li>`);
      }

      function displayFurnitureItems(type) {
        for (let i = 0; i < body.body.data.length; i++) {
          if (body.body.data[i].type === type) {
            $("#itemsLocation").append(`<li class=furnitureItem id="${body.body.data[i].id}">${body.body.data[i].name}</li>`);
          }
        }
        $(".furnitureItem").click(function(event) {
          event.preventDefault();
          $("#detailsLocation, #imageLocation").empty();
          let id = this.getAttribute("id");
          displayItemDetails(id);
        });
      }

      function displayItemDetails(id) {
        id = parseInt(id);
        for (let i = 0; i < body.body.data.length; i++) {
          if (body.body.data[i].id === id) {
            let colors = body.body.data[i].colors.join(", ");
            let deliverable = "";
            if (body.body.data[i].deliverable === true) {
              deliverable = "Delivery available.";
            }
            else {
              deliverable = "Delivery unavailable.";
            }

            //Display furniture item details
            $("#detailsLocation").append(`<p> <span id=name><strong>${body.body.data[i].name}</strong></span> -- $${body.body.data[i].cost}</p>`);
            $("#detailsLocation").append(`<p>${body.body.data[i].description}</p>`);
            $("#detailsLocation").append(`<p>Colors: ${colors}.</p>`);
            if (body.body.data[i].dimensions) {
              $("#detailsLocation").append(`<p>Dimensions: ${body.body.data[i].dimensions.length}" L x ${body.body.data[i].dimensions.width}" W</p>`);
            }
            $("#detailsLocation").append(`<p>Stock: ${body.body.data[i].stock}</p>`);
            $("#detailsLocation").append(`<p><em>${deliverable}</em></p>`);

            //Display image
            $("#imageLocation").append(`<img src=${body.body.data[i].imageUrl} alt="${body.body.data[i].name} photo">`);

            console.log(`id: ${body.body.data[i].id}`);
            console.log(`name: ${body.body.data[i].name}`);
            console.log(`$${body.body.data[i].cost}`);
            console.log(body.body.data[i].description);
            console.log(`${body.body.data[i].dimensions.length}" L x ${body.body.data[i].dimensions.width}" W`);
            console.log(`Stock: ${body.body.data[i].stock}`);
            console.log(deliverable);
          }
        }
      }

      console.log(types);

      $(".type").click(function(event) {
        event.preventDefault();
        $("#itemsLocation").empty();
        let id = this.getAttribute("id");
        displayFurnitureItems(id);
      });
    }
  }

  request.send()

});