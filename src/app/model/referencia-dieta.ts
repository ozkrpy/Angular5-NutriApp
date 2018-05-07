export class ReferenciaDieta {
    constructor(public codigo_referencia_x_dieta: any,
                public codigo_dieta: number,
                public hidratos_carbono: number,
                public proteinas: number,
                public grasas: number,
                public fibras: number,
                public codigo_paciente: number,
                public nombre: string,
                public apellido: string,
                public fecha_creacion: Date,
                public fecha_ultima_modificacion: Date) {}
}
