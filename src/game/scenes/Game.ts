import { Physics, Scene } from 'phaser';
import { NotesService } from './NotesService';

export class Game extends Scene {
    notesService = new NotesService()
    fallingNotesGroup = new Phaser.GameObjects.Group(this)

    maxNotesInScreen = 5
    musicalScale: string[] = []

    constructor() {
        super('Game');
    }


    create() {
        this.musicalScale = this.notesService.getDiatonicBaseScale('A')
        let intervals = this.notesService.getModeIntervals('Ionian')

        this.notesService.addEnharmonicsToBaseScale('b', this.musicalScale, intervals)
        let notesPositions: number[] = []
        for (let index = 0; index < this.maxNotesInScreen; index++) {
            let newPosition = Phaser.Math.Between(30, this.scale.width - 30);

            while (this.positionExisists(newPosition, notesPositions)) {
                newPosition = Phaser.Math.Between(30, this.scale.width - 30);
            }
            notesPositions.push(newPosition)

            const n = this.musicalScale[Phaser.Math.Between(0, 7)]
            const noteText = new Phaser.GameObjects.Text(this, newPosition, 0, n, { fontSize: 50, fontStyle: 'bold', color: '#000' }).setDepth(10)

            this.add.existing(noteText)
            this.physics.add.existing(noteText);
            (<Physics.Arcade.Body>noteText.body).setMaxSpeed(Phaser.Math.Between(150, 350));
            (<Physics.Arcade.Body>noteText.body).setAccelerationY(Phaser.Math.Between(50, 150))
            this.fallingNotesGroup.add(noteText)
        }
    }

    positionExisists(position: number, positionsArray: number[]): boolean {
        for (let index = position - 50; index < position + 50; index++) {
            if (positionsArray.includes(index)) {
                return true;
            }
        }

        return false
    }

    update(time: number, delta: number): void {
        this.fallingNotesGroup.getChildren().forEach(nt => {

            if ((<any>nt.body).position.y > this.scale.height) {
                (<any>nt.body).position.y = 0;

            }
        })
    }
}
