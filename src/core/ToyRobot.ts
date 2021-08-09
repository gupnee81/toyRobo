import { IRobotPos } from '../model';
import { arrayFacing, maxWidth, maxHeight } from '../constants';

export class ToyRobot {
  private static instance: ToyRobot;
  private initiallyPlaced;
  private currentPos: IRobotPos;

  public static getInstance(): ToyRobot {
    if (!this.instance) {
      this.instance = new ToyRobot();
    }
    return this.instance;
  }

  constructor() {
    this.initiallyPlaced = false;
    this.currentPos = {
      xPos: 0,
      yPos: 0,
      facing: 'NORTH',
    };
  }

  /**
   * Validates the robot placement command
   * @param {words} xPos, yPos and 'NORTH'/'EAST'/'WEST'/'SOUTH' e.g. 0 0 NORTH
   * @return {boolean}
   */
  public isValidPlaceCommand = (words: string[]): boolean => {
    const isValid =
      words.length == 4 &&
      words[0] === 'PLACE' &&
      (/^[0-5]$/).test(words[1]) &&
      (/^[0-5]$/).test(words[2]) && 
      arrayFacing.some((facing) => words[3].includes(facing));
    return isValid;
  };

  /**
   * Place the robot, will be the first line to be executed from the input file.
   * 'initiallyPlaced' flag will be set. Robot needs this flag to be true before
   * any further commands e.g. 'MOVE'/'LEFT'/'RIGHT' will be executed
   * @param {words} xPos, yPos and 'NORTH'/'EAST'/'WEST'/'SOUTH' e.g. 0 0 NORTH
   * @return {boolean}
   */
  public placeRobot = (words: string[]): void => {
    console.info('ToyRobot: inside placeRobot');
    let tempXCord: number = parseInt(words[1], 10);
    let tempYCord: number = parseInt(words[2], 10);
    const tempFacing: string = words[3];
    console.info(
      `ToyRobot: initial placement is ${tempXCord}, ${tempYCord} ${tempFacing}`
    );

    this.currentPos.xPos = tempXCord %= maxWidth;
    this.currentPos.yPos = tempYCord %= maxHeight;
    this.currentPos.facing = tempFacing;
    this.initiallyPlaced = true;
  };

  /**
   * Execute the given command on the robot. Any unwanted command e.g. other
   * than MOVE/LEFT/RIGHT are discarded without throwing any error or exit.
   * @param {words} 'MOVE'/'LEFT'/'RIGHT'
   */
  public executeCommand = (inputCommand: string): void => {
    console.info(`ToyRobot: inside executeCommands ${inputCommand}`);
    switch (inputCommand) {
      case 'MOVE':
        this.moveRobot();
        break;
      case 'LEFT':
        this.leftRobot();
        break;
      case 'RIGHT':
        this.rightRobot();
        break;
      default:
        console.error(
          'ToyRobot error: command is not known. nothing to execute!'
        );
    }
  };

  /**
   * Execute the specific command on the robot e.g. Move/Left/Right,
   * with number of units.
   * @param {command} 'MOVE'
   */
  private moveRobot = (): void => {
    console.info('ToyRobot: inside moveRobot');
    if (this.initiallyPlaced) {
      switch (this.currentPos.facing) {
        case 'NORTH':
          if (this.currentPos.yPos + 1 <= maxHeight)
            this.currentPos.yPos = this.currentPos.yPos + 1;
          break;
        case 'EAST':
          if (this.currentPos.xPos + 1 <= maxWidth)
            this.currentPos.xPos = this.currentPos.xPos + 1;
          break;
        case 'WEST':
          if (this.currentPos.xPos - 1 >= 0)
            this.currentPos.xPos = this.currentPos.xPos - 1;
          break;
        case 'SOUTH':
          if (this.currentPos.yPos - 1 >= 0)
            this.currentPos.yPos = this.currentPos.yPos - 1;
          break;
        default:
          console.error('ToyRobot error: facing is unknown. skipping!');
      }
    }
  };

  /**
   * Execute the specific command on the robot e.g. Move/Left/Right,
   * with number of units.
   */
  private leftRobot = (): void => {
    console.info('ToyRobot: inside leftRobot');
    if (this.initiallyPlaced) {
      switch (this.currentPos.facing) {
        case 'NORTH':
          this.currentPos.facing = 'WEST';
          break;
        case 'WEST':
          this.currentPos.facing = 'SOUTH';
          break;
        case 'SOUTH':
          this.currentPos.facing = 'EAST';
          break;
        case 'EAST':
          this.currentPos.facing = 'NORTH';
          break;
        default:
          console.error('ToyRobot error: facing is unknown. skipping!');
      }
    }
  };

  /**
   * Change the face of the robot,turn to its left from its current facing
   */
  private rightRobot = (): void => {
    console.info('ToyRobot: inside rightRobot');
    if (this.initiallyPlaced) {
      switch (this.currentPos.facing) {
        case 'NORTH':
          this.currentPos.facing = 'EAST';
          break;
        case 'EAST':
          this.currentPos.facing = 'SOUTH';
          break;
        case 'SOUTH':
          this.currentPos.facing = 'WEST';
          break;
        case 'WEST':
          this.currentPos.facing = 'NORTH';
          break;
        default:
          console.error('ToyRobot error: facing is unknown. skipping!');
      }
    }
  };

  /**
   * returns the this.currentPos
   * @return {IRobotPos} object with xPos, yPos, facing
   */
  public getFinalPosition = (): IRobotPos => {
    return this.currentPos;
  };
}
