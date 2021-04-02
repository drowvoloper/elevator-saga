{
    init: function(elevators, floors) {
        let pending_floors = [];
        
        elevators.forEach( elevator => elevator.on("floor_button_pressed", floorNum => elevator.goToFloor(floorNum)));
        
        // functions
        const isElevatorGoingThere = (level) => { 
            return elevators.filter(elevator => elevator.getPressedFloors().indexOf(level) === -1 ? false : true);
        }
        
        const isThereAFreeElevator = () => {
            for (let i = 0; i < elevators.length; i++) {
                if (elevators[i].getPressedFloors().length === 0) {
                    return elevators[i];
                }
            }

            return null;
        }
        
        const handleButtonPressed = (level) => {
            if (!isElevatorGoingThere(level).length > 0) {
                let free_elevator = isThereAFreeElevator();
                if (free_elevator) {
                    free_elevator.goToFloor(level);
                    return ;
                } 

                pending_floors.push(level);
            }
        }
        
        // handle button pressed
        floors.forEach((floor, level) => {
            floor.on("up_button_pressed", function() {
                handleButtonPressed(level);
            })   
            
            floor.on("down_button_pressed", function() {
                handleButtonPressed(level);
            }) 

        }) // handle button pressed
        
        elevators.forEach((elevator) => {
            elevator.on("idle", function() {
                elevator.destinationQueue = pending_floors.sort();
                elevator.checkDestinationQueue();
                pending_floors = [];
            })
        })

    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
