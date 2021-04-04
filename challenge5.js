{
    init: function(elevators, floors) {
        let pending_floors = [];
        
        // "floor button pressed" event
        elevators.forEach( elevator => elevator.on("floor_button_pressed", floorNum => {
            if (pending_floors.includes(floorNum)) {
                pending_floors = pending_floors.filter(floor => floor !== floorNum);
            }
            
            let current_floor = elevator.currentFloor();
            let queue = elevator.destinationQueue;
            
            if (!queue.includes(floorNum)) {
                queue.push(floorNum);
            }

            queue.sort();
            if (queue[queue.length - 1] > current_floor) {
                let upper_floors = queue.filter(floor => floor >= current_floor); 
                let lower_floors = queue.filter(floor => floor < current_floor);
                queue = upper_floors.concat(lower_floors);
            }
            
            elevator.destinationQueue = queue;
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
                    let next_floor = pending_floors.pop()
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
