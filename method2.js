// Require events of course
const EventEmitter = require('events');

// Make the tenant array
const tenants = [
 {    name:    'Jerry',    destination:    4    },
 {    name:    'Kramer',    destination:    10    },
    {    name:    'Newman',    destination:    2    }
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

// In England, elevators are called lifts :slightly_smiling_face:
const lift = new Elevator();
lift.on('up', (passenger)=>{
 // Defensive coding, only change the passenger if one was supplied.
 if (passenger){
   lift.passenger = passenger;
 }

 setTimeout(()=>{
     // Add your own code after here.
     console.log('my current fl', lift.currentFloor, lift.passenger)
     if(lift.currentFloor !== lift.passenger.destination){
       lift.currentFloor++;
       lift.emit('up');
     }else{
       lift.emit('down');
     }
 }, 1000)
});

lift.on('down', ()=>{
 setTimeout(()=>{
   // Add your own code after here.
   if(tenants.length > 0){
     if(lift.currentFloor > 1){
       lift.currentFloor--;
       lift.emit('down');
     }else if(lift.currentFloor === 1){
       lift.emit('up', tenants.pop());
     }
   }

   console.log("Bullocks, I'm going down...to ", lift.currentFloor);
 }, 1000)
})

// run node app.js and take note of what happens.
// what happens if you change it to 'down'?
lift.emit('up', tenants.pop() );
