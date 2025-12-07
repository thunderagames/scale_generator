import { Scene } from 'phaser';
import { NotesService } from './NotesService';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;


    selectedNote = ''
    selectedMode = ''
    selectedModif = ''
    selectedScaleNote: Phaser.GameObjects.Text;
    generatedScale: Phaser.GameObjects.Text;
    oscillator: OscillatorNode;
    notesService = new NotesService()
    intervalsText: Phaser.GameObjects.Text;
    constructor() {
        super('Game');
    }


    create() {
        this.selectedScaleNote = this.add.text(100, 250, '');
        this.intervalsText = this.add.text((this.scale.width / 2) + 150, this.scale.height / 2, '', { fontSize: 30,/* fontStyle: 'bold'*/ }).setOrigin(0.5)
        this.generatedScale = this.add.text((this.scale.width / 2) + 150, this.scale.height / 2 + 50, '', { fontSize: 30, fontStyle: 'bold' }).setOrigin(0.5)

        this.printNotes()
        this.printModes()
        this.printModifiers()

        this.add.rectangle(200, this.scale.height - 100, 200, 100, 0xFFFFFF, 1).setInteractive().on(Phaser.Input.Events.POINTER_DOWN, () => {
            const scale = this.notesService.getDiatonicBaseScale(this.selectedNote)
            const intervals = this.notesService.getModeIntervals(this.selectedMode)

            this.intervalsText.setText(intervals.join('  '))
            this.notesService.addEnharmonicsToBaseScale(this.selectedModif, scale, intervals)
            this.generatedScale.setText(scale.join('  '))
        });
        this.add.text(200, this.scale.height - 100, 'Generate Scale', { color: '#000', fontSize: 20, fontStyle: 'bold' }).setOrigin(0.5)

    }


    printNotes() {
        let start_x = 100;
        const CMajScale = this.notesService.getDiatonicBaseScale('C')
        CMajScale.pop()
        let notesGroup = new Phaser.GameObjects.Group(this)
        CMajScale.forEach(note => {
            const t =
                this.add.text(start_x, 100, note, { fontSize: 30, fontStyle: 'bold' })
                    .setInteractive()
                    .on(Phaser.Input.Events.POINTER_DOWN, () => {
                        notesGroup.getChildren().forEach(tx => {
                            (tx as Phaser.GameObjects.Text).setColor('#FFF')
                        })
                        this.selectedNote = t.text
                        t.setColor('#5abd4bff')
                    })
            notesGroup.add(t)
            start_x += 80
        })

    }

    printModes() {
        let start_y = 200;
        let modesGroup = new Phaser.GameObjects.Group(this)
        this.notesService.modes.forEach(mode => {
            const t = this.add.text(100, start_y, mode, { fontSize: 20, fontStyle: 'bold' })
                .setInteractive()
                .on(Phaser.Input.Events.POINTER_DOWN, () => {
                    modesGroup.getChildren().forEach(tx => {
                        (tx as Phaser.GameObjects.Text).setColor('#FFF')
                    })
                    this.selectedMode = t.text
                    t.setColor('#5abd4bff')
                })

            modesGroup.add(t)
            start_y += 50
        });
    }

    printModifiers() {
        let start_y = 200;
        let modifGroup = new Phaser.GameObjects.Group(this);
        ['natural', 'sharp (#)', 'bemol (b)'].forEach(modificator => {
            const t = this.add.text(250, start_y, modificator, { fontSize: 20, fontStyle: 'bold' })
                .setInteractive()
                .on(Phaser.Input.Events.POINTER_DOWN, () => {
                    modifGroup.getChildren().forEach(tx => {
                        (tx as Phaser.GameObjects.Text).setColor('#FFF')
                    })
                    this.selectedModif = (t.text == 'sharp (#)') ? '#' : (t.text == 'bemol (b)' ? 'b' : '');
                    t.setColor('#5abd4bff')
                })

            modifGroup.add(t)
            start_y += 50
        })


    }

}
