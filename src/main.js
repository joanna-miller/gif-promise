import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){
  $("#search-btn").click(function(){
    const searchWord = $("#keyword").val();
    $("#display-random-gif").empty();
    $("#display-search-gif").empty();
    $(".footer").show();
  
    function getElements(response) {
      let embedLinks = response.data.map(function(elem) {
        return elem.embed_url;

      });
      for (let i=0; i <= 9; i ++){
        $("div#display-search-gif").append(`<iframe src="${embedLinks[i]}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
      }
    }

    if (searchWord === "") {
      $("#display-search-gif").append('<p>Please enter a keyword</p>');
      return undefined;
    }
    else {
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
    }
  });


  $("#random-btn").click(function(){
    const searchWord = $("#keyword").val();
    $("#display-random-gif").empty();
    $("#display-search-gif").empty();
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
      let link = response.data.embed_url;
      $("#display-random-gif").append(`<iframe src="${link}" width="480" height="303" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`);
    }
  });
});