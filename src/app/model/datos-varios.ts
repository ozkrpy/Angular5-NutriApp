export const SexosArray = [
    {facevalue: "Masculino", valor: "M"},
    {facevalue: "Femenino", valor: "F"}
];

export const Opciones = [
    {facevalue: "Si", valor: "1"},
    {facevalue: "No", valor: "0"}
];

export const EstadoCivil = [
    {facevalue: "Casado/a", valor: "Casado/a"},
    {facevalue: "Soltero/a", valor: "Soltero/a"},
    {facevalue: "Viudo/a", valor: "Viudo/a"},
    {facevalue: "Divorciado/a", valor: "Divorciado/a"},
    {facevalue: "Indefinido", valor: "Indefinido"}
];

export const Contextura = {
    pequena: 'Pequeña',
    mediana: 'Mediana',
    grande: 'Grande',
    indefinida: 'N/C (Menor a 25 años)'
}

export const TipoAlimento = [
    {valor:"1", facevalue:"Lacteos"},
    {valor:"2", facevalue:"Huevos"},
    {valor:"3", facevalue:"Carne - Aves"},
    {valor:"4", facevalue:"Carne - Vacuna"},
    {valor:"5", facevalue:"Carne - Pescado"},
    {valor:"6", facevalue:"Vegetales A"},
    {valor:"7", facevalue:"Vegetales B"},
    {valor:"8", facevalue:"Vegetales C"},
    {valor:"9", facevalue:"Frutas A"},
    {valor:"10", facevalue:"Frutas B"},
    {valor:"11", facevalue:"Frutas C"},
    {valor:"12", facevalue:"Frutos secos"},
    {valor:"13", facevalue:"Cereales"},
    {valor:"14", facevalue:"Panificados"},
    {valor:"15", facevalue:"Dulces"},
    {valor:"16", facevalue:"Grasas"},
    {valor:"17", facevalue:"Productos congelados"},
    {valor:"18", facevalue:"Bebidas gasificadas"},
    {valor:"19", facevalue:"Edulcorantes y sales dieteticas"},
    {valor:"20", facevalue:"Jugos en sobre p/ preparar"},
    {valor:"21", facevalue:"Cereales infantiles"},
    {valor:"22", facevalue:"Preparados varios"}    
];

export const MedidasCaseras = [
    {valor:"1", facevalue:"aplicación"},
    {valor:"2", facevalue:"barra"},
    {valor:"3", facevalue:"bocha"},
    {valor:"4", facevalue:"chica"},
    {valor:"5", facevalue:"chico"},
    {valor:"6", facevalue:"compotera"},
    {valor:"7", facevalue:"cuarto de tapa"},
    {valor:"8", facevalue:"cucharada"},
    {valor:"9", facevalue:"cucharadas"},
    {valor:"10", facevalue:"cucharadita"},
    {valor:"11", facevalue:"feta"},
    {valor:"12", facevalue:"fetas"},
    {valor:"13", facevalue:"filet chico"},
    {valor:"14", facevalue:"gotas"},
    {valor:"15", facevalue:"grande"},
    {valor:"16", facevalue:"mazo"},
    {valor:"17", facevalue:"mediana"},
    {valor:"18", facevalue:"mediano"},
    {valor:"19", facevalue:"mitades"},
    {valor:"20", facevalue:"nido"},
    {valor:"21", facevalue:"pechuga"},
    {valor:"22", facevalue:"pequeña"},
    {valor:"23", facevalue:"pequeño"},
    {valor:"24", facevalue:"plato"},
    {valor:"25", facevalue:"plato chico"},
    {valor:"26", facevalue:"porc chica"},
    {valor:"27", facevalue:"porcion"},
    {valor:"28", facevalue:"pote"},
    {valor:"29", facevalue:"pote chico"},
    {valor:"30", facevalue:"puño"},
    {valor:"31", facevalue:"rebanada"},
    {valor:"32", facevalue:"rebanadas"},
    {valor:"33", facevalue:"rebanandas"},
    {valor:"34", facevalue:"rodaja"},
    {valor:"35", facevalue:"sobre"},
    {valor:"36", facevalue:"taza"},
    {valor:"37", facevalue:"taza (té)"},
    {valor:"38", facevalue:"taza grande"},
    {valor:"39", facevalue:"unidad"},
    {valor:"40", facevalue:"unidades"},
    {valor:"41", facevalue:"vaso"},
    {valor:"42", facevalue:"vaso chico"}
];

export const MedidasReal = [
    {valor:"1", facevalue:"ml"},
    {valor:"2", facevalue:"g"}
];

export const Gramos = [
    {valor:"1", facevalue:"mg"},
    {valor:"2", facevalue:"g"}
];

export const AFIRMATIVO = 'SI';
export const NEGATIVO = 'NO';

export const PACIENTE = {
    deleteOK: 'El paciente ha sido eliminado correctamente',
    deleteERR: 'El paciente cuenta con dietas activas, no se puede eliminar.',
    updateDatosOK: 'Los datos personales del paciente han sido actualizados.',
    updatePesoOK: 'Los datos de peso del paciente han sido actualizados.',
    updateTallaOK: 'Los datos de talla y medidas del paciente han sido actualizados.',
    updateAntecedentesOK: 'Los datos de antecedentes del paciente han sido actualizados.',
    updateLaboratorioOK: 'Los datos de laboratorio del paciente han sido actualizados.',
    altaOK: 'El paciente ha sido registrado exitosamente.',
    altaERR: 'El paciente no ha sido registrado, consulte con SOPORTE.',
    altaCalculosERR: 'Los datos ingresados generaron un error, consulte el manual de ayuda.',
    graficoTitulos: {
        pesoActual: 'Peso Actual.',
        pesoHabitual: 'Peso Habitual.',
        pesoAjustado: 'Peso Ajustado.',
        pesoSaludable: 'Peso Saludable.',
    },
    graficoColores: {
        fondoRojo: 'rgba(255, 99, 132, 0.2)',
        bordeRojo: 'rgba(255,99,132,1)',
        fondoCeleste: 'rgba(54, 162, 235, 0.2)',
        bordeCeleste: 'rgba(54, 162, 235, 1)',
        fondoVerde: 'rgba(75, 192, 192, 0.2)',
        bordeVerde: 'rgba(75, 192, 192, 1)',
        fondoVioleta: 'rgba(153, 102, 255, 0.2)',
        bordeVioleta: 'rgba(153, 102, 255, 1)',
    }
};

export const DIETA = {
    deleteOK: 'La dieta se ha eliminado correctamente',
    deleteERR: 'Ocurrio un error, favor contactar al soporte.',
    updateDatosOK: '',
    altaOK: 'Nueva dieta creada exitosamente.',
    altaERR: '',
    addAlimentoOK: 'Se agrego correctamente el alimento a la dieta: ',
    delAlimentoOK: 'El alimento ha sido dado eliminado correctamente.',
    delAlimentoERR: 'Error al eliminar, favor notifique al soporte.',
};

export const ALIMENTO = {
    deleteOK: 'El alimento ha sido eliminado correctamente.',
    deleteERR: 'El alimento existe en dietas activas, no se puede eliminar.',
    updateDatosOK: 'Los datos del alimento han sido actualizados.',
    altaOK: 'Se dio de alta el alimento: ',
    altaERR: '',
};