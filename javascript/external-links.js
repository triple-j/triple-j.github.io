$(document).ready(function(){
	/**
	 * Open all external links in a new window
	 */
	$('a').each(function(){
		var $elm = $(this),
			host = window.location.host,
			href = $elm.attr('href'),
			regex = new RegExp("^(http(s)?:)?//(?!"+host+")", 'i');
			
		if ( href.match(regex) ) {
		//	console.log("external",href);
			$elm.addClass("external-link").attr("target","_blank");
		//} else {
		//	console.log("internal",href);
		}
	});
});
