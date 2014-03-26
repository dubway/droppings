// Public Variables
var selectedCategories;

// XML Parser
var xmlDoc=loadXMLDoc("https://droppings.herokuapp.com/data.xml");
var main = xmlDoc.getElementsByTagName("library");
var quote = xmlDoc.getElementsByTagName("quote");
var author = xmlDoc.getElementsByTagName("author");
var iconAuthor;

var roulette;
var icon;

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

  checkRoulette();
  checkCategory();

  var randomNum = randRange(0,(selectedCategories.length-1));
  var cat =  selectedCategories[randomNum];
  var catName = returnCategoryName(cat)
  var text = getCategory(catName, roulette);

  // Notification API
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.

  if(iconAuthor == "DanO"){
    icon = "dano.png";
  } else {
    icon = catName+".png";
  }

  var notification = window.webkitNotifications.createNotification(
    icon,                       // The image.
    hour + time[2] + ' ' + period + ' | ' + catName,  // The title.
    text                            // The body.
  );

  // SHOW the Notification
  notification.show();
  // Set Timeout to CLOSE the Notification
  setTimeout(function(){
    notification.cancel();
  }, 8000);

}

function checkCategory(){
  var checkCategories = [localStorage.itp,localStorage.life,localStorage.people,localStorage.sex,localStorage.tech,localStorage.things,localStorage.work];
  var counter = 0;
  var sortCategories = [];
  for (var i = 0; i < checkCategories.length; i++) {
    if (checkCategories[i] == "true") {
      sortCategories[counter] = i;
      counter++;
    };
  };
  selectedCategories = sortCategories;
}

function checkRoulette(){
  roulette = localStorage.roulette;
  //console.log(roulette);
}

function checkIcons(catName, byName){
  console.log(catName + " " + byName);
  iconAuthor = byName;
}

function returnCategoryName(cat){
  switch (cat) {
  case 0:
    x="itp";
    break;
  case 1:
    x="life";
    break;
  case 2:
    x="people";
    break;
  case 3:
    x="sex";
    break;
  case 4:
    x="tech";
    break;
  case 5:
    x="things";
    break;
  case 6:
    x="work";
    break;
  }
  return x;
}

function getCategory(cat, roul){
  var counter = 0;
  var quotes = [];

  for(var i=0; i<quote.length; i++){
    if(roul == "true"){
      if(quote[i].getAttribute('category') == cat){
        txt = xmlDoc.getElementsByTagName("text")[i];
        quotes[counter] = i;
        counter++
        console.log("With all the craziness!");

      }

    } else {
      if(quote[i].getAttribute('category') == cat && quote[i].getAttribute('roulette') == "0"){
        txt = xmlDoc.getElementsByTagName("text")[i];
        quotes[counter] = i;
        counter++
        console.log("Without roulette");
      }
    }
  }

  var randomNum = randRange(0, (quotes.length-1));
  id = quotes[randomNum];
  txt = xmlDoc.getElementsByTagName("text")[id];
  aut = xmlDoc.getElementsByTagName("author")[id];
  by = aut.firstChild.nodeValue;
  checkIcons(cat, by);

  return txt.firstChild.nodeValue;
}

function randRange(min, max){
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.

  // Categories
  localStorage.itp = true;
  localStorage.life = true;
  localStorage.people = true;
  localStorage.sex = true;
  localStorage.tech = true;
  localStorage.things = true;
  localStorage.work = true;

  localStorage.roulette = true;
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