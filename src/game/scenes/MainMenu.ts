import { Scene, GameObjects } from 'phaser';
import { NotesService } from './NotesService';

export class MainMenu extends Scene {
    selectedNote = ''
    selectedMode = ''
    selectedAccidentals = ''
    selectedScaleNote: Phaser.GameObjects.Text;
    oscillator: OscillatorNode;
    notesService = new NotesService()
    intervalsText: Phaser.GameObjects.Text;
    scaleGroup = new Phaser.GameObjects.Group(this)
    constructor() {
        super('MainMenu');
    }

    getRomanNum(num: number): string {
        switch (num) {
            case 1:
                return 'I'

            case 2:
                return 'II'
            case 3:
                return 'III'
            case 4:
                return 'IV'
            case 5:
                return 'V'
            case 6:
                return 'VI'
            case 7:
                return 'VII'
            case 8:
                return 'VIII'
            default:
                return '';
        }
    }

    create() {
        this.selectedScaleNote = this.add.text(100, 250, '');
        let intervalsTitle = this.add.text(100, this.scale.height / 2 - 10, 'Semitone intervals', { fontFamily: 'arial black', color: '#000', fontSize: 24 })
            .setDepth(20)
            .setOrigin(0)
            .setVisible(false)
            .setAlpha(0.5)

        this.intervalsText = this.add.text((this.scale.width / 2), this.scale.height / 2 + 50, '', { fontSize: 32, color: '#000', fontFamily: 'arial black' }).setOrigin(0.5).setDepth(10)

        this.printNotes()
        this.printModes()
        this.printAccidentals()
        this.createGenerationZone()

        let start_x = 135;
        for (let i = 0; i < 8; i++) {

            this.add.rectangle(start_x, this.scale.height / 2 + 100, 64, 64, 0x000000, 0.3)
                .setInteractive()
                .on(Phaser.Input.Events.POINTER_DOWN, () => {
                    // this.sound.play(note)
                }).setScale(1)

            this.add.text(start_x, this.scale.height / 2 + 150, this.getRomanNum(i + 1), { fontFamily: 'arial black', color: '#000' }).setOrigin(0.5)
            start_x += 65
        }

        //})


        this.add.rectangle(this.scale.width / 2, this.scale.height - 100, 200, 100, 0xFFFFFF, 1).setInteractive().on(Phaser.Input.Events.POINTER_DOWN, () => {
            const scale = this.notesService.getDiatonicBaseScale(this.selectedNote)
            const intervals = this.notesService.getModeIntervals(this.selectedMode)
            intervalsTitle.setVisible(true)
            this.intervalsText.setText(intervals.join('    '))
            this.scaleGroup.clear(true, true)
            let start_x = 135;
            this.notesService.addEnharmonicsToBaseScale(this.selectedAccidentals, scale, intervals)
            scale.forEach(note => {
                const t =
                    this.add.image(start_x, this.scale.height / 2 + 100, note)
                        .setInteractive()
                        .on(Phaser.Input.Events.POINTER_DOWN, () => {
                            // this.sound.play(note)
                        }).setScale(0.8)
                        .setAlpha(0.8)
                this.scaleGroup.add(t)
                start_x += 65
            })

            //this.generatedScale.setText(scale.join('  '))
            this.sound.stopAll()

            this.sound.play(`${this.selectedMode}_${this.notesService.scaleToPlay}`, { volume: 0.5, rate: 1 })


        }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height - 100, 'Generate Scale', { color: '#000', fontSize: 20, fontStyle: 'bold' }).setOrigin(0.5)
    }


    printNotes() {
        this.add.text(80, 70, 'Select a note:', { fontSize: 25, fontFamily: 'arial black' })
        let start_x = 100;
        const CMajScale = this.notesService.getDiatonicBaseScale('C')
        CMajScale.pop()
        let notesGroup = new Phaser.GameObjects.Group(this)
        CMajScale.forEach(note => {
            const t =
                this.add.image(start_x, 140, note)
                    .setInteractive()
                    .on(Phaser.Input.Events.POINTER_DOWN, () => {
                        notesGroup.getChildren().forEach(tx => {
                            (tx as Phaser.GameObjects.Image).setAlpha(1)
                        })
                        this.selectedNote = note;
                        (t as Phaser.GameObjects.Image).setAlpha(0.3)
                        this.sound.play(note)
                    }).setScale(1)
            notesGroup.add(t)
            start_x += 80
        })
    }

    printModes() {
        this.add.text(80, 210, 'Select a mode:', { fontSize: 20, fontFamily: 'arial black' })
        const htmlSelect = document.createElement('select');
        this.notesService.modes.forEach(m => {
            const opt = document.createElement('option')
            opt.value = m;
            opt.innerText = this.notesService.modesNames[m].es
            htmlSelect.append(opt)
        });

        htmlSelect.addEventListener('change', (event) => {
            const value = (<any>event?.target).value;
            if (value != null) {
                console.log('Selected:', value);
                this.selectedMode = value;
            }
        });

        this.add.dom(this.scale.width / 2, 200, htmlSelect, 'font: 20px arial black; width:300px;; height: 50px').setOrigin(0);
        this.selectedMode = this.notesService.modes[0]
    }

    //alteraciones    
    printAccidentals() {
        this.add.text(80, 290, 'Select an accidental:', { fontSize: 20, fontFamily: 'arial black' })
        const htmlSelect = document.createElement('select');
        this.notesService.accidentals.forEach(a => {
            const alterName = this.notesService.accidentalsNames[a].es
            const opt = document.createElement('option')
            opt.value = a;
            opt.innerText = alterName;

            htmlSelect.append(opt)
        });

        htmlSelect.addEventListener('change', (event) => {
            const value = (<any>event?.target).value;
            if (value != null) {
                this.selectedAccidentals = value;
                console.log('Selected:', value);
            }
        });

        this.add.dom(this.scale.width / 2, 280, htmlSelect, 'font: 20px arial black; width:300px; height: 50px').setOrigin(0);
        this.selectedAccidentals = this.notesService.accidentals[0]
    }

    createGenerationZone() {
        this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 100, this.scale.width - 100, 300, 0xFFFFFF, 0.5).setOrigin(0.5)
        this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 100, this.scale.width - 100, 300, 0xFFFFFF, 0.5).setOrigin(0.5)
    }
}
