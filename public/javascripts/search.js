document.getElementById("categorydropdown").visibility = "hidden";

let query = urlParams();
console.log(query.q);
    if (query.q != undefined) {
      fetchPics("/pics?q="+query.q, (amount) => {
        if (amount > 0) {
          document.getElementById("categorydropdown").style.visibility = "visible";
        } else {
          document.getElementById("categorydropdown").style.visibility = "hidden";
        }
      });
    }
