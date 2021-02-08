import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){
  $("#search-btn").click(function(){
    const searchWord = $("#keyword").val();
    $("#keyword").val("");
    $("#display-random-gif").empty();
    $(".footer").show();
  
    let request = new XMLHttpRequest();
    const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchWord}&limit=25&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    
    request.open("GET", urlSearch, true);
    request.send();
    
    function getElements(response) {
      let linksArray = response.data.map(function(elem) {
        return elem.images.original.url;
      });
      for (let i=0; i <linksArray.length; i ++){
      $("div#display-search-gif").append(`<img src=${linksArray[i]}>`);
      }
    }
  });





  $("#random-btn").click(function(){
    const searchWord = $("#keyword").val();
    $("#keyword").val("");
    $("#display-random-gif").empty();
    $(".footer").show();

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${searchWord}&rating=g`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    
    request.open("GET", url, true);
    request.send();
    
    function getElements(response) {
      let link = response.data.images.downsized_large.url;
      $("#display-random-gif").append(`<img src=${link}>`);
    }
  });
});