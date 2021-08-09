# Toy Robot

This is a robot control system which reads instructions from an input file and prints the final position.


**Initial Location**

Each robot starts with a simple compass heading NORTH, WEST, SOUTH, EAST and a grid coordinate, X, Y.

**The Commands**

The robot is controlled with a set of simple commands.

- MOVE- Move Forward
- LEFT - Rotate 90º Left
- RIGHT - Rotate 90º Right

**The Input**

A single ﬁle is used for input to run the robo.

**The Output**

The controls system should print the ﬁnal position of the robot.

**Example scenarios**

- PLACE 0,0,NORTH
- MOVE
- REPORT
- Output: 0,1,NORTH

## Getting Started

### Clone the repo and install the project

- `> git clone https://github.com/gupnee81/toyRobo.git`
- `> cd toyrobot`
- `> npm install`

### **Further setup steps**

Run following commands

- Run the ToyRobot on dev mode

  > npm run dev

- Build the ToyRobot and see the results

  > npm run build and then npm run start

- Run the ToyRobot on test mode and see the test results

  > npm run test

- Run the ToyRobot on test mode to check code coverage
  > npm run coverage

