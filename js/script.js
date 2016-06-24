// The dog constructor.
function Dog ( dogName ){
    this.name = 'mircea';
    this.addName = function(theName) {
        this.name = theName;
    };
    this.showName = function() {
        dogStatus.html("your dog's name is " + this.name);
    };
    this.eat = eat;
    this.energy = 30;
    this.work = work;
};

// Eat function.
function eat(meal) {
    if (this.energy < 100) {
        this.energy += meal[1];
        dogStatus.html(this.name + " is eating " + meal[0] + " and has " + this.energy + "% energy")
    }
    else {
        dogStatus.html(this.name + " is full");
    }
    otputDogEnergy();
    // start the counter if it is not already running.
    if(counterCanStart) {
        timeFoodConsumption(this);
        //after starting the counter set it to false so it won't run twice.
        counterCanStart = false;
    }
}
    
// Le dog.
var leDog = new Dog();

// The meals the dog can have.
var meals = {
    steak: ['steak', 30],
    milk: ["milk", 10],
    dogFood: ["dog food", 20]
}

// show the dog's energy level.
function otputDogEnergy() {
    $('#energy').html(leDog.energy);
}

// Make the dog work.
function work (position) {
    if(this.energy > position[1]) {
        this.energy -= position[1];
        console.log(position)
        dogStatus.html(this.name + " is working as a " + position[0] + " and has " + this.energy + "% energy left");
    }
    else {
        dogStatus.html(this.name + " has not enough energy to do this job. Please feed him or find an easier job !");
    }
    otputDogEnergy();
}

// Work positions available for the dog.
var workPositions = {
    plumber: ["Plumber", 20],
    buildingConstructor: ["Building Constructor", 50]
}

// The dog's food consumption over time.
function timeFoodConsumption(dogName){
    countDown();
    // consumes the dog's energy untill it reaches 1 and the alerts you to feed it.
    function countDown() {
        if(dogName.energy > 1) {
            $('.dog-energy').removeClass('critical');
            dogName.energy -= 1;
            setTimeout(function(){
                countDown();
            }, 5000);
            otputDogEnergy();
        }
        else {
            alert('Please feed the dog, it is starving');
            $('.dog-energy').addClass('critical');
            counterCanStart = true;
        }
    }
}

// check if the counter cand start(this can happen if it is not already running).
// It is initially set to false because the counter is initialized on document.ready.
var counterCanStart = false;

// Run functions at a certain interval.
timeFoodConsumption(leDog);

// the class of the element where to display what the dog is doing.
var dogStatus;

$(document).ready(function(){
    otputDogEnergy();
    dogStatus = $('.dog-actions');
});










//========================================================================================================
// function makeDogEat(dogName) {
//     console.log(dogName + " is eating");
// }

// var Dog = {
//     name: "guest",
//     askName: function(dogName) {
//         this.name = dogName;
//     },
//     sayName: function() {
//         console.log("Your dog's name is " + this.name)    
//     },
//     eat: function() {
//         console.log(this.name + " is eating");
//     }
    
// }