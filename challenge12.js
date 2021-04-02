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
