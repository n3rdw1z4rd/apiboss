$(function() {
	var url = document.location.toString();
	if (url.match('#')) {
		$('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
	}

	$('.nav-pills a').on('shown.bs.tab', function(e) {
		window.location.hash = e.target.hash;
	})
})
