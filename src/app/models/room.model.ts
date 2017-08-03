import { Marker } from './marker.model';

export class RoomModel {
    id: number;
    description: string;
    name: string;
    img: string;
    duration: string;
    countPerson: string;
    level: string;
    position: Marker;
    additionalAbilities: string;
    prevention: string;
}
