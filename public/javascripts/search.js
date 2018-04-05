document.getElementById("categorydropdown").visibility = "hidden";

let query = urlParams("q");
    if (query != undefined) {
      fetchPics("/pics?q="+query, (amount) => {
        if (amount > 0) {
          document.getElementById("categorydropdown").style.visibility = "visible";
        } else {
          document.getElementById("categorydropdown").style.visibility = "hidden";
        }
      });
    }
