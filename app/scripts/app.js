'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        controller: 'dashboardCtrl',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/controllers/dashboardCtrl.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })



            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            }),
            $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            })

          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })    
      .state('dashboard.ctaExtracto',{
        templateUrl:'views/ariadna/cuentasextracto.html',
        controller: 'CtaExtractoCtrl',
        url:'/extracto?codmacta',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            $ocLazyLoad.load({
              name:'sbAdminApp',
              files:['scripts/controllers/CtaExtractoCtrl.js']
            })    
          }
        }
    })    
      .state('dashboard.facturasCliente',{
        templateUrl:'views/ariadna/facturasCliente.html',
        controller: 'facturasClienteCtrl',
        url:'/facturasCliente',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            $ocLazyLoad.load({
              name:'sbAdminApp',
              files:['scripts/controllers/facturasClienteCtrl.js']
            })    
          }
        }
    }) 
      .state('dashboard.asientosB',{
        templateUrl:'views/ariadna/asientosBus.html',
        controller: 'AsientosBusCtrl',
        url:'/Asientos',
        resolve: {    
          loadMyFiles:function($ocLazyLoad) {
            $ocLazyLoad.load({
              name:'sbAdminApp',
              files:['scripts/controllers/AsientosBusCtrl.js']
            })    
          }
        }
    }) 
    .state('dashboard.cuentas',{
        url:'/cuentas',
        controller: 'CuentasCtrl',
        templateUrl:'views/ariadna/cuentas.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            $ocLazyLoad.load({
              name:'sbAdminApp',
              files:['scripts/controllers/CuentasCtrl.js']
            })    
          }
        }
      })  
    .state('dashboard.clientes',{
        url:'/clientes',
        controller: 'ClientesDatosCtrl',
        templateUrl:'views/ariadna/cli-datos.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            $ocLazyLoad.load({
              name:'sbAdminApp2',
              files:['views/ariadna/clientes.datos.controler.js']
            })    
          }
        }
      })
    .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
        controller: 'LoginCtr',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            $ocLazyLoad.load({
              name:'sbAdminApp3',
              files:['js/LoginCtr.js']
            })
          }
        }

    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    
