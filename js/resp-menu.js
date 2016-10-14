/*** Form the dynamic menu ***/
function getDynamicMenu(menuContainer) {
/*
	menuContainer - put the css selector of the element that will contain the main categories (ex: '.p-categories')
	how your function call will look with the examples above - getDynamicMenu('.p-categories');
*/

	/***** Get ULs inside parent LIs *****/
	for (var i=0;i<jQuery('#dynamicCats .lcat ul li').length;i++) {
		if (jQuery('#dynamicCats .lcat ul li').eq(i).next().is('ul')) {
			jQuery('#dynamicCats .lcat ul li').eq(i).append(jQuery('#dynamicCats .lcat ul li').eq(i).next().eq(0));
		}
	}


	/***** Get array of categories *****/
	arrCats = jQuery('#dynamicCats .lcat .lev1>li');


	/***** Appending level 1 categories to main navigation *****/
	jQuery(''+menuContainer+'').append(arrCats);
	jQuery('#p-categories a').each(function(){
		jQuery(this).attr('href',jQuery(this).attr('href').replace(/_lns=1/,''));
	});


	/*
	check if there is enough place for the categories to be on one line
	remove this block if you don't need it
	*/
	/*function longMenu() {
		var width = jQuery('#p-categories').outerWidth();

		jQuery('#p-categories>li').each(function(){
			width -= parseInt(jQuery(this).innerWidth());
			if (width < 80) { //matches the width of #p-categories .p-more
				jQuery(this).addClass('p-long');
			}
		});
		if (jQuery('.p-long').length>0) {
			jQuery('#p-categories').append('<li class="p-more"><a href="javascript:void(0)">More <span></span></a><ul class="lev0"></ul></li>');
			jQuery('#p-categories .lev0').append(jQuery('#p-categories .p-long'));
		}
	}
	longMenu();*/

	//recalculate on resize
	/*var currWidth = jQuery(window).width();
	jQuery(window).resize(function(){
		if(jQuery(this).width() != currWidth){
			jQuery('#p-categories').append(jQuery('#p-categories .p-long'));
			jQuery('#p-categories>li').removeClass('p-long');
			jQuery('#p-categories .p-more').remove();
			longMenu();
		}
	}); */
	/**/


	//push mobile categories
	jQuery('#p-categories>li').each(function(){
		jQuery(''+menuContainer+'drop').append('<option value="'+jQuery(this).find('a').eq(0).attr('href')+'">\u25BE '+jQuery(this).find('a').eq(0).text()+'</option>');
		var currLev1 = jQuery(this);
		if (currLev1.find('ul.lev2').length > 0) {
			if (currLev1.find('ul.lev2>li').length > 0) {
				currLev1.find('ul.lev2>li').each(function(){
					jQuery(''+menuContainer+'drop').append('<option value="'+jQuery(this).find('a').eq(0).attr('href')+'">&#160;&#160;-&#160;'+jQuery(this).find('a').eq(0).text()+'</option>');

					var currLev2 = jQuery(this);
					if (currLev2.find('ul.lev3').length > 0) {
						if (currLev2.find('ul.lev3>li').length > 0) {
							currLev2.find('ul.lev3>li').each(function(){
								jQuery(''+menuContainer+'drop').append('<option value="'+jQuery(this).find('a').eq(0).attr('href')+'">&#160;&#160;&#160;&#160;&#160;'+jQuery(this).find('a').eq(0).text()+'</option>');
							});
						}
					}
				});
			}
		}
	});
	//get mobile categories working
	jQuery('select#p-categoriesdrop').bind('change',function(){
		location.href=this.value;
	});
}
