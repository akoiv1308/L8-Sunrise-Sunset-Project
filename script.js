function convertToEST(utc) {
	let utcHours = utc.substr(0, utc.indexOf(":"));
  let utcMinSec = utc.substr(utc.indexOf(":")+1,utc.indexOf(" ")-2);
  let utcAP = utc.substr(utc.indexOf(" "))

  console.log(utcHours);
  console.log(utcMinSec);
  console.log(utcAP);

	let est = parseInt(utcHours, 10) - 5; //EST


  if (est < 0){
    est = 12 +est;
    if (utcAP == " AM"){
      utcAP = "PM"
    }
    else if ( utcAP == " PM"){
      utcAP = "AM"
    }
  }

  if (utcHours >= 12){
    if (utcAP == " AM"){
      utcAP = "PM"
    }
    else if ( utcAP == " PM"){
      utcAP = "AM"
    }

  }

  
	est += ":" + utcMinSec + utcAP;
	return est;
}


function letSee(){
  let latInput = $(".latitude").val();
  let longInput = $(".longitude").val();

  let request = new XMLHttpRequest();
  let lat = latInput;
  let long = longInput;
  let url = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+long;
  request.open("GET", url, true);

  //Callback function executes when request is successfully completed

  request.onload = function() {
    // Begin accessing JSON data here. Data stored in request.response
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        $("#sunrise").text(convertToEST(data.results.sunrise));
        $("#sunset").text(convertToEST(data.results.sunset));
    }
    
  };

  request.send();
}