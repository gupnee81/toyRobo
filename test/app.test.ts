import { expect } from 'chai';
import { ToyRobot } from '../src/';

describe('validate initial placement code', () => {
  let toyRobot: ToyRobot;
  beforeEach(() => {
    toyRobot = ToyRobot.getInstance();
  });

  describe('isValidPlaceCommand function test', () => {
    describe('When valid place command is passed', () => {
      it('should return true', () => {
        const result = toyRobot.isValidPlaceCommand(['PLACE', '0', '0', 'NORTH']);
        expect(result).equal(true);
      });
  });
  describe('When in-valid place command is passed', () => {
    it('should return false', () => {
      const result = toyRobot.isValidPlaceCommand(['14', '0', 'WEST']);
      expect(result).equal(false);
    });

    it('should return false', () => {
      const result = toyRobot.isValidPlaceCommand(['D', '0', 'NORTH']);
      expect(result).equal(false);
    });

    it('should return false', () => {
      const result = toyRobot.isValidPlaceCommand(['K', 'D', '0']);
      expect(result).equal(false);
    });

    it('should return false', () => {
      const result = toyRobot.isValidPlaceCommand(['WEST', '0', '0', '0']);
      expect(result).equal(false);
    });
  });
  });

  describe('executeCommand function test', () => {
    it('executeCommand to MOVE robo to 5,1,EAST', () => {
     toyRobot.placeRobot(['PLACE', '4', '1', 'EAST']);
     toyRobot.executeCommand('MOVE');

      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(5);
      expect(currentPosition.yPos).equal(1);
      expect(currentPosition.facing).equal('EAST');
    });

    it('executeCommand with empty execute commands string', () => {
      toyRobot.placeRobot(['PLACE', '0', '0', 'NORTH']);
      toyRobot.executeCommand('');

      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(0);
      expect(currentPosition.yPos).equal(0);
      expect(currentPosition.facing).equal('NORTH');
    });

    it('executeCommand - with toyRobot.placeRobot 3 1 SOUTH', () => {
      toyRobot.placeRobot(['PLACE', '3', '1', 'SOUTH']);
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('LEFT');

      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(3);
      expect(currentPosition.yPos).equal(0);
      expect(currentPosition.facing).equal('EAST');
    });

    it('executeCommand - with toyRobot.placeRobot 3 4 WEST', () => {
      toyRobot.placeRobot(['PLACE', '3', '4', 'WEST']);
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('RIGHT');
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('RIGHT');
      toyRobot.executeCommand('MOVE');

      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(3);
      expect(currentPosition.yPos).equal(5);
      expect(currentPosition.facing).equal('EAST');
    });

    it('executeCommand - with toyRobot.placeRobot 3 4 WEST', () => {
      toyRobot.placeRobot(['PLACE', '3', '4', 'WEST']);
      toyRobot.executeCommand('LEFT');
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('RIGHT');

      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(3);
      expect(currentPosition.yPos).equal(3);
      expect(currentPosition.facing).equal('WEST');
    });


    it('happy scenario - executeCommand - with toyRobot.placeRobot 3,4 NORTH', () => {
      toyRobot.placeRobot(['PLACE', '3', '4', 'NORTH']);
      toyRobot.executeCommand('RIGHT');
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('RIGHT');
      toyRobot.executeCommand('MOVE');

      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(4);
      expect(currentPosition.yPos).equal(3);
      expect(currentPosition.facing).equal('SOUTH');
    });
  });

  describe('Example Input and Output testing', () => {
    it('executeCommand - case 1 from the document', () => {
     toyRobot.placeRobot(['PLACE', '0', '0', 'NORTH']);
     toyRobot.executeCommand('MOVE');
      const currentPosition = toyRobot.getFinalPosition();
      expect(currentPosition.xPos).equal(0);
      expect(currentPosition.yPos).equal(1);
      expect(currentPosition.facing).equal('NORTH');
    });
    it('executeCommand - case 2 from the document', () => {
      toyRobot.placeRobot(['PLACE', '0', '0', 'NORTH']);
      toyRobot.executeCommand('LEFT');
      toyRobot.executeCommand('REPORT');
       const currentPosition = toyRobot.getFinalPosition();
       expect(currentPosition.xPos).equal(0);
       expect(currentPosition.yPos).equal(0);
       expect(currentPosition.facing).equal('WEST');
     });
     it('executeCommand - case 3 from the document', () => {
      toyRobot.placeRobot(['PLACE', '1', '2', 'EAST']);
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('LEFT');
      toyRobot.executeCommand('MOVE');
      toyRobot.executeCommand('REPORT');
       const currentPosition = toyRobot.getFinalPosition();
       expect(currentPosition.xPos).equal(3);
       expect(currentPosition.yPos).equal(3);
       expect(currentPosition.facing).equal('NORTH');
     });
  });
});
