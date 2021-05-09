
var articleManager = {

    showArticlesList: function () {
      $.ajax({
        url: "http://localhost:5557/articles/",
        // url: "https://10.0.2.2:5557/articles/",
        type: "GET",
        cache: false,
        dataType: 'json',
        success: function (data) {
        $('#articleList li').remove();  
          $.each(data, function (index, article) {
            $('<li>')
            //$("#articleList")
              .append("<button onclick=\"articlesManager.showArticlesDetails(\'" + article.libelle + "\');\" >Edit</button>")
              .append("<div class='article'>" + article.description1 + "</div>")
              .append("<div class='card_content'>" + article.description2 + "</div>")
              // .appendTo($('#articles'))

            ;
          });

          $('#articleListPanel').show();
        }
      });
    },
    showArticleDetails: function (id) {
        if(id == null) return;
       $('#articleSearchPanel').hide();
      $.ajax({
        url: "http://localhost:55557/articles/" + id,
        // url: "https://10.0.2.2:55557/articles/" + id,
        type: "GET",
        cache: false,
        dataType: 'json',
        success: function (article) {
          console.log(article);
          $('#articleDetailsPanel').show();
          $('#id').attr('value', article.id);
          $('#libelle').attr('value', article.libelle);
        //   $('#description1').attr('value', article.description1);
        //   $('#description2').attr('value', article.description2);
        //   $('#img1').attr('src', article.urlPhotoPr);
        //   $('#img2').attr('src', article.urlPhotoDetail1);
        //   $('#img3').attr('src', article.urlPhotoDetail2);
        //   $('#img4').attr('src', article.urlPhotoDetail3);
        }
      });
    },
  }


  var articleManager = {
   
    showArticleList: function () {
       $.ajax({
           url: "https://server-rest-api.herokuapp.com/personnes/", // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           type: "GET", // Le type de la requête HTTP,
           cache: false, // n'enregistre pas temporairement des copies de données
           dataType : 'json', //  Le type de données à recevoir, ici, du json
           success: function (data) {
               console.log(data);
               $('#articleList li').remove();
               $.each(data, function (index, articles) {
                   $('<li>')
                       .text(articles.nom + ' / ' + articles.prenom)
                       .attr('value', articles.id).appendTo($('#articleList'))
                       .append("<button onclick=\"articleManager.showArticleDetails(\'" + articles.id + "\');\" >Edit</button>")
                   ;
               });
               $('#articleListPanel').show();
           }
       });
   },
   showArticleDetails: function (id) { 
       if(id == null) return;
       $('#personSearchPanel').hide();
       $.ajax({
           url: "https://server-rest-api.herokuapp.com/personnes/" + id, // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           type: "GET", // Le type de la requête HTTP,
           cache: false, // n'enregistre pas temporairement des copies de données
           dataType : 'json', //  Le type de données à recevoir, ici, du json
           success: function (articles) {
               console.log(articles);
               $('#articleDetailsPanel').show();
               $('#id').attr('value', articles.id);
               $('#nom').attr('value', articles.nom).focus();
               $('#prenom').attr('value', articles.prenom);               
           }
       });
   },

   backtoSearch: function(){
       $('#articleDetailsPanel').hide();
       $('#articleSearchPanel').show();
       $('#articleList').focus();
   },
   collectFieldsValues: function () {
       return {
           id: $('#id').val(),
           nom: $('#nom').val(),
           prenom: $('#prenom').val(),
       }
   },

   refreshSearch: function () {
       this.backtoSearch();
       this.showArticleList();
   },

   newArticle: function () {
       $('#articleSearchPanel').hide();
       $('#articleDetailsPanel').show();
       $('#id').attr('value', null);
       $('#nom').attr('value', 'New Article').focus().select();
       $('#prenom').attr('value', 'New Article');

   },

   saveArticle: function () {
       if (!confirm('Save ?')) return false;
       var requestType = $('#id').val() != '' ? 'PUT' : 'POST';
       $.ajax({
           url: "https://server-rest-api.herokuapp.com/personnes/" + $('#id').val(), // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           type: requestType, // Le type de la requête HTTP,
           data: articleManager.collectFieldsValues(), // On passe nos données à l'url
           cache: false, // n'enregistre pas temporairement des copies de données
           dataType: 'json', //  Le type de données à recevoir, ici, du json
           success: function (result) {
               if (result.error) {
                   alert(result.error[0].message);
               } else {
                   if (requestType == 'POST')
                       alert('ID de la nouvelle entrée : ' + result.id);
                   articleManager.refreshSearch();
               }
           }
       });
   },

   deleteArticle: function () { 
       if (!confirm('Delete ?')) return;
        $.ajax({
           url: "https://server-rest-api.herokuapp.com/personnes/" + $('#id').val(), // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           type: "delete", // Le type de la requête HTTP,
           dataType: 'json', //  Le type de données à recevoir, ici, du json
           success: function (result) {
               if (result.error)
                   alert(result.error[0].message);
                else
                       articleManager.refreshSearch();
           }
   });

}
}

$(document).ready(function () {

   $('#articleListPanel, #articleDetailsPanel').hide();

   $('#findButton').click(function (e) {
       e.preventDefault();
       articleManager.showArticleList();
   })

   // $('#showDetailsButton').click(function (e) {
   //     e.preventDefault();
   //     personManager.showPersonDetails($('#personList').val());
   // })

   $('#backtoSearchButton').click(function (e) {
       e.preventDefault();
       articleManager.backtoSearch();
   })

   $('#newButton').click(function (e){
       e.preventDefault();
       articleManager.newArticle();
   })

   $('#saveButton').click(function (e){
       e.preventDefault();
       articleManager.saveArticle();
   })

   $('#deleteButton').click(function (e){
       e.preventDefault();
       articleManager.deleteArticle();
   })


})



// $(document).ready(function() {	   
//     $("#driver").click(function(event) {
//        $.getJSON('articles.json', function(article) {
//           $('#zoneAffichage').html('<li> <b>Nom:</b> ' + article.libelle + '</li>');
//           $('#zoneAffichage').append('<li><b>Age : </b>' + article.description1+ '</li>');
//           $('#zoneAffichage').append('<li><b> Genre: </b>' + article.description2+ '</li>');
//           $('#zoneAffichage').append('</br>');

//        });
//     });
        
//  });

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


// $(document).ready(function () {

//     $('#personListPanel, #personDetailsPanel').hide();
//     $(document).ready(function () {

//         $('#personListPanel, #personDetailsPanel').hide();

//         $('#findButton').click(function (e) {
//             e.preventDefault();
//             personManager.showPersonList();
//         })
//     });
// })