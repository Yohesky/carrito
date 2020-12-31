import { Purchases } from './purchases';

export interface Products {
    _id?: string;
    titulo?: string;
    precio?: number | any;
    foto?: string;
    descripcionArticulo?: string;
    purchases?: Purchases;
    cantidad?: number;
    total?: number;
}
