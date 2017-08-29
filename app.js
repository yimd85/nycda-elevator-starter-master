// Require events of course
const EventEmitter = require('events');

// Make the tenant array
const tenants = [
  {	name:	'Jerry',	destination:	4	},
  {	name:	'Kramer',	destination:	10	},
	{	name:	'Newman',	destination:	2	}
];

// The elevator class
class Elevator extends EventEmitter {
  constructor(){
    // this needs to be called so that Elevator
    // gets all the methods and properties of
    // EventEmitter
    super();
    // The Elevator starts at 1 with no one in it
    this.currentFloor = 1;
    this.passenger = {};
  }
}

// In England, elevators are called lifts :)
const lift = new Elevator();

lift.on('up', (passenger)=>{
  // Defensive coding, only change the passenger if one was supplied.
  if (passenger){
    lift.passenger = passenger;
  }
  setTimeout(()=>{
      // Add your own code after here.

      console.log("Lift picks up "+passenger.name);
      for (i=1;i<=passenger.destination;i++){
      console.log("Lift at floor:"+i);
      }
      console.log("Lift drops off "+passenger.name);
      for (x=passenger.destination;x>=0;x--){
      console.log("Lift at floor:"+x);
      }
      lift.emit('down');
  }, 1000)
});


lift.on('down', ()=>{
  setTimeout(()=>{
    // Add your own code after here.

    if(tenants.length!==0){
      lift.emit('up', tenants.pop() )
    } else{
      console.log('No more passengers I rest now!')
    }
  }, 1000)
})

// run node app.js and take note of what happens.
// what happens if you change it to 'down'?
lift.emit('up', tenants.pop());

