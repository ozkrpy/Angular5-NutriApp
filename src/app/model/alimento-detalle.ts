export class AlimentoDetalle {
    constructor(
        public codigo_alimento: any,
        public descripcion_alimento: string,
        public tipo_alimento: number,
        public descripcion_tipo_alimento: any,
        public medida_casera: string,
        public medida_casera_unidad: string,
        public medida_real: number, 
        public medida_real_unidad: string,
        public hidratos_carbono: number,
        public unidad_medida_hidratos_carbono: string,
        public proteina: number,
        public unidad_medida_proteina: string,
        public grasa: number,
        public unidad_medida_grasa: string,
        public sodio: number,
        public unidad_medida_sodio: string,
        public potasio: number,
        public unidad_medida_potasio: string,
        public fosforo: number,
        public unidad_medida_fosforo: string,
        public calcio: number,
        public unidad_medida_calcio: string,
        public hierro: number,
        public unidad_medida_hierro: string,
        public colesterol: number,
        public unidad_medida_colesterol: string,
        public purinas: number,
        public unidad_medida_purinas: string,
        public fibra: number,
        public unidad_medida_fibra: string,
        public agua: number,
        public unidad_medida_agua: string,
        public calorias: number 
    ){}
}
