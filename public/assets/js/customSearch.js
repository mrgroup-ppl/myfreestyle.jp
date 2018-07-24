function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

$(document).ready(function () {
    $('.agplocal').click(function () {
        localStorage.setItem("popups", "hidepop")
    });
   
    var current_url = window.location.href;
    
    var add_url="";
    if(current_url.match(/agp/))
    {
        add_url="..";
    }
    else if(current_url.match(/products/))
    {
        add_url="..";
    }
    else if(current_url.match(/isf/))
    {
        add_url="..";
    }
    else if(current_url.match(/search/))
    {
        add_url = ".";
    }
    else
    {
        add_url=".";
    }

    if(current_url.match(/search/))
    {
        
        var keyword = getUrlVars()["keyword"];
        var jqxhr = $.getJSON( "assets/search.json", function(data) {
        var res=[];
        var htm = "";

            $.each(data, function(i, v) {
                searchregex = new RegExp(keyword);
                if (v.title.toLowerCase().match(searchregex)) {
                    
                    htm +='<div class="row singleResult">';
                    htm +='<div class="col-md-12">';
                    htm +='<h3><a href="'+add_url+v.url+'">'+v.title+'</a></h3>';
                    htm +='<p>'+v.content.substring(0, 100)+' </p>';
                    htm +='<a href="'+add_url+v.url+'">Read More</a>';
                    htm +='</div>';
                    htm +='</div>';       
                }
            });
            $("#searchResults").html(htm);
          })
            .fail(function() {
              console.log( "error" );
            })
       
    }
    var options = {
        url: add_url+"/assets/search.json",
        maxNumberOfElements:4,
        getValue: "title",
        highlightPhrase:true,
        placeholder:'Search',
        list: {
            match: {
                enabled: true
            }
        },
        template: {
            type: "custom",
            method: function(value, item) {
                var keyword = $("#desktopSearch").val();
                $('.provider-json').bind("enterKey",function(e){
                    window.location.href=add_url+"/search.html"+"?keyword="+keyword;
                    ga('send', 'event', 'Search', 'Searched For', 'Search', keyword);
                 });
                 $('.provider-json').keyup(function(e){
                     if(e.keyCode == 13)
                     {
                         $(this).trigger("enterKey");
                         ga('send', 'event', 'Search', 'Searched For', 'Search', keyword);
                     }
                     $("#searchButton").click(function(){
                        $('#desktopSearch').trigger("enterKey");
                        ga('send', 'event', 'Search', 'Searched For', 'Search', keyword);
                     });
                 });
                return "<a href='"+add_url+item.url+'?keyword='+keyword+"'>" + item.title + " </a>";
            }
        }
    };

    $(".provider-json").easyAutocomplete(options);
})