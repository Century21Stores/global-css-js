// MASTER SCRIPTING DEC 27 2016
// contact: jrios@c21stores.com

// NAVIGATION COLORS
$( "span:contains('Clearance')" ).css( "color", "#EA2C3B" );
$( "a:contains('Clearance')" ).css( "color", "#EA2C3B" );
$("body").on("mouseenter mouseleave", "a", function(){
$( "span:contains('Clearance')" ).css( "color", "#EA2C3B" );
});





var PROP65_POPUP = Object.freeze({
  "ceramic": '<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDIvMDUvMTUvMDQvNDMvNjAzL1BPUFVQNjVfY2VyYW1pYy5qcGciXV0/POPUP65_ceramic.jpg?sha=2b607f152ba38a35">',
  "crystal": '<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDIvMDUvMTUvMDQvMjgvOTkvUE9QVVA2NV9DUllTVEFMLmpwZyJdXQ/POPUP65_CRYSTAL.jpg?sha=35ab82a8daefe08e">',
  "handbags": '<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDIvMDUvMTUvMDQvMDkvODczL1BPUFVQNjVfaGFuZGJhZ3MuanBnIl1d/POPUP65_handbags.jpg?sha=efb6ea04a14cf6f1">',
  "handbags2": '<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDIvMDUvMTUvMDIvNTAvNzQvUE9QVVA2NV9oYW5kYmFnczIuanBnIl1d/POPUP65_handbags2.jpg?sha=63d2ccf67b9e2709">',
  "jewelry": '<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDIvMDUvMTQvNDIvMzgvMTM2L1BPUFVQNjVfamV3ZWxyeS5qcGciXV0/POPUP65_jewelry.jpg?sha=61f06fe3b29da5b2">',
  "wires": '<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDIvMDUvMTQvNDEvMTYvODk3L1BPUFVQNjVfd2lyZXMuanBnIl1d/POPUP65_wires.jpg?sha=cff7d8ef9acc6328">'
});
function prop65(popup){
  WEBLINC.dialog.create(PROP65_POPUP[popup], 
    {
      "uiDialogOptions": {
        "close": function(){
          $(".view").one("click", "a[data-prop65]", function(e){
            var key = $(e.target).data("prop65");
            prop65(key);
            e.preventDefault();
          });
        }
      }
    }
  );
}
$(".view").one("click", "a[data-prop65]", function(e){
  var key = $(e.target).data("prop65");
  prop65(key);
  e.preventDefault();
});

// PAGINATION FIX
    if ($('ul.pagination').length === 0){
      var count = $('.product-grid__cell').length;
      $('.browsing-controls--top').append('<ul class="pagination"><li class="pagination__node pagination__node--showing">' + count + ' items</li></ul>');
    }

// RELATED PRODUCTS
if ($(window).width() >= 1050) {
	// TO OPEN WIDGET
	$('.br-sf-widget-merchant-qv a').click(function() {
	    $('html, body').animate({
        	scrollTop: $(".br-rp-qv-show").offset().top
    	}, 500);
    	$('.page-footer').animate({paddingTop: '+=43%'},500);  	
	});

	// TO CLOSE WIDGET
	$('.br-sf-widget-merchant-popup-close a').click(function() {
    	$('html, body').animate({
	        scrollTop: $(".complimentary--bloomreach").offset().top
    	}, 500);
    	$('.page-footer').animate({paddingTop: '0'},500);  	    	
	});
}
// END RELATED PRODUCTS




//CLICKABLE IMAGES
$(document).ready(function(){

    $('.hero-content-block, .three-column-square-content-block__container, .large-square-plus-two-content-block__container--large-image, .large-square-plus-two-content-block__container--small-image, .large-square-plus-one-content-block__container--large-image, .two-column-square-content-block__container, .two-column-hero-content-block__container, .jm-image-clickable').each(function(){
       var new_data= $('a:first-of-type', this).clone();
       	new_data.attr("id", "jm_img_anchor");
       	new_data.removeAttr("class");	
    	new_data.appendTo(this);
    });

    $('.large-square-plus-one-content-block__text').each(function(){
       var new_data= $('a', this).clone();
       	new_data.attr("id", "jm_img_anchor2");
       	new_data.removeAttr("class");	
    	new_data.appendTo(this);
    });
   
});
//END CLICKABLE IMAGES


// ZERO SEARCH SCRIPT
var search = $('#header-search-form .value').children().val().toString().toLowerCase();
// search = search.filter(Boolean)

