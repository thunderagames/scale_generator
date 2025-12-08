import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }


    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets/img');

        this.load.image('C', 'C.png');
        this.load.image('C#', 'Cs.png');
        this.load.image('C##', 'Css.png');
        this.load.image('Cb', 'Cb.png');
        this.load.image('Cbb', 'Cbb.png');

        this.load.image('D', 'D.png');
        this.load.image('D#', 'Ds.png');
        this.load.image('D##', 'Dss.png');
        this.load.image('Db', 'Db.png');
        this.load.image('Dbb', 'Dbb.png');

        this.load.image('E', 'E.png');
        this.load.image('E#', 'Es.png');
        this.load.image('E##', 'Ess.png');
        this.load.image('Eb', 'Eb.png');
        this.load.image('Ebb', 'Ebb.png');

        this.load.image('F', 'F.png');
        this.load.image('F#', 'Fs.png');
        this.load.image('F##', 'Fss.png');
        this.load.image('Fb', 'Fb.png');
        this.load.image('Fbb', 'Fbb.png');

        this.load.image('G', 'G.png');
        this.load.image('G#', 'Gs.png');
        this.load.image('G##', 'Gss.png');
        this.load.image('Gb', 'Gb.png');
        this.load.image('Gbb', 'Gbb.png');

        this.load.image('A', 'A.png');
        this.load.image('A#', 'As.png');
        this.load.image('A##', 'Ass.png');
        this.load.image('Ab', 'Ab.png');
        this.load.image('Abb', 'Abb.png');

        this.load.image('B', 'B.png');
        this.load.image('B#', 'Bs.png');
        this.load.image('B##', 'Bss.png');
        this.load.image('Bb', 'Bb.png');
        this.load.image('Bbb', 'Bbb.png');

        this.load.setPath('assets/aud');
        this.load.audio({ key: 'C', url: ['notes/C.ogg'] })
        this.load.audio({ key: 'C#', url: ['notes/Cs.ogg'] })
        this.load.audio({ key: 'D', url: ['notes/D.ogg'] })
        this.load.audio({ key: 'D#', url: ['notes/Ds.ogg'] })
        this.load.audio({ key: 'E', url: ['notes/E.ogg'] })
        this.load.audio({ key: 'F', url: ['notes/F.ogg'] })
        this.load.audio({ key: 'F#', url: ['notes/Fs.ogg'] })
        this.load.audio({ key: 'G', url: ['notes/G.ogg'] })
        this.load.audio({ key: 'G#', url: ['notes/Gs.ogg'] })
        this.load.audio({ key: 'A', url: ['notes/A.ogg'] })
        this.load.audio({ key: 'A#', url: ['notes/As.ogg'] })
        this.load.audio({ key: 'B', url: ['notes/B.ogg'] })

        //ionian scales
        this.load.audio({ key: 'ionian_C', url: ['ionian_scales/C.ogg'] })
        this.load.audio({ key: 'ionian_C#', url: ['ionian_scales/Cs.ogg'] })
        this.load.audio({ key: 'ionian_D', url: ['ionian_scales/D.ogg'] })
        this.load.audio({ key: 'ionian_D#', url: ['ionian_scales/Ds.ogg'] })
        this.load.audio({ key: 'ionian_E', url: ['ionian_scales/E.ogg'] })
        this.load.audio({ key: 'ionian_F', url: ['ionian_scales/F.ogg'] })
        this.load.audio({ key: 'ionian_F#', url: ['ionian_scales/Fs.ogg'] })
        this.load.audio({ key: 'ionian_G', url: ['ionian_scales/G.ogg'] })
        this.load.audio({ key: 'ionian_G#', url: ['ionian_scales/Gs.ogg'] })
        this.load.audio({ key: 'ionian_A', url: ['ionian_scales/A.ogg'] })
        this.load.audio({ key: 'ionian_A#', url: ['ionian_scales/As.ogg'] })
        this.load.audio({ key: 'ionian_B', url: ['ionian_scales/B.ogg'] })
    }

    create() {
        //this.sound.play('C')
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
