
function FlipDigit(value){

  var el = document.createElement('span');

  el.className = 'flip-digit__piece';
  el.innerHTML = '<b class="flip-digit__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val){
    val = parseInt(val) % 10;
    if ( val !== this.currentValue ) {
      
      if ( this.currentValue >= 0 ) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }
  
  this.update(value);
}

function calculateSecondsSince(birthTimeStr) {
  const birthdayEpochSec = new Date(birthTimeStr).valueOf() / 1000;
  const currentEpochSec = (Date.now() / 1000);
  const totalSecondsLived = Math.round(currentEpochSec - birthdayEpochSec);
  return totalSecondsLived;
}

class NeuronCounter {
  trackers;
  birthNeurons;
  birthdayText;
  rateOfLossPerSecond;
  currentNeurons;
  startCounting = 0; 

  constructor(birthNeurons, birthdayText, rateOfLossPerSecond){
    this.averageBirthNeurons = birthNeurons;
    this.birthNeurons = birthNeurons;
    this.birthdayText = birthdayText;
    this.rateOfLossPerSecond = rateOfLossPerSecond;
    this.currentNeurons = birthNeurons;

    this.el = document.createElement('div');
    this.el.className = 'flip-digit';
    const nDigits = 11;
    this.trackers = new Array(nDigits)
    this.emptyArray = [0, 0, 0 ,0 ,0, 0 ,0 ,0, 0 ,0 ,0]

    for (let i=0; i<this.trackers.length; i++){
      this.trackers[i] = new FlipDigit(this.emptyArray[i]);
      this.el.appendChild(this.trackers[i].el);
    }

  }
  modifyBirthNeurons(deltaNeurons) {
    this.birthNeurons = this.averageBirthNeurons + deltaNeurons;
  }

  updateBirthDate(newBirthStr) {
    this.birthdayText = newBirthStr;
    this.startCounting = 1;
  }

  updateCurrentNeurons() {
    const currentLifeInSeconds = calculateSecondsSince(this.birthdayText)
    const lostAlready = currentLifeInSeconds * this.rateOfLossPerSecond * this.startCounting;
    this.currentNeurons = this.birthNeurons - lostAlready;
  }
  
  updateCount() {
    this.updateCurrentNeurons();
    //console.log(this.currentNeurons);
    const nNeuronsArray = Array.from(String(this.currentNeurons), Number);
    for (let i=0; i<this.trackers.length; i++){
      this.trackers[i].update(nNeuronsArray[i]);
    }
  }

}

const neuronsAtBirth = 86000000000; // 86 billion 86,000,000,000
const rateOfLossPerSecond = 200000 / (24*60*60); // 200,000 per day

function update() {
  counter.updateCount()
}

var counter = new NeuronCounter(neuronsAtBirth, "1970-01-01T00:00", rateOfLossPerSecond);
document.body.appendChild(counter.el);
setInterval(update, 1000);

// Form events
function eventFormSubmitted() {
  var x = document.getElementById("datetimeform");
  var birthdayText = x.elements[0].value;
  counter.updateBirthDate(birthdayText);
}

function eventRadioSmart(radio) {
  if (radio.id == "smart")
    counter.modifyBirthNeurons(+15000000000)
  if (radio.id == "dumb")
    counter.modifyBirthNeurons(-15000000000)
  if (radio.id == "average")
    counter.modifyBirthNeurons(0)
}