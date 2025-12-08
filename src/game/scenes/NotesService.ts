export class NotesService {
    cromaticScale = [
        { note: 'C', enharmonics: ['B#', 'Dbb'] },
        { note: 'C#', enharmonics: ['Db'] },
        { note: 'D', enharmonics: ['Ebb', 'C##'] },
        { note: 'D#', enharmonics: ['Eb'] },
        { note: 'E', enharmonics: ['Fb', 'D##'] },
        { note: 'F', enharmonics: ['E#', 'Gbb'] },
        { note: 'F#', enharmonics: ['Gb', 'E##'] },
        { note: 'G', enharmonics: ['Abb', 'F##'] },
        { note: 'G#', enharmonics: ['Ab'] },
        { note: 'A', enharmonics: ['Bbb', 'G##'] },
        { note: 'A#', enharmonics: ['Bb', 'Cbb'] },
        { note: 'B', enharmonics: ['Cb', 'A##'] },
    ]

    modesNames: { [key: string]: any } = {
        'ionian': {
            en: 'Ionian',
            es: 'Jonico'
        },
        'dorian': {
            en: 'Dorian',
            es: 'Dorico'
        },
        'phrygian': {
            en: 'Phrygian',
            es: 'Frigio'
        },
        'lydian': {
            en: 'Lydian',
            es: 'Lidio'
        },
        'mixolydian': {
            en: 'Mixolydian',
            es: 'Mixolidio'
        },
        'aeolian': {
            en: 'Aeolian',
            es: 'Eolico'
        },
        'locrian': {
            en: 'Locrian',
            es: 'Locrio'
        }
    }
    modes: string[] = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];
    IonianIntervals: number[] = [2, 2, 1, 2, 2, 2, 1];
    accidentals: string[] = ['', '#', 'b']
    accidentalsNames: { [key: string]: any } = {
        '': {
            en: 'Natural',
            es: 'Natural'
        },
        '#': {
            en: 'Sharp (#)',
            es: 'Sostenido (#)'
        },
        'b': {
            en: 'Bemol (b)',
            es: 'Bemol (b)'
        }
    }

    scaleToPlay: string = ''

    getModeIntervals(mode: string): number[] {
        const result: number[] = []
        const modeIndex = this.modes.findIndex((x: any) => x == mode);
        for (let i = modeIndex; i < 7; i++) {
            result.push(this.IonianIntervals[i])
        }

        for (let i = 0; i < modeIndex; i++) {
            result.push(this.IonianIntervals[i])
        }

        return result;
    }

    getDiatonicBaseScale(tonicNote: string): any[] {
        tonicNote = tonicNote.replace('#', '')
        //Get the base scale
        let result: any[] = []
        const naturalNotes = this.cromaticScale.filter(n => {
            if (!n.note.includes('#')) {
                return n.note
            }
        }).map<string>(x => x.note)
        const tonicIndex = naturalNotes.findIndex(i => i == tonicNote)

        let nextIndex = tonicIndex

        //Get 8 notes of the diatonic scale
        for (let index = 0; index < 8; index++) {
            if (nextIndex > 6) {
                nextIndex = nextIndex - 7
            }
            result.push(naturalNotes[nextIndex])

            nextIndex += 1;
        }

        return result
    }

    addEnharmonicsToBaseScale(modificator: string, baseScale: string[], intervals: number[]) {

        baseScale[0] = baseScale[0] + modificator
        this.scaleToPlay = this.cromaticScale.find(x => x.note == baseScale[0] || x.enharmonics.includes(baseScale[0]))?.note ?? ''

        let cromaticScaleIndex = this.cromaticScale.findIndex(x => x.note == baseScale[0]);
        if (cromaticScaleIndex == -1) {
            cromaticScaleIndex = this.cromaticScale.findIndex(x => x.enharmonics.includes(baseScale[0]));
        }

        if (cromaticScaleIndex == -1)
            return

        const diatonicBase = []
        for (let i = 1; i < 12; i++) {
            if (cromaticScaleIndex > 11) {
                cromaticScaleIndex = cromaticScaleIndex - 12
            }
            if (!this.cromaticScale[cromaticScaleIndex])
                break;

            diatonicBase.push(this.cromaticScale[cromaticScaleIndex])
            cromaticScaleIndex += intervals[i - 1]
        }

        for (let i = 1; i < 8; i++) {

            const baseNote = baseScale[i];
            const diatonicNote = diatonicBase[i]
            if (baseNote != diatonicNote.note) {
                const enharmonic = diatonicNote.enharmonics.find(x => x.includes(baseNote))
                baseScale[i] = enharmonic ?? (diatonicNote?.note ?? '')
            }

        }
    }
}

