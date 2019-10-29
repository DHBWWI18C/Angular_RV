import { Prices } from './Prices';

export interface Booking {
    id: number;
    userId: number;
    roomId: number;
    startDate: string;
    endDate: string;
    wifi: boolean;
    food: boolean;
    prices: Prices;
}