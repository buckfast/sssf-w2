"use strict";

const categories = ["All"];
const dropdown = document.getElementById("categories");
const id = document.getElementById("images");

const fetchPics = (url, cb) => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(resJSON => {
      console.log(resJSON);
      initMap();
      showCards(resJSON, "All");
      showDropdown(categories);
      cb(resJSON.picArray.length);
  }).catch((err) => {
      console.log(err);
  });
}

const urlParams = (prop)=> {
    let params = {};
    let search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?')+1));
    let definitions = search.split('&');

    definitions.forEach( function(val, key) {
        let parts = val.split('=', 2);
        params[parts[0]] = parts[1];
    });
    return (prop && prop in params) ? params[prop] : params;
}



let showCards = (resJSON, category) => {
  let showModal = (title, src, details, coordinates) => {
    let modal = $("#detailmodal");
    modal.find(".modal-title").text(title);
    modal.find(".modal-body").find("p").text(details);
    modal.modal();

    changeMarkerPos(coordinates, true);

    modal.find(".modal-body").find(".img-responsive").hide();
    modal.find(".modal-body").find(".img-responsive").attr("src", src).on("load", () => {
        modal.find(".modal-body").find(".img-responsive").show();
    })
  }

  let filtered = resJSON.picArray;

  if (category != "All") {
    filtered = resJSON.picArray.filter(obj => {
      return obj.category == category;
    });
  }

  for (let i=0; i<filtered.length; i++) {
      let item = filtered[i];
      let node = document.createElement("div");
      node.className = "col-md-4";

      let node2 = document.createElement("div");
      node2.className = "thumbnail";

      let card = document.createElement("div"); card.className = "card";
      let cardbody = document.createElement("div"); cardbody.className = "card-body";
      let cardtext = document.createElement("p"); cardtext.className = "card-text"; cardtext.innerHTML = item.title;
      let carddate = document.createElement("p"); carddate.className = "card-date"; carddate.innerHTML = item.date;


      let row = document.createElement("div"); row.className = "btn-group card-buttons";
      card.addEventListener("mouseover", (event) => {
        row.style.visibility ="visible"
      });
      card.addEventListener("mouseout", (event) => {
        row.style.visibility = "hidden";
      });

      let cardbutton = document.createElement("a"); cardbutton.role = "button"; cardbutton.className = "btn btn-secondary btn-sm rounded-0"; cardbutton.href="#";
      cardbutton.innerHTML = "View";
      let cardbuttonUpdate = document.createElement("a"); cardbuttonUpdate.role = "button"; cardbuttonUpdate.className = "btn btn-secondary btn-sm rounded-0"; cardbuttonUpdate.href="/pics/"+item._id+"/update";
      cardbuttonUpdate.innerHTML = "Modify";
      // let cardbuttonDelete = document.createElement("a"); cardbuttonDelete.role = "button"; cardbuttonDelete.className = "btn btn-secondary btn-sm rounded-0"; cardbuttonDelete.href="/pics/"+item._id+"/delete";
      // cardbuttonDelete.innerHTML = "Delete";

      const img = document.createElement('img');
      img.className = "card-img-top rounded-0";
      img.src = "/images/thumb"+item.filename;

      let caption = document.createElement("div");
      caption.className = "caption";
      caption.innerHTML = item.title;


      img.addEventListener('click', (evt) => {
        showModal(item.title, "/images/"+item.filename, item.description, item.coordinates);
      });

      cardbutton.addEventListener("click", (evt) => {
        showModal(item.title, "/images/"+item.filename, item.description, item.coordinates);
      });

      cardbuttonUpdate.addEventListener("click", (evt) => {

      });

      cardbody.appendChild(cardtext);
      cardbody.appendChild(carddate);
      card.appendChild(img);
      card.appendChild(cardbody);


      row.appendChild(cardbutton); row.appendChild(cardbuttonUpdate);
       // row.appendChild(cardbuttonDelete);
      card.appendChild(row);

      node2.appendChild(card);
      node.appendChild(node2);
      id.appendChild(node);

      populateDropdown(item);
  }
}

let populateDropdown = (item) => {
  if (!(categories.indexOf(item.category) > -1)) {
    categories.push(item.category);
  }
}

let showDropdown = () => {
  for (let i=0; i<categories.length; i++) {
    let dropdownlink = document.createElement("a");
    dropdownlink.className = "dropdown-item";
    dropdownlink.href="#";
    dropdownlink.innerHTML = categories[i];
    dropdownlink.addEventListener("click", event => {
      fetch("/pics")
        .then(response => {
          return response.json();
        })
        .then(resJSON => {
          while (images.firstChild) {
            images.removeChild(images.firstChild);
          }
          showCards(resJSON, categories[i]);
      });
    });
    dropdown.appendChild(dropdownlink);
  }
}
