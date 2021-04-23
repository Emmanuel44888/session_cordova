/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

$(document).ready(function(){
    $('.sidenav').sidenav();
});

// CRUD = CREATE; READ; UPDATE; DELETE
var app = new function () {

    this.el = document.getElementById('countries');
    this.countries = [];

    // Compte le nombre d'element du tableau
    this.count = function (data) { 
        var el = document.getElementById('counter');
        var name = 'country';
        if (data){
            if(data >= 1){
                name = ' countries';
                el.innerHTML = data + name;
            }
        } else{
            el.innerHTML = 'No ' + name;
        }  
    }

    // Afficher tous les pays
    this.fetchAll = function () {
        var data = '';
        this.count(this.countries.length);
        if (this.countries.length > 0) {
            for (var i = 0; i < this.countries.length; i++) {
                data += '<div class="col s12 m6">';
                data += '<p>' + this.countries[i] + '</p>';
                data += '</div>';
                data += '<div class="col s12 m6">';
                data += '<p><button class="waves-effect waves-light btn-small" onclick="app.edit('+ i +')">Edit</button>';
                data += '<button class="waves-effect waves-light btn-small" onclick="app.delete('+ i +')">Supprimer</button></p>';
                data += '</div>';
            }
            return this.el.innerHTML = data;
        } else {
            return this.el.innerHTML = "Inserer un nouveau pays";
        }
    
    }

    // Ajouter un element au tableau
    this.add = function () {
        var el = document.getElementById('add-name');
        // recupere la valeur
        var country = el.value;

        if (country) {
            // Ajoute une valeur
            this.countries.push(country.trim());
            // reinitialise imput value
            el.value = '';
            // affiche la nouvelle liste
            this.fetchAll();
        }
    }

    // Mise à jour d'un element
    this.edit = function (item) { 
        var el = document.getElementById('edit-name');
        // Affiche l'element recupere selon l'indice recupere
        // en parametre
        el.value = this.countries[item];
        document.getElementById('spoiler').style.display = 'block';

        // self est utilisé pour maintenir une référence à l'original 
        // même si le contexte change.
        self = this;

        document.getElementById('saveEdit').onsubmit = function() {
            
            // recupere la valeur
            var country = el.value;

            if (country) {
                // Met à jour la valeur
                self.countries.splice(item, 1, country.trim());
                // affiche la nouvelle liste
                self.fetchAll();
                // Cache les champs de mise à jour
                closeInput();
            }
        }
    }

    // Supprimer un element du tableau
    this.delete = function (item) { 
        // Supprime la ligne selon l'indice passe en parametre
        this.countries.splice(item, 1);
        // affiche la nouvelle liste
        this.fetchAll(); 
    }
}

app.fetchAll();

function closeInput() {
    document.getElementById('spoiler').style.display = 'none';
}

