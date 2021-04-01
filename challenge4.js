{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];
        
        // "Floor button pressed" event
        first_elevator.on("floor_button_pressed", function(floorNum) {
            first_elevator.goToFloor(floorNum);
        });
        
        second_elevator.on("floor_button_pressed", function(floorNum) {
            second_elevator.goToFloor(floorNum);
        });

        // "idle" event
        first_elevator.on("idle", function() {
            first_elevator.goToFloor(0);
        });
        
        second_elevator.on("idle", function() {
            second_elevator.goToFloor(0);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
