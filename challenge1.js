{
    init: function(elevators, floors) {
        let pending_floors = [];
        
        // "floor button pressed" event
        elevators.forEach( elevator => elevator.on("floor_button_pressed", floorNum => {
            elevator.goToFloor(floorNum)
        }));
        
        // "button pressed" events
        floors.forEach((floor, level) => {
            floor.on("up_button_pressed", function() {
                pending_floors.push(level);
            })
            
            floor.on("down_button_pressed", function() {
                pending_floors.push(level);
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
