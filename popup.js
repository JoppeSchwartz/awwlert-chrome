
var REDDIT_URL_BASE = "https://www.reddit.com/r/aww/new.json?limit=25"
var awwlinks = [];
var modHash;
var MARGIN_PADDING = 4;

function loadNew() {
	$.ajax({
		type: 'GET',
		url: REDDIT_URL_BASE,
		dataType: 'json',
		contentType: 'application/json;charset=UTF-8',
		success: function(data, status, jqXHR) {
			modHash = data.data.modhash;
			console.log(data);
			var children = data.data.children; 
			//var row = $('#awwTableRow');
			var marginLeft = 0;
			for (var i=0; i<children.length; i++) {
				var child = children[i];
				//var td = $('<td/>');
				var newDiv = $('<div/>');
				newDiv.addClass('tickerItem');
				//	Set only the first div to float.
				if (i==0) {
					newDiv.css('float', 'left');
				}
				//	Add thumbnail and link to div.
				var thumb = $('<img/>', {
					src: child.data.thumbnail
				});

				var link = $('<a/>', {
					id: 'link' + i,
					href: child.data.url,
					text: child.data.title,
					target:'_blank'
				});
				link.html("&nbsp;" + link.html() + "&nbsp;&nbsp;").prepend(thumb).appendTo(newDiv);

				//	Set the div's left and right margin.
				newDiv.appendTo($('#awwTicker'));
				
				//if (newDiv.width() > 250) newDiv.width(250);
				 console.log('width = ' + newDiv.width())
				// console.log('outer width ' + newDiv.outerWidth())
				// newDiv.css('margin-left', marginLeft);
				// newDiv.css('margin-right', marginLeft + newDiv.width() + MARGIN_PADDING);
				// marginLeft += newDiv.width() + MARGIN_PADDING;
			}
			//	Use the silky-smooth marquee (http://remysharp.com/2008/09/10/the-silky-smooth-marquee)
			$('marquee').marquee().mouseover(function(){
				$(this).trigger('stop');
			}).mouseout(function() {
				$(this).trigger('start');
			});
		},
		error: function(jqXHR, status, errorThrown) {
			alert(status);
			console.error(status);
		}
	});
}


$(function() {
	loadNew();
	

});