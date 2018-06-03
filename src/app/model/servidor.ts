export const Servidor = [
    {
        server: {
            host: 'localhost',
            // host: '192.168.1.4',
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
                pacienteHistorial: '/pacienteHistorial/',
                alimentos: '/alimentos',
                alimentoPorId: '/alimentoPorId/',
                alimentoActulizar: '/alimentoActualizar/',
                alimentoAgregar:'/alimentoAgregar',
                alimentoEliminar:'/alimentoEliminar',
                dietasReferencia: '/dietasReferencia',
                dietasReferenciaPorId: '/dietasReferenciaPorId/',
                dietasAlimentosPorId: '/dietasAlimentosPorId/',
                dietasInsertarAlimento: '/dietasAgregarAlimento',
                dietasActualizarReferencias: '/dietasEditarReferencias', 
                dietasEliminarAlimento: '/dietasEliminarAlimento',
                dietasEliminar: '/dietasEliminar',
                dietasAgregar: '/dietasAgregar',
                dietasSecuencia: '/dietasSecuencia'

            }
        }
    }
]
