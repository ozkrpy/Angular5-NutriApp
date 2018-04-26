export const Servidor = [
    {
        server: {
            host: 'localhost',
            port: '9092',
            typeGET: 'GET',
            typePOST: 'POST',
            methods: {
                helloWorld: '/helloworld',
                usuarios: '/users',
                usuariosPorUsuario: '/usersByUsuario/{usuario}',
                pacientes: '/pacientes',
                pacientePorId: '/pacientePorId/',
                pacienteEditarInfo: '/pacienteEditarInfo',
                pacienteEditarPeso: '/pacienteEditarPeso',
                pacienteEditarTalla: '/pacienteEditarTalla',
                pacienteEditarAntecedentes: '/pacienteEditarAnteced',
                pacienteEditarLaboratorio: '/pacienteEditarLab',
                pacientePesoIdeal: '/pacientePesoIdeal',
                pacienteAlta: '/pacienteAgregar',
                pacienteEliminar: '/pacienteEliminar',
                alimentos: '/alimentos',
                alimentoPorId: '/alimentoPorId/',
                dietas: '/dietas',
                dietasById: '/dietas/'
            }
        }
    }
]
