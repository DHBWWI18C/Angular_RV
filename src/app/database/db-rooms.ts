import { Room } from '../interfaces/Room';
import { SIZES } from './db-roomSizes';

export const ROOMS: Room[] = [

    {
        id: 1,
        name: 'Room #1',
        info: 'This is the first room',
        beamerAvailable: true,
        price: 200,
        roomsize: SIZES[1],
        picturePath: './assets/room1_1.jpg'
    },
    {
        id: 2,
        name: 'Genuss-Raum',
        info: 'This is the 2. room',
        beamerAvailable: false,
        price: 200,
        roomsize: SIZES[1],
        picturePath: './assets/room2_1.jpg'
    },
    {
        id: 3,
        name: 'Room #3',
        info: 'This is the 3. room',
        beamerAvailable: true,
        price: 200,
        roomsize: SIZES[1],
        picturePath: './assets/room3_1.jpg'
    }
];

