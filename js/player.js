function control_player(song,button,list,ul) {
	button.play.on('click', function(e) {
		e.preventDefault();
		status = $(this).find('i').hasClass('fa-pause') ? 'play' : 'pause';

		if(status == 'play'){
			$(this).changeClass('fa-pause','fa-play');
			song.pause();
		}else{
			$(this).changeClass('fa-play','fa-pause');
			song.play();
		}
	});

	button.stop.on('click', function(e) {
		e.preventDefault();
		button.play.changeClass('fa-pause','fa-play');
		song.pause(); song.currentTime = 0;
	});

	button.vol.change(function(e) {
		song.volume = ($(this).val())/100;
		$('#vol-fill').css('width', $(this).val() + '%');
	});

	song.addEventListener('timeupdate',function (){
		per = (song.currentTime/song.duration)*100;

		if(per == 100){
			i = ul.find('li.active').removeClass('active').next().addClass('active').data('idx');
			if(i>=list.length){ i=0;return }
			songPlayIndex(i,list,song);
		}else{
			$('.fill').css({'width': per + '%'});
			$('#seek').attr('value', per);
		}
	});

	$('#seek').click(function(event) {
		time = ($(this).val()/100)*song.duration;
		song.currentTime = time;
	});

	ul.on('click', 'li', function(e) {
		e.preventDefault();
		ul.find('li.active').removeClass('active');
		$(this).addClass('active');
		i = $(this).data('idx');
		songPlayIndex(i,list,song);
	});

	button.prev.on('click', function(e) {
		e.preventDefault();
		i = ul.find('li.active').removeClass('active').prev().addClass('active').data('idx');
		if(i<=0){ return }
		songPlayIndex(i,list,song);
	});

	button.next.on('click', function(e) {
		e.preventDefault();
		i = ul.find('li.active').removeClass('active').next().addClass('active').data('idx');
		if(i>=list.length){ return }
		songPlayIndex(i,list,song);
	});

}

$.fn.changeClass = function(before, after) {
	$(this).find('i').removeClass(before).addClass(after);
}