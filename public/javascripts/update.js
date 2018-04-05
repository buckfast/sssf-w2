const deleteButton = document.querySelector("#delete");

// const data = {hehe: 'joulupukki'};
let count = 0;
deleteButton.addEventListener('click',  (evt) => {

  if (count == 1) {
    const url = "/pics/"+evt.target.getAttribute("data-id")+"/delete";
    fetch(url, {
      method: 'DELETE',
    }).then(res => {
      console.log(res);
      window.location.href = "/";
    });
  }

  if (count == 0) {
    count++;
    let text = document.createElement("p");
    text.className = "text-danger";
    text.innerHTML = "Press delete again to confirm deletion";
    const toolbar = document.getElementsByClassName("btn-toolbar");
    toolbar[0].insertBefore(text, toolbar.firstChild);
  }

});
