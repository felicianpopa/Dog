// Le dog.
var leDog = new Dog();

// the class of the element where to display what the dog is doing.
var dogStatus;

// Prompt for the dog's name
$(document).ready(function(){
    leDog.name = prompt("please enter the dog's name");
    $('.dog-name').html(leDog.name);
    $('.overlay').hide();
    otputDogEnergy();
    otputDogBudget();
    dogStatus = $('.dog-actions');
    showObjectsAttributes(workPositions, '#work-positions');
    showObjectsAttributes(meals, '#dog-meals');
    // initialize the buttons for certain actions
    addButtonsForActions('meals', '#feed', 'eat');
    addButtonsForActions('workPositions', '#work', 'work');
});

// The dog constructor.
function Dog ( dogName ){
    this.name = 'mircea';
    this.showName = function() {
        dogStatus.html("your dog's name is " + this.name);
    };
    this.eat = eat;
    this.energy = 30;
    this.work = work;
};

// Eat function.
function eat(meal) {
    console.log(this);
    // if the dog does not have enough money to buy this type of food.
    if (this.budget < meal[2]) {
        dogStatus.html(this.name + " does not have enough money to eat this type of meal");
    }
    // if the dog is not full and has enough money to buy the type of food.
    else if (this.energy + meal[1] < 100 && this.budget >= meal[2]) {
        this.energy += meal[1];
        this.budget -= meal[2]
        dogStatus.html(this.name + " is eating " + meal[0] + " and has " + this.energy + "% energy. He spent " + meal[2] + " $ for this meal")
    }

    else {
        dogStatus.html(this.name + " is too full to eat this type of meal");
    }
    checkDogEnergy(this);
    otputDogEnergy();
    otputDogBudget();
    // start the counter if it is not already running.
    if(counterCanStart) {
        timeFoodConsumption(this);
        //after starting the counter set it to false so it won't run twice.
        counterCanStart = false;
    }
}
    
// The meals the dog can have.
// The order is name of the food, energy value, cost.
var meals = {
    steak: ['steak', 40, 20],
    milk: ["milk", 10, 5],
    dogfood: ["dog food", 20, 10]
}

// show the dog's energy level.
function otputDogEnergy() {
    $('#energy').html(leDog.energy);
}

// Make the dog work.
function work (position) {
    if(this.energy > position[1]) {
        // when working the dog consumes energy
        this.energy -= position[1];
        // working generates money
        this.budget += position[2];

        dogStatus.html(this.name + " is working as a " + position[0] + " and has " + this.energy + "% energy left. He also earned " + position[2] + " $");
    }
    else {
        dogStatus.html(this.name + " has not enough energy to do this job. Please feed him or find an easier job !");
    }
    checkDogEnergy(this);
    otputDogEnergy();
    otputDogBudget();
}

// Work positions available for the dog.
// The order is position name, energy consumption, income.
var workPositions = {
    plumber: ["plumber", 20, 30],
    buildingconstructor: ["building constructor", 50, 100]
}

// The dog's food consumption over time.
function timeFoodConsumption(dogName){
    // interval for the count down.
    setTimeout(function(){
        countDown();
    }, 5000);
    // consumes the dog's energy untill it reaches 1 and the alerts you to feed it.
    function countDown() {
        if(dogName.energy > 1) {
            dogName.energy -= 1;
            setTimeout(function(){
                countDown();
            }, 5000);
            otputDogEnergy();
        }
        else {
            alert('Please feed the dog, it is starving');
            counterCanStart = true;
        }
        checkDogEnergy(dogName);
    }
}

// if the dog has criticall energy add a class to the dog energy holder.
function checkDogEnergy (dogName) {
    if(dogName.energy < 10) {
        $('.dog-energy').addClass('critical');
        $('.dog-avatar img').attr("src", "img/hungry-dog.gif");
    }
    else {
        $('.dog-energy').removeClass('critical');
        $('.dog-avatar img').attr("src", "img/shaking-tale.gif");
    }
}

// check if the counter cand start(this can happen if it is not already running).
// It is initially set to false because the counter is initialized on document.ready.
var counterCanStart = false;

// Run functions at a certain interval.
timeFoodConsumption(leDog);

// Add budget to the dog via prototypal inheritance.
Dog.prototype.budget = 10;

// updates the heading showing the dog's budget.
function otputDogBudget() {
    $('#budget').html(leDog.budget);
}

// Show the data from the literal objects eg food, work.
function showObjectsAttributes(leObject, whereToShow) {
    var text = "<ul>";
    for(var key in leObject) {
        text += "<li>";
        text += "<strong>" + leObject[key][0] + "</strong> ";
        for(i=1; i<leObject[key].length-1; i++) {
            text += leObject[key][i] + ", ";
        }
        text += leObject[key][leObject[key].length-1];
        text += "</li>"
    }
    text += "</ul>";
    $(whereToShow).html(text);
}

// initialize the buttons for certain actions
function addButtonsForActions(objectName, whereToShow, actionName) {
    var realObject = eval(objectName);
    var text = "";
    for(var key in realObject) {
        text += '<input type="button" onclick="leDog.' + actionName + '(' + objectName +'.'+removeSpaceFromString(realObject[key][0]) + ')' + '" value="'+ realObject[key][0] + '" </input>';
    }
    $(whereToShow).html(text);
}

// Remove ampty space from strings
function removeSpaceFromString(str) {
    return str.replace(/\s+/g, '')
}

