import { AlimentoDetalle } from './alimento-detalle';

export class DietaAlimentos {
    constructor(
        public numero_item: number,
        public cantidad_alimento: number,
        public alimento: AlimentoDetalle
    ) {}

}
