import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){
  $("#search-btn").click(function(){
    const searchWord = $("#gif-search").val();
    $("#gif-search").val("");
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