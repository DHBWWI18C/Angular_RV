import {Size} from './Size';

export interface Room{
    id: number;
    name: string;
    info: string;
    roomsize: Size;
    beamerAvailable: boolean;
    price: number;
    picturePath: string;
}