// HERE GOES THE ID of the Google Spreadsheet SUPPRESION LIST
var spreadsheetID = "1vbPtdgK7tCk7Nl14rDzzqsmMG2Ii5-WakBueCwAeuQE";
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
$.getJSON(url, function(data) { 
	var entry = data.feed.entry;
	var listArr = [];
	var listArr2 = [];
  
  	//PUSH DATA FROM 2 COLUMNS TO 2 ARRAYS 
  	$(entry).each(function(){
  		listArr.push(this.gsx$suppressed.$t.toLowerCase());
  		listArr2.push(this.gsx$suppressed2.$t.toLowerCase());
  	});
	
	//COMBINE BOTH ARRAYS INTO ONE SINGLE ARRAY
  	var listArrTotal = listArr.concat(listArr2);

  	// CLEAR EMPTY ITEMS
	listArr = listArr.filter(Boolean)
	listArr2 = listArr2.filter(Boolean)
	listArrTotal = listArrTotal.filter(Boolean)
	
	//console.log(search);	
  	//console.log(listArr);
  	//console.log(listArr2);
  	//console.log(listArrTotal);
	
	designerList();	
	function designerList(){
		for (var z=0; z < search.length; z++){

	 		if(arrayContains(listArrTotal, search)){
				$('.page-content__wrapper').hide("fast");
				$('.page-content').prepend(
					'<div id="result">'+
					'</div>'
				);
				$( "#result" ).load( "/pages/zero-search" );
				break;				
			}	
		}

	 	if (window.location.href.indexOf("categories") > -1){
	 		cat_Name = $('.view h1').html().toLowerCase();
	 		console.log("Category Name: " + cat_Name);
			for (var z=0; z < listArrTotal.length; z++){				
				if(arrayContains(listArrTotal, cat_Name)){
					console.log("search found!");
// 					$('.page-content__wrapper').hide("fast");
// 					$('.page-content').prepend(
// 						'<div id="result">'+
// 						'</div>'
// 					);
// 					$( "#result" ).load( "/pages/zero-search" );
// 					break;				
				}
			}
		}
		function build_ZeroResultPage(){
		
		}
		
	}
});
 
function arrayContains(a, obj) {
    for (var i = 0; i < a.length; i++) {
//         if (a[i] === obj) {
//             return true;
//         }
        if (obj.includes(a[i])) {
            return true;
        }

    }
    return false;
}
// END ZERO SEARCH SCRIPT






//SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 SORTING 1 

