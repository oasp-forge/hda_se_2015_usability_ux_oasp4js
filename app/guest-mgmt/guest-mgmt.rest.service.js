angular.module('app.guest-mgmt').factory('guestManagementRestService',function ($http){
    'use strict';

    return {

       getAllArticles: function(){
           return $http.get('guest-mgmt/resources/articles.json');
       }

    }

});
