(function() {
    'user strict';
    angular.module('sbAdminApp.core')
        .factory('ClientesFactory', ClientesFactory);

    ClientesFactory.$inject = ['$http', 'LSFactory'];

    function ClientesFactory($http, LSFactory) {

        var ClientesAPI = {
            getClientes: function(agente, parnom) {
                return $http.get( './api/clientes/clientes-agente', {
                    params: {
                        "agente": agente,
                        "parnom": parnom
                    }
                })
            },
            saveClienteLocal: function(cliente) {
                LSFactory.set('cliente', cliente);
            },
            saveOfertaLocal: function(oferta) {
                LSFactory.set('oferta', oferta);
            },
            savePedidoLocal: function(pedido) {
                LSFactory.set('pedido', pedido);
            },
            saveAlbaranLocal: function(albaran) {
                LSFactory.set('albaran', albaran);
            },
            saveFacturaLocal: function(factura) {
                LSFactory.set('factura', factura);
            },
            getClienteLocal: function() {
                return LSFactory.get('cliente');
            },
            getOfertaLocal: function() {
                return LSFactory.get('oferta');
            },
            getPedidoLocal: function() {
                return LSFactory.get('pedido');
            },
            getAlbaranLocal: function() {
                return LSFactory.get('albaran');
            },
            getFacturaLocal: function() {
                return LSFactory.get('factura');
            },
            getIndicadores: function(codclien, codmacta) {
                return $http.get( './api/indicadores', {
                    params: {
                        "codclien": codclien,
                        "codmacta": codmacta
                    }
                })
            },
            getCobros: function(codmacta) {
                return $http.get( './api/cobros', {
                    params: {
                        "codmacta": codmacta
                    }
                })
            },
            getOfertas: function(codclien) {
                return $http.get( './api/ofertas/cliente/' + codclien);
            },
            getPedidos: function(codclien) {
                return $http.get( './api/pedidos/cliente/' + codclien);
            },
            getAlbaranes: function(codclien) {
                return $http.get('./api/albaranes/cliente/' + codclien);
            },
            getFacturas: function(codclien) {
                return $http.get( './api/facturas/cliente/' + codclien);
            }
        };

        return ClientesAPI;
    }
})()
