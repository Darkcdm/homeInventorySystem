function render(locations, items, contentDiv) {

    console.log(locations, items, contentDiv);

    for (var i = 0; i < items.length; i++) {
        const item = items[i];

        for (var j = 0; j < locations.length; j++) {
            const location = locations[j];

            if (item.location == location._id) {
                location.items.push(item);
            }

        }
    }


    for (var i = 0; i < locations.length; i++) {
        const location = locations[i];

        var divLine = document.createElement("div");
        divLine.className = "v_line";
        contentDiv.appendChild(divLine);

        var locationHeader = document.createElement('h5');
        locationHeader.innerHTML = `<bold>${location.name}</bold> ItemCount: ${location.items.length}</location>`;
        divLine.appendChild(locationHeader);

    }
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
/*
[
  {
    "_id": "654fbe721834590d92cadb26",
    "name": "loc1",
    "subLocations": [],
    "items": [],
    "__v": 0
  }
]



[
  {
    "_id": "6563832a95be863adce83e7f",
    "name": "test",
    "location": "654fbe721834590d92cadb26",
    "count": 1,
    "__v": 0
  },
  {
    "_id": "6563833595be863adce83e84",
    "name": "rest",
    "location": "654fbe721834590d92cadb26",
    "count": 1,
    "__v": 0
  },
  {
    "_id": "65649be85547848f4a3530fe",
    "name": "test",
    "location": "654fbe721834590d92cadb26",
    "count": 1,
    "__v": 0
  }
]
*/