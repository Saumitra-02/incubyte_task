class Chandrayaan3 {
    constructor(x, y, z, frontDirection, topDirection) {
        this.position = { x, y, z };
        this.directions = ['E', 'N', 'Up', 'W', 'S', 'Down'];
        this.frontDirection = frontDirection;
        this.topDirection = topDirection;

        this.oppositeDirs = new Map();

        // Adding key-value pairs to the map
        this.oppositeDirs.set('N', 'S');
        this.oppositeDirs.set('S', 'N');
        this.oppositeDirs.set('W', 'E');
        this.oppositeDirs.set('E', 'W');
        this.oppositeDirs.set('Up', 'Down');
        this.oppositeDirs.set('Down', 'Up');
    }

    moveForward() {
        switch (this.frontDirection) {
            case 'N':
                this.position.y += 1;
                break;
            case 'E':
                this.position.x += 1;
                break;
            case 'S':
                this.position.y -= 1;
                break;
            case 'W':
                this.position.x -= 1;
                break;
            case 'Up':
                this.position.z += 1;
                break;
            case 'Down':
                this.position.z -= 1;
                break;
        }
        console.log(this.position, 'Front:', this.frontDirection,  ', Top: ', this.topDirection);
    }

    moveBackward() {
        switch (this.frontDirection) {
            case 'N':
                this.position.y -= 1;
                break;
            case 'E':
                this.position.x -= 1;
                break;
            case 'S':
                this.position.y += 1;
                break;
            case 'W':
                this.position.x += 1;
                break;
            case 'Up':
                this.position.z -= 1;
                break;
            case 'Down':
                this.position.z += 1;
                break;
        }
        console.log(this.position, 'Front:', this.frontDirection,  ', Top: ', this.topDirection);
    }

    turn(turnDirection) {
        // Define a matrix representing the cross product of direction vectors
        const crossProductMatrix = {
            'E': {
                'N': 'Up',
                'S': 'Down',
                'Up': 'S',
                'Down': 'N',
              },
              'N': {
                'E': 'Down',
                'W': 'Up',
                'Up': 'E',
                'Down': 'W',
              },
              'Up': {
                'E': 'N',
                'W': 'S',
                'N': 'W',
                'S': 'E',
              },
              'W': {
                'N': 'Down',
                'S': 'Up',
                'Up': 'W',
                'Down': 'E',
              },
              'S': {
                'E': 'Up',
                'W': 'Down',
                'Up': 'S',
                'Down': 'N',
              },
              'Down': {
                'E': 'S',
                'W': 'N',
                'N': 'E',
                'S': 'W',
              },
          };

        const result = crossProductMatrix[this.frontDirection][this.topDirection];

        if(turnDirection == 'right') {
            this.frontDirection = result;
        } else if (turnDirection == 'left') {
            this.frontDirection = this.oppositeDirs.get(result);
        }

        console.log(this.position, 'Front:', this.frontDirection,  ', Top: ', this.topDirection);
    }

    // spacecraft FRONT now points direction in which previously it's TOP was pointing
	// TOP points in direction opp to PREVIOUS FRONT
    turnUp() {
        var temp = this.frontDirection;
        this.frontDirection = this.topDirection;
        this.topDirection = this.oppositeDirs.get(temp);
        console.log(this.position, 'Front:', this.frontDirection,  ', Top: ', this.topDirection);
    }

    // spacecraft TOP now points direction in which previously it's FRONT was pointing
	// FRONT points in direction opp to PREVIOUS TOP
    turnDown() {
        var temp = this.topDirection;
        this.topDirection = this.frontDirection;
        this.frontDirection = this.oppositeDirs.get(temp);
        console.log(this.position, 'Front:', this.frontDirection,  ', Top: ', this.topDirection);
    }

    executeCommands(commands) {
        for (const command of commands) {
        switch (command) {
            case 'f':
            this.moveForward();
            break;
            case 'b':
            this.moveBackward();
            break;
            case 'r':
            this.turn('right');
            break;
            case 'l':
            this.turn('left');
            break;
            case 'u':
            this.turnUp();
            break;
            case 'd':
            this.turnDown();
            break;
        }
        }
    }

    getCurrentPosition() {
        return this.position;
    }

    getCurrentDirection() {
        return this.frontDirection;
    }

    getTopDirection() {
        return this.topDirection;
    }
}

const chandrayaanForm = document.getElementById('chandrayaanForm');
const resultElement = document.getElementById('result');

chandrayaanForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const initialX = parseInt(document.getElementById('initialX').value, 10);
  const initialY = parseInt(document.getElementById('initialY').value, 10);
  const initialZ = parseInt(document.getElementById('initialZ').value, 10);
  const frontDirection = document.getElementById('initialFrontDirection').value;
  const topDirection = document.getElementById('initialTopDirection').value;
  const commands = document.getElementById('movementCommands').value;

  const chandrayaan3 = new Chandrayaan3(initialX, initialY, initialZ, frontDirection, topDirection);
  chandrayaan3.executeCommands(commands.split(''));

  resultElement.innerHTML = `Final Position: ${JSON.stringify(chandrayaan3.getCurrentPosition())}
  <br>Final Direction in which spacecraft points(FRONT) : ${chandrayaan3.getCurrentDirection()} 
  <br> Final Direction in which spacecraft's TOP points : ${chandrayaan3.getTopDirection()}`;
});