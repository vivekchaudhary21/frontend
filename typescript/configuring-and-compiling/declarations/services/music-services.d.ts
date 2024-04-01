declare enum Instrument {
    LUTE = 0,
    GUITAR = 1,
    SITAR = 2,
    LYRE = 3,
    ACCORDION = 4,
    HARMONICA = 5,
    VOICE = 6,
    SAXOPHONE = 7
}
export declare function numberToInstrument(num: Number): Instrument;
export declare function calculateDiscount(total: number, is_vip_member: false): number;
export declare function recommendInstrument({ age, enjoys_jazz, reach, tempo, }: {
    age?: number | undefined;
    enjoys_jazz?: boolean | undefined;
    reach?: number | undefined;
    tempo?: string | undefined;
}): Instrument;
declare class Tuner {
    getBaseFrequency(): number;
    checkPitch(pitch?: number): boolean;
}
export declare class HandheldTuner extends Tuner {
    getBaseFrequency(): number;
}
declare enum Tempo {
    LARGO = 0,
    ANDANTE = 1,
    ALLEGRO = 2
}
export declare function getTempo(bpm: number): Tempo;
export {};
