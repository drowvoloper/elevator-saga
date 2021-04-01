{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];
        var third_elevator = elevators[2];
        var fourth_elevator = elevators[3];
        
        // "Floor button pressed" event
        first_elevator.on("floor_button_pressed", function(floorNum) {
            first_elevator.goToFloor(floorNum);
        });
        
        second_elevator.on("floor_button_pressed", function(floorNum) {
            second_elevator.goToFloor(floorNum);
        });
        
        third_elevator.on("floor_button_pressed", function(floorNum) {
            third_elevator.goToFloor(floorNum);
        });

        fourth_elevator.on("floor_button_pressed", function(floorNum) {
            fourth_elevator.goToFloor(floorNum);
        });

        // "idle" event
        first_elevator.on("idle", function() {
            first_elevator.goToFloor(0);
        });
        
        second_elevator.on("idle", function() {
            second_elevator.goToFloor(0);
        });
        
        third_elevator.on("idle", function() {
            third_elevator.goToFloor(0);
        });

        fourth_elevator.on("idle", function() {
            fourth_elevator.goToFloor(0);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
