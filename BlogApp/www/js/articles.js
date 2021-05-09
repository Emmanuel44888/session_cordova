
// EB- Materialize Example
$(document).ready(function () {
    $('.materialboxed').materialbox();
});

//    EB - 





  var articleManager = {
   
    showArticleList: function () {
       $.ajax({
           // url: "https://server-rest-api.herokuapp.com/personnes/", // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           url: "http://localhost:5557/articles/",
           type: "GET", // Le type de la requête HTTP,
           cache: false, // n'enregistre pas temporairement des copies de données
           dataType : 'json', //  Le type de données à recevoir, ici, du json
           success: function (data) {
               console.log(data);
               $('#articleList li').remove();
               $.each(data, function (index, articles) {
                   // $('<li>')
                   $('<li>')
                //    .append("<div class='top_article_img'><a onclick=articleManager.showArticleDetails(" + article.id + ") target='_blank'><a></div>")
                       .text(articles.id + ' / ' + articles.libelle)
                       .attr('value', articles.id).appendTo($('#articleList'))
                       .append("<button onclick=\"articleManager.showArticleDetails(\'" + articles.id + "\');\" >Edit</button>")
                                      
                    ;

               });
            //    $('#articleListPanel').show();
           }
       });
   },
   showArticleDetails: function (id) { 
       if(id == null) return;
       $('#articleSearchPanel').hide();
       $.ajax({
           // url: "https://server-rest-api.herokuapp.com/personnes/" + id, // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           url: "http://localhost:5557/articles/" + id,
           type: "GET", // Le type de la requête HTTP,
           cache: false, // n'enregistre pas temporairement des copies de données
           dataType : 'json', //  Le type de données à recevoir, ici, du json
           success: function (articles) {
               console.log(articles);
               $('#articleDetailsPanel').show();
               $('#id').attr('value', articles.id);
               $('#libelle').attr('value', articles.libelle);
               $('#description1').attr('value', articles.description1); 
               $('#description2').attr('value', articles.description2);
               $('#img1').attr('src', articles.urlPhotoPr);
               $('#img2').attr('src', articles.urlPhotoDetail1);
               $('#img3').attr('src', articles.urlPhotoDetail2);
               $('#img4').attr('src', articles.urlPhotoDetail3);
               
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
           Libelle: $('#libelle').val(),
           description1: $('#description1').val(),
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
       $('#libelle').attr('value', 'New Article').focus().select();
       $('#description1').attr('value', 'New Article');

   },

   saveArticle: function () {
       if (!confirm('Save ?')) return false;
       var requestType = $('#id').val() != '' ? 'PUT' : 'POST';
       $.ajax({
           // url: "https://server-rest-api.herokuapp.com/personnes/" + $('#id').val(), // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           url: "http://localhost:5557/articles/" + $('#id').val(),
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
           // url: "https://server-rest-api.herokuapp.com/personnes/" + $('#id').val(), // La ressource ciblée, pour Android utiliser http://10.0.2.2:5556/personnes/
           url: "http://localhost:5557/articles/" + $('#id').val(),
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