function allSortingSizes(){


$('.size-options__size-group').each(function() {


	// ADDING ID TO NON NUMBERS SIZES
	$(this).find('.size-options__size-label').each(function() {

    	var currentElement = $(this);
	    var value = currentElement.html();

		if(value.indexOf("XS") >= 0){
			$(currentElement).closest('li').attr('id', '2ws');    
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));			
		}
		else if(value == "SM"){
			$(currentElement).closest('li').attr('id', '3ws');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));			
		}
		else if(value == "MED"){
			$(currentElement).closest('li').attr('id', '4ws');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));			
		}
		else if(value == "LRG"){
			$(currentElement).closest('li').attr('id', '5ws');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));			
		}
		else if(value == "XL"){
			$(currentElement).closest('li').attr('id', '6ws');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));			
		}
		else if(value == "XXL"){
			$(currentElement).closest('li').attr('id', '7ws');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));			
		}
		else if(value == "3XL"){
			$(currentElement).closest('li').attr('id', '8ws');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}
		else if(value == "A"){
			$(currentElement).closest('li').attr('id', '1A');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		
		else if(value == "B"){
			$(currentElement).closest('li').attr('id', '2B');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		
		else if(value == "C"){
			$(currentElement).closest('li').attr('id', '3C');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		
		else if(value == "D"){
			$(currentElement).closest('li').attr('id', '4D');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		
		else if(value == "E"){
			$(currentElement).closest('li').attr('id', '5E');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		
		else if(value == "F"){
			$(currentElement).closest('li').attr('id', '6F');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		
		else if(value == "G"){
			$(currentElement).closest('li').attr('id', '7G');
			//console.log(value);console.log($(currentElement).closest('li').attr("id"));
		}		

		else if(value.indexOf("SHORT") >= 0){
			//console.log(value);
			caldo = value.replace("SHORT", "1");
			caldoTrim = caldo.replace(/\s/g, '');
			//console.log(caldoTrim);
			$(currentElement).closest('li').attr('id', caldoTrim);
			
		}		
		else if(value.indexOf("REG") >= 0){
			//console.log(value);
			caldo = value.replace("REG", "2");
			caldoTrim = caldo.replace(/\s/g, '');
			//console.log(caldoTrim);			
			$(currentElement).closest('li').attr('id', caldoTrim);
			
		}		
		else if(value.indexOf("LONG") >= 0){
			//console.log(value);
			caldo = value.replace("LONG", "3");
			caldoTrim = caldo.replace(/\s/g, '');
			//console.log(caldoTrim);
			$(currentElement).closest('li').attr('id', caldoTrim);
			
		}		
	
	});

	sortWeirdSizes(this);
	sortingSizes(this);	
	
});

//NON NUMBERS SORTING SIZES
function sortWeirdSizes(weirdList){

	$(weirdList).find('li').sort(function (a, b) {
	    return parseFloat(a.id) > parseFloat(b.id);
	}).each(function () {
    	var elem = $(this);
	    elem.remove();
    	$(elem).appendTo(weirdList);
	});
	
}


//NUMBERS SORTING SIZES
function sortingSizes(numberSizes) {

	$(numberSizes).each(function() {

		$(this).find('.size-options__size-label').each(function() {
	    	var currentElement = $(this);
	    	var value = currentElement.html();
	    	var newvalue = value.replace(/\s{2,}/g, ' ');
		    $(currentElement).closest('li').attr('id', value);
		    //console.log(newvalue); 
		});
	
		sortingTheList(this);
	
	});


	//SORTING
	function sortingTheList(listToSort){
		//console.log(listToSort);
		var itemsList = $(listToSort).children();
		//console.log(itemsList);

		itemsList.sort(function (a, b) {
    		return parseFloat(a.id) > parseFloat(b.id);
		}).each(function () {
    		var elem = $(this);
	    	elem.remove();
	    	$(elem).appendTo(listToSort);
		});
	}


}sortingSizes();



}allSortingSizes();

$(document).on( 'click', '.product-summary__quickview a, .color-options__color-button', function(){
	setTimeout(function() {   //calls click event after a certain time
	   	allSortingSizes();
	}, 1000);
	

});

// END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1 END SORTING 1




// FIX MASTER COLLECTION SIZES
function SizeMasterEliminator(){
$('.product-detail-container--package .product-detail-container__child-product').each(function() {
	var packageproduct = $(this).find('.size-options__size-group');
	var countChildren = packageproduct.children().length;
	//console.log('Debugging Master Collections - Package Product Detail:');
	//console.log(packageproduct);
	//console.log(countChildren);	
	if (countChildren == 1){
		var parentOfsingle = packageproduct.parent()
		//console.log(parentOfsingle.find('.size-options__size-header'))
		$('.size-options__size-header').hide();
		//$(parentOfsingle).hide();
		$('.product-details--package-child').addClass('jm-breath-children');
	}
});
}SizeMasterEliminator();
// END FIX MASTER COLLECTION SIZES


// FIX MASTER COLLECTION IMAGES
function imagesMasterPages(){

$('.product-detail-container--package .product-detail-container__child-product').each(function() {
	
	var imageAnchor = $(this).find('.product-details__media').find('.product-details__primary-image:first').find('.product-details__primary-image-button').attr('href');;
	console.log('working!!!');
	console.log(imageAnchor);
	$(this).find('.product-details__media').find('.product-details__primary-image:first').append('<a class="jm-anchor-package" href="' + imageAnchor + '"></a>');

}); 

}imagesMasterPages();
// END FIX MASTER COLLECTION IMAGES


// SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - 


function allSortingMASTERSizes(){


$( "div.product-detail-container__child-product" ).wrapAll( '<div class="jm_sorted_products"></div>');
var soldOutPack = $('.product-detail-container--package .product-details__sold-out').closest('div .product-detail-container__child-product');
soldOutPack.hide();

$('.product-detail-container--package .jm_sorted_products').each(function() {

	// ADDING ID TO NON NUMBERS SIZES
	$(this).find('.size-options__size-label').each(function() {
		console.log(this);
    	var currentElement = $(this);
	    var value = currentElement.html();

		if(value.indexOf("TWIN") >= 0){
			$(currentElement).closest('div.product-detail-container__child-product').attr('data-sort', '1home');    
			//console.log('M' + value);console.log('M' + $(currentElement).closest('div.product-detail-container__child-product').attr("data-sort"));			
		}
		else if(value.indexOf("F/QN") >= 0){
			$(currentElement).closest('div.product-detail-container__child-product').attr('data-sort', '2home');    
			//console.log('M' + value);console.log('M' + $(currentElement).closest('div.product-detail-container__child-product').attr("data-sort"));			
		}
		else if(value.indexOf("QUEEN") >= 0){
			$(currentElement).closest('div.product-detail-container__child-product').attr('data-sort', '3home');
			//console.log('M' + value);console.log('M' + $(currentElement).closest('div.product-detail-container__child-product').attr("data-sort"));			
		}		
		else if(value.indexOf("KING") >= 0){
			$(currentElement).closest('div.product-detail-container__child-product').attr('data-sort', '4home');    
			//console.log('M' + value);console.log('M' + $(currentElement).closest('div.product-detail-container__child-product').attr("data-sort"));			
		}	
	
	});

	//sortMasterWeirdSizes(this);
// 	console.log('veritas' + this);
// 	sortingSizes(this);	
	
});



//NON NUMBERS SORTING SIZES
function sortMasterWeirdSizes(weirdList){


	$(weirdList).find('div.product-detail-container__child-product').sort(function (a, b) {
	    return parseFloat($(a).attr('data-sort')) > parseFloat($(b).attr('data-sort'));
	}).each(function () {
    	var elem = $(this);
	    elem.remove();
    	$(elem).appendTo(weirdList);
	});

	
}


}allSortingMASTERSizes();

// $(document).on( 'click', '.product-summary__quickview a', function(){
// 	setTimeout(function() {   //calls click event after a certain time
// 	   	allSortingSizes();
// 		console.log('gua gua guacamole!');
// 	}, 1000);
// 	
// 
// });

// END SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - SORTING MASTER - 




// MULTIPLE GRID AD BANNERS FOR W32 REFRESH

// CREATING BROWSE GRID BANNERS BASED ON LOCATION -- CREATING BROWSE GRID BANNERS BASED ON LOCATION -- CREATING BROWSE GRID BANNERS BASED ON LOCATION -- CREATING BROWSE GRID BANNERS BASED ON LOCATION -- 
$(window).load(function() {
	var jm_p = $('.breadcrumbs__node-group span:nth-of-type(2) a');
	var jm_p3 = $('.breadcrumbs__node-group span:nth-of-type(3)');	
	var jm_cat = jm_p.html();
	var jm_cat3 = jm_p3.html();	
	var urlEshoes = (
		(window.location.href.indexOf("arrivals") > -1) ||
		(window.location.href.indexOf("under") > -1) ||
		(window.location.href.indexOf("edit") > -1) ||		
		(window.location.href.indexOf("italian") > -1) ||
		(window.location.href.indexOf("rain") > -1) ||		
		(window.location.href.indexOf("luxury") > -1) ||
		(window.location.href.indexOf("40abvw") > -1) || //Bottega
		(window.location.href.indexOf("40afrw") > -1) || // Russo
		(window.location.href.indexOf("40ajcw") > -1) || //Jimmy
		(window.location.href.indexOf("pajar") > -1)//Pajar
	);
	var urlEhandbags = (
		(window.location.href.indexOf("arrivals") > -1) ||
		(window.location.href.indexOf("shop") > -1) ||
		(window.location.href.indexOf("luxury") > -1) ||		
		(window.location.href.indexOf("edit") > -1) ||
		(window.location.href.indexOf("fur") > -1) ||		
		(window.location.href.indexOf("vintage") > -1) ||
		(window.location.href.indexOf("40ainw") > -1) || //Invicta
		(window.location.href.indexOf("40ajsw") > -1) || //Sander
		(window.location.href.indexOf("40amiw") > -1) || //Missoni
		(window.location.href.indexOf("40amow") > -1) //Moschino
	);	
	var urlEkids = (
		(window.location.href.indexOf("arrivals") > -1) ||
		(window.location.href.indexOf("gifts") > -1) ||
		(window.location.href.indexOf("essentials") > -1) ||		
		(window.location.href.indexOf("shop") > -1) ||
		(window.location.href.indexOf("occasion") > -1) ||		
		(window.location.href.indexOf("disney") > -1) ||	
		(window.location.href.indexOf("toys") > -1)
	);
	var urlEmens = (
		(window.location.href.indexOf("arrivals") > -1) ||
		(window.location.href.indexOf("shop") > -1) ||
		(window.location.href.indexOf("street") > -1) ||		
		(window.location.href.indexOf("40aalm") > -1) || //Altea
		(window.location.href.indexOf("40agnm") > -1) || //Ganesh
		(window.location.href.indexOf("40ainm") > -1) || //Invicta
		(window.location.href.indexOf("40ajvm") > -1) || //Varvatos
		(window.location.href.indexOf("40almm") > -1) || //Moschino
		(window.location.href.indexOf("40amtm") > -1) || //Missoni Ties
		(window.location.href.indexOf("40amsm") > -1) || //Missoni More		
		(window.location.href.indexOf("40avrm") > -1) || //Versace
		(window.location.href.indexOf("38ajgm") > -1)//Will		
	);
	var urlEcontemporary = (
		(window.location.href.indexOf("arrivals") > -1) ||
		(window.location.href.indexOf("shop") > -1) ||
		(window.location.href.indexOf("italian") > -1) ||				
		(window.location.href.indexOf("chic") > -1) ||
		(window.location.href.indexOf("edit") > -1) ||		 
		(window.location.href.indexOf("shoulder") > -1)
	);		
	var urlEmwomens = (
		(window.location.href.indexOf("arrivals") > -1) ||
		(window.location.href.indexOf("club") > -1) ||
		(window.location.href.indexOf("shop") > -1) ||		
		(window.location.href.indexOf("salon") > -1) || 
		(window.location.href.indexOf("40asvw") > -1) || //DSquared
		(window.location.href.indexOf("40almw") > -1) || // Moschino
		(window.location.href.indexOf("40amaw") > -1) || //Scotch
		(window.location.href.indexOf("40adkw") > -1) || //Raoul
		(window.location.href.indexOf("40assw") > -1) //Samantha
	);
	var urlEhome = (
		(window.location.href.indexOf("essentials") > -1) ||
		(window.location.href.indexOf("holiday") > -1) ||
		(window.location.href.indexOf("seasonal") > -1) ||		
		(window.location.href.indexOf("prep") > -1) || 
		(window.location.href.indexOf("40ahbh") > -1) || //BOSS
		(window.location.href.indexOf("39agdh") > -1) || // Godinger
		(window.location.href.indexOf("38afbh") > -1)//Adler
	);
	var urlEspecial = (
		(window.location.href.indexOf("clearance") > -1)
	);	

					
 	//console.log(urlEshoes);

	if(jm_cat === "Tech"){
		if(!urlEspecial){
			clearanceGA();
		}	
	}
	else if(jm_cat === "New + Now"){
		if(!urlEspecial){
			clearanceGA();
		}		
	}
	else if(jm_cat === "Beauty"){
		if(!urlEspecial){
			clearanceGA();
		}
	}
	else if(jm_cat === "Shoes"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();		
// 		if(!urlEshoes){
// 			BootsGA();
// 		}		
	}
	else if(jm_cat === "Handbags &amp; Accessories"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();		
// 		if(!urlEhandbags){
// 			accessoriesFurShopGA();
// 		}
	}			
	else if(jm_cat === "Kids"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();		
// 		if(!urlEkids){
// 			coldWeatherGA();
// 		}				
	}
	else if(jm_cat === "Contemporary"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();		
// 		if(!urlEcontemporary){
// 			contemporaryFurGA();
// 		}
	}
	else if(jm_cat === "Women"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();		
// 		if(!urlEmwomens){
// 			womensFurGA();
// 		}		
	}
	else if(jm_cat === "Men"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();				
	}
	else if(jm_cat === "Home"){
		if(!urlEspecial){
			clearanceGA();
		}
// 		giftsCardsGA();		
// 		if(!urlEhome){
// 			homedecorGA();
// 		}
	}
	else if(jm_cat === "Clearance"){
// 		giftsCardsGA2();
	}	

	else{
		return false;
	}


	fixingHeights();

});





// GIFTS CARDS GRID AD BANNER
function giftsCardsGA() {

	//GRID AD TYPE:  enter 1 or 2
	var gaType = 1;
	//POSITION
	var pos = 14;
	//IMAGE URL 370x552
	var urlIMG = "https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTEvMTcvMTUvMDQvMjAvNTkyLzExV2VlazRfQkdfR2lmdENhcmQuanBnIl1d/11Week4_BG_GiftCard.jpg?sha=affce9ca49929153";
	//LINK TEXT
	var textLink = "SHOP NOW";
	//LINK URL
	var urlLINK = "https://www.c21stores.com/categories/gift-card";
	
	// WHEN FINISH RESIZING WINDOWS MATCH HEIGHT
	var FixHeights;
	var realPos = pos-1;
	window.onresize = function(e) {
    	clearTimeout(FixHeights);
    	FixHeights = setTimeout(function() {
		// console.log('yay it works!');
		AdClassAll_Single(realPos, gaType);
    	}, 100);
	};

	$('.product-grid li:nth-of-type('+ realPos +')').after(
		'<li class="product-grid__cell product-grid__cell--' + gaType + ' jmrv-product-grid__cell--' + gaType + '">'+
		'<div class="product-grid-content-block" style="background-image: url('+ urlIMG +');">'+
		'<div class="product-grid-content-block__image"></div>'+
		'<div class="content-block-content content-block-content--center content-block-content--bottom">'+
		'<div class="content-block-content__container content-block-content__container--center">'+
		'<div class="content-block-content__message content-block-content__message--light">'+
		'<p class="content-block-content__action content-block-content__action--button"><a class="button button--alt button--wide button--large" href="'+ urlLINK + '">' + textLink + '</a></p>' +
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</li>'
	);
	
	AdClassAll_Single(realPos, gaType);

}
// END GIFTS CARDS GRID AD BANNER


// GIFTS CARDS GRID AD BANNER
function giftsCardsGA2() {

	//GRID AD TYPE:  enter 1 or 2
	var gaType = 1;
	//POSITION
	var pos = 30;
	//IMAGE URL 370x552
	var urlIMG = "https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTEvMTcvMTUvMDQvMjAvNTkyLzExV2VlazRfQkdfR2lmdENhcmQuanBnIl1d/11Week4_BG_GiftCard.jpg?sha=affce9ca49929153";
	//LINK TEXT
	var textLink = "SHOP NOW";
	//LINK URL
	var urlLINK = "https://www.c21stores.com/categories/gift-card";
	
	// WHEN FINISH RESIZING WINDOWS MATCH HEIGHT
	var FixHeights;
	var realPos = pos-1;
	window.onresize = function(e) {
    	clearTimeout(FixHeights);
    	FixHeights = setTimeout(function() {
		// console.log('yay it works!');
		AdClassAll_Single(realPos, gaType);
    	}, 100);
	};

	$('.product-grid li:nth-of-type('+ realPos +')').after(
		'<li class="product-grid__cell product-grid__cell--' + gaType + ' jmrv-product-grid__cell--' + gaType + '">'+
		'<div class="product-grid-content-block" style="background-image: url('+ urlIMG +');">'+
		'<div class="product-grid-content-block__image"></div>'+
		'<div class="content-block-content content-block-content--center content-block-content--bottom">'+
		'<div class="content-block-content__container content-block-content__container--center">'+
		'<div class="content-block-content__message content-block-content__message--light">'+
		'<p class="content-block-content__action content-block-content__action--button"><a class="button button--alt button--wide button--large" href="'+ urlLINK + '">' + textLink + '</a></p>' +
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</li>'
	);
	
	AdClassAll_Single(realPos, gaType);

}
// END GIFTS CARDS GRID AD BANNER


// CLEARANCE GRID AD BANNER
function clearanceGA() {

	//GRID AD TYPE:  enter 1 or 2
	var gaType = 1;
	//POSITION
	var pos = 29;
	//IMAGE URL 370x552
	var urlIMG = "https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTIvMjMvMTIvMDMvMTMvMjIvMDFfMTJXZWVrNV9CR19jbGVhcmFuY2UuanBnIl1d/01_12Week5_BG_clearance.jpg?sha=7de0ffeb8fed6cc7";
	//LINK TEXT
	var textLink = "SHOP NOW";
	//LINK URL
	var urlLINK = "https://www.c21stores.com/pages/clearance";
	
	// WHEN FINISH RESIZING WINDOWS MATCH HEIGHT
	var FixHeights;
	var realPos = pos-1;
	window.onresize = function(e) {
    	clearTimeout(FixHeights);
    	FixHeights = setTimeout(function() {
		// console.log('yay it works!');
		AdClassAll_Single(realPos, gaType);
    	}, 100);
	};

	$('.product-grid li:nth-of-type('+ realPos +')').after(
		'<li class="product-grid__cell product-grid__cell--' + gaType + ' jmrv-product-grid__cell--' + gaType + '">'+
		'<div class="product-grid-content-block" style="background-image: url('+ urlIMG +');">'+
		'<div class="product-grid-content-block__image"></div>'+
		'<div class="content-block-content content-block-content--center content-block-content--bottom">'+
		'<div class="content-block-content__container content-block-content__container--center">'+
		'<div class="content-block-content__message content-block-content__message--light">'+
		'<p class="content-block-content__action content-block-content__action--button"><a class="button button--alt-inverse button--wide button--large" href="'+ urlLINK + '">' + textLink + '</a></p>' +
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</li>'
	);
	
	AdClassAll_Single(realPos, gaType);

}
// END CLEARANCE GRID AD BANNER


// ACQUISITION GRID AD BANNER
function acquisitionGA() {

	//GRID AD TYPE:  enter 1 or 2
	var gaType = 1;
	//POSITION
	var pos = 46;
	//IMAGE URL 370x552
	var urlIMG = "https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTAvMDYvMTYvMDAvNDQvMTUyLzA5V2VlazRfUExDQ19HcmlkX0lNRy5qcGciXV0/09Week4_PLCC_Grid_IMG.jpg?sha=db1dd8d42c58d407";
	//LINK TEXT
	var textLink = "LEARN MORE";
	//LINK URL
	var urlLINK = "https://www.c21stores.com/instant_credit";
	
	// WHEN FINISH RESIZING WINDOWS MATCH HEIGHT
	var FixHeights;
	var realPos = pos-1;
	window.onresize = function(e) {
    	clearTimeout(FixHeights);
    	FixHeights = setTimeout(function() {
		// console.log('yay it works!');
		AdClassAll_Single(realPos, gaType);
    	}, 100);
	};


	var $GridAd = $('.product-grid li:nth-of-type(3)');
	
	$('.product-grid li:nth-of-type('+ realPos +')').after(
		'<li class="product-grid__cell product-grid__cell--' + gaType + ' jmrv-product-grid__cell--' + gaType + '">'+
		'<div class="product-grid-content-block" style="background-image: url('+ urlIMG +');">'+
		'<div class="product-grid-content-block__image"></div>'+
		'<div class="content-block-content content-block-content--center content-block-content--bottom">'+
		'<div class="content-block-content__container content-block-content__container--center">'+
		'<div class="content-block-content__message content-block-content__message--dark">'+
		'<p class="content-block-content__action content-block-content__action--button"><a class="button button--alt button--wide" href="'+ urlLINK + '">' + textLink + '</a></p>' +
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</li>'
	);

	AdClassAll_Single(realPos, gaType);

}
// END ACQUISITION GRID AD BANNER


// RETENTION GRID AD BANNER
function retentionGA() {

	//GRID AD TYPE:  enter 1 or 2
	var gaType = 1;
	//POSITION
	var pos = 46;
	//IMAGE URL 370x552
	var urlIMG = "https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDkvMTQvMTYvMjkvMTkvNzc3LzA5V2VlazRfUExDQ19HcmlkX1JldGVudGlvbjIuanBnIl1d/09Week4_PLCC_Grid_Retention2.jpg?sha=68c4450c40899332";
	//LINK TEXT
	var textLink = "LEARN MORE";
	//LINK URL
	var urlLINK = "https://www.c21stores.com/instant_credit";
	
	// WHEN FINISH RESIZING WINDOWS MATCH HEIGHT
	var FixHeights;
	var realPos = pos-1;
	window.onresize = function(e) {
    	clearTimeout(FixHeights);
    	FixHeights = setTimeout(function() {
		// console.log('yay it works!');
		AdClassAll_Single(realPos, gaType);
    	}, 100);
	};

	$('.product-grid li:nth-of-type('+ realPos +')').after(
		'<li class="product-grid__cell product-grid__cell--' + gaType + ' jmrv-product-grid__cell--' + gaType + '">'+
		'<div class="product-grid-content-block" style="background-image: url('+ urlIMG +');">'+
		'<div class="product-grid-content-block__image"></div>'+
		'<div class="content-block-content content-block-content--center content-block-content--bottom">'+
		'<div class="content-block-content__container content-block-content__container--center">'+
		'<div class="content-block-content__message content-block-content__message--dark">'+
		// '<p class="content-block-content__action content-block-content__action--button"><a class="button button--alt button--wide" href="'+ urlLINK + '">' + textLink + '</a></p>' +
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</li>'
	);
	
	AdClassAll_Single(realPos, gaType);

}
// END RETENTION GRID AD BANNER

// RESIZING GRID ADS
	function AdClassAll_Single(realPos, gaType){
	setTimeout(function(){
		var newHeight1 = $('.product-grid li:nth-of-type('+ (realPos + 2) + ')').height();
		//console.log($('.product-grid li:nth-of-type('+ (realPos + 2) + ')'));
		//console.log($('.product-grid li:nth-of-type(3)'));		
		$('.jmrv-product-grid__cell--'+ gaType).height(newHeight1);
	},1500);			
	}	
// END RESIZING GRID ADS


// PROMOTIONAL DISCOUNTS HELPFUL MESSAGE

// 	var testing123 = $('.cart-prices__value span').parent().parent().children('.cart-prices__label');
// 	console.log(testing123);
// 
// // 	$('.cart-prices__label').eq(1).html(function(){
// 	$(testing123).html(function(){		
// 		console.log(this);
// 		var promotion_message = $(this).html();
// 		console.log('Promotion message: ' + promotion_message);
// 		$('.cart-prices__label').each(function(i) {
// 			filtered_promotion_message = promotion_message.match(/\{([^}]+)\}/)[1];
// 		});	
// 		var new_promotion_message = promotion_message.replace("{", " ").replace("}", " ").replace(filtered_promotion_message, " ");	
// 
// 		//console.log('Promotion message: ' + promotion_message);
// 		//console.log('Filtered promotion message: ' + filtered_promotion_message);	
// 		//console.log('New promotion message: ' + new_promotion_message);			
// 
// 
// 	    return $(this).html().replace(promotion_message, new_promotion_message);
// 	});








// HEIGHT PRODUCT GRID EVEN
function fixingHeights(){
	setTimeout(function(){  
		var gridAds	= [];
		$("ul.product-grid").children().each(function(){
			gridAds.push($(this).height());
		// 	console.log("this is: " + $(this).outerHeight(true));
		});
		console.log(gridAds);
		var maxHeight = Math.max.apply(Math, gridAds);
		console.log(maxHeight);
		
		$('.product-grid__cell').css('height',maxHeight);
		
	}, 1000);
}

	


//AUDIO UGLY SWEATERS

function uglySweaters(){

	if(window.location.href.indexOf("https://www.c21stores.com/products/reindeer-holiday-sound-sweater") > -1){
		//$('.product-details__sub-section--description').append(
		//'<audio controls>'+
		//	'<source src="horse.ogg" type="audio/ogg">'+
		//	'<source src="horse.mp3" type="audio/mpeg">'+
		//	'Your browser does not support the audio element.'+
		//'</audio>'
		//);
	}
	else if(window.location.href.indexOf("https://www.c21stores.com/products/elf-dj-holiday-sweater") > -1){
		$('.product-details__sub-section--description').append(
		'<audio controls>'+
	//		'<source src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTEvMDEvMTUvNDgvMzAvNDAyLzI0NzVfMDQ1Ny5tcDMiXV0/2475-0457.mp3?sha=e61c6cd697fad8e8" type="audio/ogg">'+
			'<source src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTEvMDEvMTUvNDgvMzAvNDAyLzI0NzVfMDQ1Ny5tcDMiXV0/2475-0457.mp3?sha=e61c6cd697fad8e8" type="audio/mpeg">'+
			'Your browser does not support the audio element.'+
		'</audio>'
		);
	}

}uglySweaters();


$(window).load(function() {

function uniqueClasses(){

// 	setTimeout(function(){
		$(".primary-nav__item-node, .primary-nav__nav-menu").hover(function(){
		
			$('.primary-nav__nav-menu').each(function() {
				// ADDING ID NAVIGATION
				$(this).find('.primary-nav__item-node, span').each(function() {

					var currentElement = $(this);
					var value = currentElement.html();
					var classValue = value.replace(/[^A-Z0-9]/ig, "");
// 					console.log(value);
// 					console.log(classValue);
					$(currentElement).addClass(classValue);    
				});
			});
		});
		
		$('.secondary-nav__nav-menu').each(function() {
			// ADDING ID NAVIGATION
			$(this).find('.secondary-nav__item-node, span').each(function() {

				var currentElement = $(this);
				var value = currentElement.html();
				var classValue = value.replace(/[^A-Z0-9]/ig, "");
// 				console.log(value);
// 				console.log(classValue);
				$(currentElement).addClass(classValue);    
			
			});
		});
// 
// 	},1000);

}uniqueClasses();
	
});


function bannersMassive(){
	if((window.location.href.indexOf("cyber") > -1) && (window.location.href.indexOf("categories") > -1)){
		console.log('banner Category');
		$('.banner-content-block__large-image-container').css('background-image','url("https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTEvMjIvMTQvMjcvMzMvNzA5LzEyV2VlazFfQkJfQ3liZXIuanBnIl1d/12Week1_BB_Cyber.jpg?sha=a6bdf454a6ec6b1c")');
	}
	else{
		return false;
	}
}bannersMassive();


// 
// 
// $(window).load(function() {
// function pdpVideos(){
// 
// 	var jewelr_Pull_PI = $('.product-details__id span').text();
// // 	console.log(jewelr_Pull_PI);
// 	var listVideoJewelry = [
// 		'6612-0977',
// 		'6612-1699',
// 		'6612-4222',
// 		'6613-0860',
// 		'6613-4030',
// 		'6613-9439',
// 		'6614-0477', 
// 		'6614-0557', 
// 		'6614-1271', 
// 		'6614-0254', 
// 		'6614-6784', 
// 		'6614-5188', 
// 		'6614-1106', 
// 		'6614-0251', 
// 		'6614-2717', 
// 		'6614-8996'		
// 		];
// // 	console.log(listVideoJewelry);
// 
// 
// 	if(listVideoJewelry.includes(jewelr_Pull_PI)){
// 
// 
// 	console.log('Video');
// 	function createVideo(){
// 		$('.product-details__media').prepend(
// 			'<figure id="playJV" style="position: absolute; bottom: 0%; z-index: 999; text-align: center; width: 100%;"><a href="#1" style="display: block;width: 7%;margin: 0 48% -2% auto;">'+
// 			'<img src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTEvMjgvMTYvMzEvMjIvNTMzL3BsYXlidXR0b25fR3JleS5wbmciXV0/playbutton-Grey.png?sha=86cbf51c7b342695"/>'+			
// 			'</a></figure>' +
// 			'<div class="jm_dark_lightBox" id="jm_dark_lightBox" style="display:none;">'+
// 			'<iframe style="position: relative; z-index: 99;" class="JewelryVideo" id="JewelryVideo" width="560" height="315" src="https://www.youtube.com/embed/UhdpwZAc0Yk?modestbranding=1&enablejsapi=1&amp;rel=0&amp;controls=0&amp;showinfo=0&amp;disablekb=1&amp;iv_load_policy=3&amp;nologo=1&amp;ps=docs&amp;showsearch=0" frameborder="0" allowfullscreen></iframe>'+
// 			'<figure class="jm_lightbox_X" style="opacity: 0.6;">'+
// 			'<img style="width: 38px; margin: 0 auto; display: block;" src="https://c21stores-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMTIvMDEvMTQvMDMvMzQvNDQ3L3BsYXllcl9zdG9wX3ZpZGVvX2J1dHRvbi5wbmciXV0/player-stop-video-button.png?sha=bf4dc632096fa32b"/>'+			
// 			'</figure>'+
// 			'<a id="stopJV" class="jm_dark_lightBox_X"></a>'+			
// 			'</div>'			
// 		);
// 	}createVideo();
// 
// 
// 	function videoControl(action){ 
// 		var $playerWindow = $('#JewelryVideo')[0].contentWindow;
// 		$playerWindow.postMessage('{"event":"command","func":"'+action+'","args":""}', '*');
// 	}
// 
// 
// 	function togglitoPDPVideo(){
// 		$("#playJV").click(function(){
// 			$(".jm_dark_lightBox").fadeToggle(1300).css('display','flex').css('display','-ms-flexbox').css('display','-webkit-flex');
// 		　　videoControl("playVideo"); 
// 		});
// 						
// 	}togglitoPDPVideo();
// 	function togglitoPDPVideoOUT(){
// 		$("#stopJV").click(function(){
// 			$(".jm_dark_lightBox").fadeToggle(1300).css('display','flex').css('display','-ms-flexbox').css('display','-webkit-flex');
// 		　　videoControl("stopVideo");
// 		});
// 						
// 	}togglitoPDPVideoOUT();	
// 
// 
// 
// };
// 
// 
// 	
// }pdpVideos();
// 
// });
// 
// 







//QUANITY ADDING NUMBERS
// function quantityMore(){
// 
// 	if((window.location.href.indexOf("https://www.c21stores.com/products/7-piece-beauty-collection-tote-bag-set") > -1) || (window.location.href.indexOf("https://www.c21stores.com/cart") > -1)){
// 		console.log("hello hello hello is there anybody in there");
// 		$('#quantitycatalog_product_9539-9049000').append(
// 			'<option value="13">13</option>'
// 		);	
// 	}
// 
// }quantityMore();

//TEST COROMETRICS
// $( document ).ready(function() {
// 	$('.br-sf-widget a').attr('name','BR_related_products').attr('categoryID','BR_related_productsID');
// 
// });
// 
// 
// 

