{
    init: function(elevators, floors) {
        let pending_floors = [];
        
        // "floor button pressed" event
        elevators.forEach( elevator => elevator.on("floor_button_pressed", floorNum => {
            if (pending_floors.includes(floorNum)) {
                pending_floors = pending_floors.filter(floor => floor !== floorNum);
            }
            
            elevator.destinationQueue.push(floorNum);
            elevator.destinationQueue.sort();
            elevator.checkDestinationQueue();
        }));
        
        // "button pressed" events
        floors.forEach((floor, floorNum) => {
            floor.on("up_button_pressed", function() {
                if (!pending_floors.includes(floorNum))
                    pending_floors.push(floorNum);
            })
            
            floor.on("down_button_pressed", function() {
                if (!pending_floors.includes(floorNum))
                    pending_floors.push(floorNum);
            })
        })
        
        // "idle" event
        elevators.forEach((elevator, index) => {
            elevator.on("idle", function() {
                if (pending_floors.length > 0) {
                    let next_floor = pending_floors.sort().pop()
                    console.log(next_floor);
                    elevator.goToFloor(next_floor);
                } else {
                    elevator.goToFloor(0);
                }

            })
        })
        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
