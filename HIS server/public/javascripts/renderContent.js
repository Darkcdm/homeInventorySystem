function render(locations, items, contentDiv) {

  // debug printout
  //console.log(locations, items, contentDiv);


  // Assign items to their locations
  for (var i = 0; i < items.length; i++) {
    const item = items[i];

    for (var j = 0; j < locations.length; j++) {
      const location = locations[j];

      if (item.location == location._id) {
        location.items.push(item);
      }

    }
  }


  //if there are parent locations assigned, push them to assigned subLocations
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].parentLocation != undefined) {
      for (var j = 0; j < locations.length; j++) {
        if (locations[i].parentLocation == locations[j]._id) {
          locations[j].subLocations.push(locations[i]);
          locations.splice(i, 1);
          continue;
        }
      }
    }
  }









  //start rendering all root Locations
  for (var i = 0; i < locations.length; i++) {

    renderLocation(locations[i], contentDiv);

  }
}


function renderLocation(location, contentDiv) {

  var divLine = document.createElement("div");
  divLine.className = "v_line";
  contentDiv.appendChild(divLine);




  var locationCard = document.createElement('div');
  locationCard.className = 'card';
  divLine.appendChild(locationCard);

  var locationCardBody = document.createElement('div');
  locationCardBody.className = 'card-body';
  locationCard.appendChild(locationCardBody);

  var LocationNameHeader = document.createElement('h5');
  LocationNameHeader.className = 'card-title';
  LocationNameHeader.innerHTML = `<strong>${location.name}</strong>`;
  locationCard.appendChild(LocationNameHeader);



  if (location.items.length > 0) {



    var itemsDiv = document.createElement('div');
    itemsDiv.className = 'card-deck';

    for (var j = 0; j < location.items.length; j++) {

      var itemCard = document.createElement('div');
      itemCard.className = 'card';
      itemsDiv.appendChild(itemCard);

      var itemCardBody = document.createElement('div');
      itemCardBody.className = 'card-body';
      itemCard.appendChild(itemCardBody);

      var itemNameHeader = document.createElement('h5');
      itemNameHeader.className = 'card-title';
      itemNameHeader.innerHTML = `<strong>${location.items[j].name}</strong>`;
      itemCardBody.appendChild(itemNameHeader);

      var itemCountParaf = document.createElement('p');
      itemCountParaf.className = 'card-text';
      itemCountParaf.innerHTML = `Item Count: ${location.items[j].count}`;
      itemNameHeader.appendChild(itemCountParaf);

    }


    divLine.appendChild(itemsDiv);
  }




  if (location.subLocations) {

    for (var i = 0; i < location.subLocations.length; i++) {

      renderLocation(location.subLocations[i], divLine);

    }

  }

  addItemForm(divLine, location._id);
  addLocationForm(divLine, location._id);

}


function addLocationForm(divLine, locationId) {
  var form = document.createElement('form');
  form.method = "POST";
  form.action = '/his/location/add';

  var divForm = document.createElement('div');
  divForm.className = "form-group";

  var nameInput = document.createElement('input');
  nameInput.name = "name";
  nameInput.type = "text";
  nameInput.placeholder = "Name";

  var locationInput = document.createElement('input');
  locationInput.name = "location";
  locationInput.type = "hidden";
  locationInput.value = locationId;

  var submitButton = document.createElement('button');
  submitButton.className = "btn btn-primary";
  submitButton.type = "submit";
  submitButton.textContent = "Add a Location";

  divLine.appendChild(form);
  form.appendChild(divForm);
  divForm.appendChild(nameInput);
  divForm.appendChild(locationInput);
  divForm.appendChild(submitButton);

}

function addItemForm(divLine, locationId) {

  var form = document.createElement('form');
  form.method = "POST";
  form.action = '/his/item/create';

  var divForm = document.createElement('div');
  divForm.className = "form-group";

  var nameInput = document.createElement('input');
  nameInput.name = "name";
  nameInput.type = "text";
  nameInput.placeholder = "Name";

  var countInput = document.createElement('input');
  countInput.name = "count";
  countInput.type = "number";
  countInput.value = 1;

  var locationInput = document.createElement('input');
  locationInput.name = "location";
  locationInput.type = "hidden";
  locationInput.value = locationId;

  var submitButton = document.createElement('button');
  submitButton.className = "btn btn-primary";
  submitButton.type = "submit";
  submitButton.textContent = "Add an Item";

  divLine.appendChild(form);
  form.appendChild(divForm);
  divForm.appendChild(nameInput);
  divForm.appendChild(countInput);
  divForm.appendChild(locationInput);
  divForm.appendChild(submitButton);

}


function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // 0 to 359
  const saturation = Math.floor(Math.random() * 50) + 50; // 50 to 100
  const lightness = Math.floor(Math.random() * 20) + 40; // 40 to 60
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Function to color divs with the class "v_line"
function colorVerticalLines(className) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach(element => {
    element.style.borderLeftColor = getRandomColor();
  });
}
