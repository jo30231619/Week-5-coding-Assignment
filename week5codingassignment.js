//We are going to manage dealerships and cars in those dealerships
//Created a class called Car which takes a model and a make
class Car {
    constructor(model, make) {
        this.model = model;
        this.make = make;
    }
//adding a describe method to put out some info about the cars
    describe() {
        return `My car is a ${this.model} ${this.make}.`;
    }
}
//Creating a class called Dealership and will take just the name of the dealership 
class Dealership {
    constructor(name) {
        this.name = name;
        this.cars = []; // creates an array that will hold all of the cars in the dealership.
    }

    addCar(car) {
        if (car instanceof Car) { // this makes sure that it is a car that actually passing in a not somthing else
            this.cars.push(car);
        } else {
            throw new Error(`You can only add an instance of Car. Argument is not a car: ${car}`); //this is the error that shows just in case somebody enters not an instance of Car Class 
        }
    }
//adding a describe method to put some information about the Dealership; the name of the dealership and the amount of cars in the dealership.
    describe() {
        return `${this.name} has ${this.cars.length} cars.`;
    }
}
//this class drives the application and all the choices
class Menu {
    constructor() { // not taking any arguments
        this.dealerships = []; //initiliazes the dealerships
        this.selectedDealership = null; //this variable chooses the dealership we are working on
    }
//adding a method called start, starting the application
    start() {
        let selection = this.showMainMenuOptions(); 

        while (selection != 0) { // selection is a variable that we are going to use to get user input
            switch (selection) { //determines what user selected
                case '1': // if they selected 1, will create a dealership
                    this.createDealership();
                    break;
                case '2':
                    this.viewDealership();
                    break;
                case '3':
                    this.deleteDealership();
                    break;
                case '4':
                    this.displayDealerships(); //if user select 4, will display all dealerships
                    break;
                default: //if select anything else, will set selection to 0
                    selection = 0;      
            }
            selection = this.showMainMenuOptions(); //this selection will keep it looping
        }
        //if they select 0, this alert will display
        alert('Goodbye!');
    }
        //creates a prompt that the user will see, will allow to make selection from the user.
    showMainMenuOptions() {
        return prompt(`
          0) exit
          1) create new dealership
          2) view dealership
          3) delete dealership
          4) display all dealerships
        `);
    }
    
    showDealershipMenuOptions(dealershipInfo) { //takes description of dealership and print out info and return the user input
        return prompt(`
          0) back
          1) create car
          2) delete car
          -------------------------------
          ${dealershipInfo} 
        `);   //display info that was passed in
    }

    displayDealerships() {
        let dealershipString = ''; //create a blank string that is going to hold all the info for the dealaership
        for (let i = 0; i < this.dealerships.length; i++); { //creates a loop that will iterate through all the dealerships
            //identify the index of each dealership, grabs the current dealership for this iteraration
            dealershipString += i + ') ' + this.dealerships[i].name + '\n';
        } //get the name of the dealership, and add a new line; each dealership name will show up with a index numbering them 
        alert(dealershipString); //outside the forloop, will alert the dealershipString, will alert all the dealerships
    }

    createDealership() { //will allow the user to create a new dealership
        let name = prompt('Enter name for new dealership:'); //this is the message that will prompt the user
        this.dealerships.push(new Dealership(name));//will push the name of the new dealership to our dealership array
    }

    viewDealership() { //see the details of a specific dealership
        let index = prompt('Enter the index of the dealership you wish to view:'); //will prompt the user with this message
        if (index > -1 && index < this.dealerships.length) { //validate user input
            this.selectedDealership = this.dealerships[index]; //set our selected dealership class property to the dealership that was input by the user
            let description = 'Dealership Name: ' + this.selectedDealership.name + '\n'; //build description for the dealership to print out
            //add description of all the cars to the dealerships
            for (let i = 0; i < this.selectedDealership.cars.length; i++) { //each dealership has a cars array, will iterate to ge the length of array
                description += i + ') ' + this.selectedDealership.cars[i].model + ' - ' + this.selectedDealership.cars[i].make +'\n';
            } //will access specific dealership, and property of cars, will build a list of all dealership cars
            //pass in description and implement this method to show all options for the dealership
            let selection = this.showDealershipMenuOptions(description);
            switch (selection) {//create switch to show these options
                case '1':
                    this.createCar();
                    break;
                case '2':
                    this.deleteCar();
            }
        }  
    }

    deleteDealership() { //will prompt user to choose dealership to delete 
        let index = prompt('Enter the index of the dealership you wish to delete:');
        if (index > -1 && index < this.dealerships.length) {//validate
            this.dealerships.splice(index, 1);//uses splice method to delete dealership
        }
    }

    createCar() {//user will be able to create new cars, will be able to take name and the car to create an instance of the car 
        let model = prompt('Enter model for new car:');//user will be prompted by these messages for user input
        let make = prompt('Enter make for new car:');
        this.selectedDealership.cars.push(new Car(model, make));// push properties of car, model, and make to the selected dealership
    }

    deleteCar() { //prompts user to be able to enter index of car to delete
        let index = prompt('Enter the index of the car you wish to delete:');
        if (index > -1 && index < this.selectedDealership.cars.length) {//validate
            this.selectedDealership.cars.splice(index, 1);//uses splice method to remove car, user inputs index
        }
    }
}
//create an instance of our menu
let menu = new Menu();
menu.start();//method that shows everything