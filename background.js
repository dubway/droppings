function loadXMLDoc(dname) 
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",dname,false);
xhttp.send();
return xhttp.responseXML;
}

function show() {
  //load XML
  var xmlDoc=loadXMLDoc("http://onemorepixel.cc/content/game.xml");
  var main = xmlDoc.getElementsByTagName("library");
  var quote = xmlDoc.getElementsByTagName("quote")[1];
  var author = xmlDoc.getElementsByTagName("author")[1].childNodes[0].nodeValue;

  var randomNum = Math.floor(Math.random() * (main.length - 0 + 1)) + 0;
  var text = xmlDoc.getElementsByTagName("text")[randomNum].childNodes[0].nodeValue;


  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var notification = window.webkitNotifications.createNotification(
    '64.png',                      // The image.
    hour + time[2] + ' ' + period, // The title.
    text      // The body.
  );
  notification.show();
  setTimeout(function(){
    notification.cancel();
  }, 8000);
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.webkitNotifications) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
  }, 60000);
}