import readline from 'readline';
import fs from 'fs';
import { ToyRobot } from './core';

const isInputFileGiven = (value: string) =>
  Object.prototype.toString.call(value) === '[object String]';

const startToyRobot = () => {
  //Validates the input file name
  if (!isInputFileGiven(process.argv[2])) {
    console.error(
      'ToyRobot: input file name is not supplied. nothing to execute!'
    );
    process.exit(1);
  }

  let lineIndex = 0;
  const fileStream = fs.createReadStream(process.argv[2]);
  fileStream.on('error', function (err) {
    console.error(`ToyRobot error:${err}`);
    process.exit(1);
  });

  const readInterface = readline.createInterface({
    input: fileStream,
    output: process.stdout,
  });

  readInterface
    .on('line', function (commands) {
      console.info(
        `ToyRobot: command of lineIndex ${lineIndex++} is ${commands}`
      );
      const toyRobot = ToyRobot.getInstance();
      const words = commands.split(' ');
      if (words[0] === 'PLACE') {
        if (toyRobot.isValidPlaceCommand(words)) {
          toyRobot.placeRobot(words);
        }
      } else if (words[0] === 'REPORT') {
        console.info(
          `ToyRobot: Robot final position is ${JSON.stringify(
            toyRobot.getFinalPosition()
          )}`
        );
      } else {
        toyRobot.executeCommand(commands);
      }
    })
    .on('close', () => {
      console.info('ToyRobot: process exiting now! have a great day!');
      readInterface.close();
      process.exit(0);
    });
};

startToyRobot();
