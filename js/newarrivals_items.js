

	var pm_related_num = 7; //max e 30

	var pm_rel_arg = "http://stores.ebay.fr/boutique-bazarchic/_i.html?rt=nc&_dmd=2";

	var rel_temp = new Array();

	function assign_rel() {
		var count; var name = 0;
		try {
		for(count = 1; count < 60; count++) {
			rel_temp[name] = $(".gallery").eq(count).html();
			if ( rel_temp[name] == undefined ) rel_temp[name] = '';
			name++; count++;
		};
		}catch(e){;};

		var h_prep = '';

		for(var i = 0; i < pm_related_num; i++) {
			h_prep = h_prep + "<table class=\"rel_item\">" + rel_temp[i] + "</table>"
		};

		$(".rel_mel").html(h_prep);
		$('table.rel_item').find('a.gpvi').attr('target','_top');
	}

	function rel_ne() {
		$('.pm_block_space').last().css("display","none");
		$('#pm_related').css("display","none");
	}

	function w_load_cat(url) {
		var XMLHttpRequestObject = false;
		if (window.XMLHttpRequest) {
			XMLHttpRequestObject = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) {
			XMLHttpRequestObject = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}
		if(XMLHttpRequestObject) {
			XMLHttpRequestObject.open("POST", 'http://mobile.pentagonhosting.co.uk/get_store_items.php');
			XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			XMLHttpRequestObject.onreadystatechange = function() {
				if (XMLHttpRequestObject.readyState == 4) {
					if (XMLHttpRequestObject.status == 200) {
						var msg = XMLHttpRequestObject.responseText;
					   $('.rel_mel').html(msg);
						assign_rel();
						$('.rel_loading').css("display","none");


						child = '<tr><td><a class="p_cart" target="_blank">View</a></td></tr>';
						$('table.rel_item').each(function() {
							var child_link = $(this).find('a').attr('href');
							$(this).children('tbody').append(child);
							$(this).find('.p_cart').attr('href', child_link);
							$(this).find('span.stp').appendTo($(this).find('.p_cart'));
							$(this).find('span.bin').appendTo($(this).find('.p_cart'));
						});

						/* Put into slider */
						var numbr = $('div.rel_mel').find('table.rel_item').length;
						for (i=0;i<numbr;i++) {
							var use_img = $('div.rel_mel').find('table.rel_item').eq(i).find('td.picture').find('div.image').find('a.gpvi').find('img').attr('src');
							var use_ttl = $('div.rel_mel').find('table.rel_item').eq(i).find('td.details').find('div.ttl').find('a').text();
							var use_price = $('div.rel_mel').find('table.rel_item').eq(i).find('span.bin').text();
							var use_cart = $('div.rel_mel').find('table.rel_item').eq(i).find('a.p_cart').attr('href');


							$('ul.bxslider').append('<li class="slide">\
							<a href="'+use_cart+'" target="_blank">\
								<div class="slide_prod">\
									<div class="slide_img">\
										<img src="'+use_img+'"/>\
									</div>\
									<div class="slide_ttl">\
										<span>'+use_ttl+'</span>\
									</div>\
									<div class="slide_price">\
										<span>'+use_price+'</span>\
									</div>\
								</div>\
								</a>\
							</li>');
						}


						/* Initiate slider */
						$('ul.bxslider').bxSlider({
							slideWidth: 200,
							minSlides: 2,
							maxSlides: 4,
							moveSlides: 1,
							slideMargin: 20,
							pager: false,
							auto: true,
							autoControls: false,
							speed:1000
						});


					}
					else {
						rel_ne();
					}
				}
			}
			var data_params = 'url='+encodeURIComponent(url);
			XMLHttpRequestObject.send(data_params);
		}
	}

	w_load_cat(pm_rel_arg);
