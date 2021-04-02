{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];
        //var third_elevator = elevators[2];
        //var fourth_elevator = elevators[3];
        
        // "Floor button pressed" event
        first_elevator.on("floor_button_pressed", function(floorNum) {
            first_elevator.goToFloor(floorNum);
        });

        // "idle" event
        first_elevator.on("idle", function() {
            first_elevator.goToFloor(0);
        })
        
        second_elevator.on("idle", function() {
            if (second_elevator.loadFactor() > 0.4) {
                var pressed_floors = second_elevator.getPressedFloors();
                pressed_floors.forEach(function (floor) {
                    second_elevator.goToFloor(floor);
                })
            } else {
                second_elevator.goToFloor(0);
            }
            
        })

    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
