{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];
        var third_elevator = elevators[2];
        //var fourth_elevator = elevators[3];
        
        // "Floor button pressed" event
        elevators.forEach(function (elevator) {
            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum);
            });
        })
        
        // "up and down button pressed" events
        floors.forEach(function (floor, floor_number) {
            
            floor.on("up_button_pressed", function() {
                first_elevator.goToFloor(floor_number);
            })
            
            floor.on("down_button_pressed", function() {
                if (floor_number === 1 || floor_number === 3 || floor_number === 5) {
                    second_elevator.goToFloor(floor_number);
                } else {
                    third_elevator.goToFloor(floor_number);
                }
            })
        })

    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
