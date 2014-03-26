function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in minutes.

  // Initialize Categories
  categories.itp.checked = JSON.parse(localStorage.itp);
  categories.life.checked = JSON.parse(localStorage.life);
  categories.people.checked = JSON.parse(localStorage.people);
  categories.sex.checked = JSON.parse(localStorage.sex);
  categories.tech.checked = JSON.parse(localStorage.tech);
  categories.things.checked = JSON.parse(localStorage.things);
  categories.work.checked = JSON.parse(localStorage.work);

  crowdsource.roulette.checked = JSON.parse(localStorage.roulette);


  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };


  categories.itp.onchange = function() {
    localStorage.itp = categories.itp.checked;
  };
  categories.life.onchange = function() {
    localStorage.life = categories.life.checked;
  };
  categories.people.onchange = function() {
    localStorage.people = categories.people.checked;
  };
  categories.sex.onchange = function() {
    localStorage.sex = categories.sex.checked;
  };
  categories.tech.onchange = function() {
    localStorage.tech = categories.tech.checked;
  };
  categories.things.onchange = function() {
    localStorage.things = categories.things.checked;
  };
    categories.work.onchange = function() {
    localStorage.work = categories.work.checked;
  };

  crowdsource.roulette.onchange = function() {
    localStorage.roulette = crowdsource.roulette.checked;
  };


});





