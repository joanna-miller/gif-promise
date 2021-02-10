import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifSearch from './gif-search.js';

function clearFields() {
  $("#display-random-gif").empty();
  $("#display-search-gif").empty();
}

$(document).ready(function(){
  $("#search-btn").click(function(){
    const searchWord = $("#keyword").val();
    clearFields();
    let promise = GifSearch.search(searchWord);
    promise.then(function(response) {
      const body = JSON.parse(response); 
      let embedLinks = body.data.map(function(elem) {
        return elem.embed_url;
      });
      if (embedLinks.length !== 0) {
        for (let i=0; i <= 9; i ++) {
          $("#display-search-gif").append(`<iframe src="${embedLinks[i]}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
        }
      } else {
        $("#display-search-gif").append(`<p>Please enter a valid keyword.</p>`);
      }
    }, function() {      
      $("#display-search-gif").append(`<p>There was an error processing your request ${error}</p>`);
    })
  });  

    
  $("#random-btn").click(function(){
    const searchWord = $("#keyword").val();
    clearFields();
    let promise = GifSearch.random(searchWord);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $("#display-random-gif").append(`<iframe src="${body.data.embed_url}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
    });
  });

});