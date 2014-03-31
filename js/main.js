jQuery(document).ready(function($) {
	var btn = {
			play  : $('#play'),
			pause  : $('#pause'),
			prev : $('#prev'),
			next  : $('#next'),
			stop  : $('#stop'),
			mute  : $('#mute'),
			vol	: 	$('.volume input'),
		},

	ul_playlist = $('.playlist ul');

	$.getJSON('playlist.json', function(data) {
		playlist = data.playlist;

		create_playlist(playlist, ul_playlist);

		song 	= new Audio();
		song.type= 'audio/mpeg';
		song.volume = btn.vol.val()/100;

		i = ul_playlist.find('.active').data('idx');

		songPlayIndex(i,playlist,song);

		control_player(song, btn, playlist, ul_playlist);
	});

});

function create_playlist(list,ele) {
	d = '';
	$.each(list, function(index, val) {
		d += '<li data-idx="'+index+'"><a href="">'+val.tenbaihat+'</a></li>';
	});

	ele.empty().append(d);
	ele.find('li').first().addClass('active');
}

function songPlayIndex(i,l,s) {
	$('.tenbaihat').text(l[i].tenbaihat);
	$('.trinhbay').text(l[i].trinhbay);
	s.src = l[i].url;
	s.play();
}