import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }


    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('C', 'C.png');
        this.load.image('Cs', 'Cs.png');
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
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
