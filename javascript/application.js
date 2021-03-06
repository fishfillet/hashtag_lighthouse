// Business problem: grab instagram photos tagged with #lighthouse and display on an html page
$(function () {
    var slideshow = [];
    var index = 0;
    // Grab the photos
    $.ajax({
        method: 'GET',
        url: 'https://api.instagram.com/v1/tags/lighthouse/media/recent',
        data: {
            access_token: '204394431.b720569.7386e0037e8d40cd8ae094563e26a192'
        },
        dataType: 'jsonp',
        success: function (response) {
            for(var i = 0; i < response.data.length; i++) {
                slideshow.push(response.data[i]);   
            };
            slideShow(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("It didn't work. =(");
        }
    });

    function nextResults(response){
        $.ajax({
            method: 'GET',
            url: response.pagination.next_url,
            dataType: 'jsonp',
            success: function(response2){
                slideshow = [];
                index = 0;
                for(var i = 0; i < response2.data.length; i++) {
                    slideshow.push(response2.data[i]);   
                };
                slideShow(response2);
            }
        });  //end ajax                  
    }; //nexterustlstlst

    function slideShow(response){
        if (index > slideshow.length){
            nextResults(response);
        }else{
            index++;
            setTimeout(slideShow, 7000, response);
        }
        $('.show-image').fadeOut('slow', function(){
            $('.show-image').attr('src', slideshow[index].images.standard_resolution.url).fadeIn();
        });
        
        $('.show-caption').fadeOut('slow', function(){
            $('.show-caption').text(slideshow[index].caption.text).fadeIn();
        });
        
        $('.link-image').attr('href', slideshow[index].link)
    };
});



// .caption.text
// .images.standard_resolution.url)