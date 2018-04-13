jQuery(document).ready(function(){

	localStorage.setItem('pT',2);

	//Select Country
	jQuery('.sCountry').change(function(){
		if(jQuery(this).val()!=0)
		{
			jQuery('.step_1').fadeOut();
			jQuery('.step_3').fadeOut();
			setTimeout(function(){
				jQuery('.step_2').fadeIn('slow');
				jQuery('.whr-to-buy .lsb ul li:nth-child(2)').addClass('active');
				jQuery('.whr-to-buy .lsb ul li:nth-child(2)').siblings('li').removeClass('active');
			},1000);
		}
	})
	
	//Click on Buy now
	jQuery('.byn').click(function(){
		jQuery('.step_1').fadeOut();
		jQuery('.step_2').fadeOut();
		jQuery(this).parent().parent('li').addClass('active');
		jQuery(this).parent().parent('li').siblings('li').removeClass('active');
		localStorage.setItem('pT',jQuery(this).attr('type'));
		setTimeout(function(){
			jQuery('.step_3').fadeIn('slow');
			jQuery('.whr-to-buy .lsb ul li:nth-child(3)').addClass('active');
			jQuery('.whr-to-buy .lsb ul li:nth-child(3)').siblings('li').removeClass('active');
			
			
				
			plotMap();
		},1000);

	})
	
	//Click on Back Buttton
	
	jQuery('.back_btn').click(function(){
		var link = jQuery(this).attr('link');
		if(link==1)
		{
			jQuery('.step_3').fadeOut();
			jQuery('.step_2').fadeOut();
			setTimeout(function(){
				jQuery('.step_1').fadeIn('slow');
				jQuery('.whr-to-buy .lsb ul li:nth-child(1)').addClass('active');
				jQuery('.whr-to-buy .lsb ul li:nth-child(1)').siblings('li').removeClass('active');
				plotMap();
			},1000);
		}else if(link==2){
			
			jQuery('.step_1').fadeOut();
			jQuery('.step_3').fadeOut();
			setTimeout(function(){
				jQuery('.step_2').fadeIn('slow');
				jQuery('.whr-to-buy .lsb ul li:nth-child(2)').addClass('active');
				jQuery('.whr-to-buy .lsb ul li:nth-child(2)').siblings('li').removeClass('active');
				//Address Table col height
				var max = -1;
				jQuery(".address-view .add-box .row-view .col").each(function() {
					var h = jQuery(this).height(); 
					max = h > max ? h : max;
				});
				jQuery(".address-view .add-box .row-view .col").height(max);
				
				
				
				plotMap();
				
				
				
			},1000);
		}
		
	})
	
	
	//Add Active class to meter
	jQuery('.whr-to-buy .main-view .step-container .list-product-view ul li').bind('click', function(){
		jQuery(this).addClass('active');
		jQuery(this).siblings('li').removeClass('active');
	})
	
	jQuery('.searchText').keyup(function(){
		setTimeout(function(){
			searchPlotMap(jQuery('.searchText').val());
		},1000);
		
	})
	
})

function plotMap(){
	var list ='<img src="/website/static/img/preloader.gif" style="margin:auto; left:0px;top:0px;bottom:0px;right:0px; position:absolute;">';
	jQuery('#map').css('position','relative').html(list);
	
	var apiUrl='http://m4yank.com/get-retailer-data/';
	// var tid = localStorage.getItem('pT');
	jQuery.ajax({
		url:apiUrl,
		type:'post',
		data:'q=select_data',
		dataType:'json',
		success: function(data){
			if(data){
				
				listMap(data);
			}
			
		
		}
	});
	

}
function searchPlotMap(str){
	var list ='<img src="/website/static/img/preloader.gif" style="margin:auto; left:0px;top:0px;bottom:0px;right:0px; position:absolute;">';
	jQuery('#map').html(list);
	
	var apiUrl='http://m4yank.com/get-search-retailer-data/';
	// var tid = localStorage.getItem('pT');
	jQuery.ajax({
		url:apiUrl,
		type:'post',
		data:'q=search_data&search_text='+str,
		dataType:'json',
		success: function(data){
			if(data){
				
				listMap(data);
			}
			
		
		}
	});
}


function listMap(locations){
	
    // Setup the different icons and shadows
	var cntr=1;
	
    //console.log(data);

   var icon = '/website/static/img/buy/map_pointer.png'
   
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: new google.maps.LatLng(locations[0].lat, locations[0].longi),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
     /* zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_BOTTOM
      }*/
    });

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 160
    });

    var markers = new Array();
    
    var iconCounter = 0;
   
    // Add the markers and infowindows to the map
	for (var i = 0; i < locations.length; i++) { 
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].longi),
        map: map,
        icon: icon
      });

      markers.push(marker);
  
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<h4 style="margin:0px;padding:0px;">'+locations[i].retailer+'</h4><br>'+locations[i].address);
          infowindow.open(map, marker);
        }
      })(marker, i));
      
      
    }

    function autoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      for (var i = 0; i < markers.length; i++) {  
				bounds.extend(markers[i].position);
      }
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }
    autoCenter();
	
	listAddress(locations);
}


function listAddress(data){
	var list ='';
	list +='<div class="row-view">';
	list +='	<div class="col name head">Name</div>';
	list +='	<div class="col street head">Street</div>';
	list +='	<div class="col city head">City</div>';
	list +='	<div class="col pc head">Product</div>';
	list +='</div>';
	jQuery.each(data, function(index){	
		list +='<div class="row-view">';
		list +='	<div class="col name">'+data[index].retailer+'</div>';
		list +='	<div class="col street">'+data[index].address+'</div>';
		list +='	<div class="col city">Hong Kong</div>';
		list +='	<div class="col pc">'+data[index].device+'</div>';
		list +='</div>';
	})
	
	jQuery("#listAddress").html(list);
	
	//Address Table col height
	var max = -1;
	jQuery(".address-view .add-box .row-view .col").each(function() {
		var h = jQuery(this).height(); 
		max = h > max ? h : max;
	});
	jQuery(".address-view .add-box .row-view .col").height(max);
	jQuery(window).resize(function(){
		var max = -1;
		jQuery(".address-view .add-box .row-view .col").each(function() {
			var h = jQuery(this).height(); 
			max = h > max ? h : max;
		});
		jQuery(".address-view .add-box .row-view .col").height(max);
	})
}