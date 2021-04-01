{
    init: function(elevators, floors) {
        var first_elevator = elevators[0];
        var second_elevator = elevators[1];
        var third_elevator = elevators[2];
        //var fourth_elevator = elevators[3];
        
        // "idle" event
        first_elevator.on("idle", function() {
            if(first_elevator.loadFactor() > 0.4) {
                for (var i = 1; i < floors.length; i++) {
                    first_elevator.goToFloor(i);
                }
            }

            first_elevator.goToFloor(0);
                
        });
        
        second_elevator.on("idle", function() { 
            if(second_elevator.loadFactor() > 0.4) {
                for (var i = 1; i < floors.length; i++) {
                    second_elevator.goToFloor(i);
                }
            }
            
            second_elevator.goToFloor(0);
        });
        
        third_elevator.on("idle", function() {
            if(third_elevator.loadFactor() > 0.4) {
                for (var i = 1; i < floors.length; i++) {
                    third_elevator.goToFloor(i);
                }
            }

            third_elevator.goToFloor(0);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
