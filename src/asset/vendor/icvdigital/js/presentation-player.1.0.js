(function($) {
	'use strict';
	var response, tempTime, state, image_url, w, h;
	var temp=0;

	var video_width = 400;
	var video_height = 225;
	var slide_width = 566;
	var slide_height = 424;
	var lg_slide_width = 700;
	var lg_slide_height = 525;
	var player_control_height = 24; // Default JW controls

	var agent=navigator.userAgent.toLowerCase();
	var is_ipad = (agent.indexOf('ipad')!=-1);
	var is_android = (agent.indexOf('android')!=-1);

	var player_height = video_height + player_control_height;
	var seconds_array = new Array();
	var a = new Array();

	function showpanel(displayit) {
		jQuery(".div_panels").hide();
		jQuery("#"+displayit).show();
	}

	function timeScript() {
		var playertime = parseInt(jwplayer("container").getPosition());
		//alert(playertime);

		for(var i=0;i<seconds_array.length;i++)        {

			if(playertime == seconds_array[i])
			{

				if(state == 'bigslide') {
					image_url = response.information.slideurl + 'slides_lg/' + response.slides[i].url;
				} else {
					image_url = response.information.slideurl + 'slides/' + response.slides[i].url;
				}

				jQuery("#slides").css("display","block");
				jQuery("#slides").attr("src",image_url);
				// Unhilight all
				jQuery('#chapters div').css("background-color",'').find("a").css({'color':''});
				// Hilight current chapter
				jQuery('#'+playertime).css({'background-color':'#5995e0'}).find("a").css({'color':'#fff'});
			}
		}
		if(state == 'bigslide') {
			w = lg_slide_width;
			h = lg_slide_height;
		} else {
			w = slide_width;
			h = slide_height;
		}
		jQuery("#slides").attr("width",w);
		jQuery("#slides").attr("height",h);
	}

	function seekScript(position,offset) {
		var playertime = parseInt(offset);
		for(var i=0;i<seconds_array.length;i++)
		{
			if(playertime >= seconds_array[i])
			{
				if(state == 'bigslide') {
					image_url = response.information.slideurl + 'slides_lg/' + response.slides[i].url;
				} else {
					image_url = response.information.slideurl + 'slides/' + response.slides[i].url;
				}

				// Unhilight all
				jQuery('#chapters div').css("background-color",'').find("a").css({'color':''});
				// Hilight current chapter
				jQuery('#'+seconds_array[i]).css({'background-color':'#5995e0'}).find("a").css({'color':'#fff'});
			}
		}
		if(state == 'bigslide') {
			w = lg_slide_width;
			h = lg_slide_height;
		} else {
			w = slide_width;
			h = slide_height;
		}
		jQuery("#slides").css("display","block");
		jQuery("#slides").attr("src",image_url);
		jQuery("#slides").attr("width",w);
		jQuery("#slides").attr("height",h);

	}

	function view_enlarge_slide() {
		state = 'bigslide';
		//$('#video_container').css("height",'225px');
		$('#player_left_container').removeClass('player_left_normal');
		$('#player_left_container').addClass('player_left_large_slide');
		$('#content_container').css('display','none');
		jwplayer("container").resize(lg_slide_width,player_control_height);

		$('#player_right_container').removeClass('player_right_normal');
		$('#player_right_container').addClass('player_right_large_slide');

		// buttons
		$("#btn_normal_slide").css('display','block');
		$("#btn_enlarge_slide").css('display','none');

		timeScript();
	}

	function view_normal() {
		state = 'normal';
		//$('#video_container').css("height",'225px');
		$('#player_left_container').removeClass('player_left_large_slide');
		$('#player_left_container').addClass('player_left_normal');
		$('#content_container').css('display','block');
		jwplayer("container").resize(video_width,player_height);

		$('#player_right_container').removeClass('player_right_large_slide');
		$('#player_right_container').addClass('player_right_normal');

		// buttons
		$("#btn_normal_slide").css('display','none');
		$("#btn_enlarge_slide").css('display','block');

		timeScript();
	}

	$(document).ready(function () {
		if(is_ipad) {
			player_control_height = 44;
			//$('#video_container').css("height",'269px');
			$('#chapters, #overview, #presenters').css("height",'137px');
			$('#content_container').css("height",'137px');
		} else if(is_android) {
			player_control_height = 0;
			//$('#video_container').css("height",'225px');
			$('#chapters, #overview, #presenters').css("height",'181px');
			$('#content_container').css("height",'181px');
		}		

		$("#btn_enlarge_slide").button();
		$("#btn_enlarge_slide").click(function() { view_enlarge_slide(); } );
		$("#btn_normal_slide").button();
		$("#btn_normal_slide").click(function() { view_normal(); } );
		$("#btn_normal_slide").css('display','none');

		
		response = json_variable;

		for(var i=0;i<response.information.videourl.length;i++) {
			a.push({file:response.information.videourl[i]});
		}
			
		var i=0;
		jQuery.each(response.slides, function(name, value) {
			tempTime = value.time.split(':');
			var seconds = (+tempTime[0]) * 60 * 60 + (+tempTime[1]) * 60 + (+tempTime[2]);
			seconds_array[i] = seconds;
			i++;
		});

		//alert(seconds_array);
		jwplayer("container").setup({
			modes: [
			{ type: 'html5' },
			{ type: 'flash', src: 'js/player.swf' }
			],
			height: player_height,
			width: 400,
			'controlbar': 'bottom',
			events: {
			onSeek: function(e){seekScript(e.position, e.offset);}
			},
			levels: a
		});


		jQuery("#slides").css("display","block");
		jQuery("#slides").attr("src",response.information.slideurl + 'slides/' + response.slides[0].url);
		jQuery("#slides").attr("width",slide_width);
		jQuery("#slides").attr("height",slide_height);

		jwplayer().onPlay(function(){objmetainfo = jwplayer().getMeta();});

		$.each(response.slides, function(obj) {
			if (response.slides[obj].chapter == 1)
			{
				tempTime = response.slides[obj].time.split(':');
				var seconds = (+tempTime[0]) * 60 * 60 + (+tempTime[1]) * 60 + (+tempTime[2]);

				var tmpHTML = "<div id='"+seconds+"'>";
				tmpHTML += '<a href="javascript:void(null);" onclick="jwplayer().seek('+seconds+');">'+response.slides[obj].title+'</a>';
				tmpHTML += "</div>";

				jQuery("#chapters").append(tmpHTML);
			}
		});

		jQuery("#overview").html(response.information.title);
		jwplayer().onTime(timeScript);
	});
}(jQuery));