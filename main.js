const players = {};

var player;


function onYouTubeIframeAPIReady() {

	//set up background videos
	$(".background .yt").each(function () {
		const video = this;
		const videoObj = $(this);

		new YT.Player(video, {
			videoId: videoObj.data("id"),
			playerVars: {
				controls: 0,
				autoplay: 1,
				disablekb: 1,
				enablejsapi: 1,
				iv_load_policy: 3,
				modestbranding: 1,
				showinfo: 0,
				mute: 1,
				playsinline: 1,
				rel: 0,
				loop: 1,
				playlist: videoObj.data("id")
			}
		});
	});
	//set up explainer videos with audio
	$(".screen .yt").each(function () {
		const video = this;
		const videoObj = $(this);

		const obj = new YT.Player(video, {
			videoId: videoObj.data("id"),
			playerVars: {
				controls: 1,
				enablejsapi: 1,
				iv_load_policy: 3,
				modestbranding: 1,
				showinfo: 0,
				playsinline: 1,
				rel: 0
			},
			events: {
				onReady: onPlayerReady
			}
		});

	});
}

function onPlayerReady(event) {
	console.log(event)
	new Watch(event.target.getIframe(), { rootMargin: "-33%" }).oneInView(() => {
		event.target.playVideo()
	}).outView(() => {
		event.target.pauseVideo()
	})
}
//still images
$(() => {
	$("[data-bg]").each(function () {
		new Watch(this, { rootMargin: "-33%" }).inView(() => {
			const bgID = $(this).data("bg");
			$(".background.active").removeClass("active");
			$(`[data-bg-id='${bgID}']`).addClass("active");
		});
	});
	//begin button (starts audio and the experience)
	$("body").on("click", ".begin", function (e) {
		e.preventDefault();
		const audioObj = $("#audio");
		const audio = audioObj[0];

		audio.play();
		$("body.lock").removeClass("lock")
		$("html,body").animate({
			scrollTop: $("[data-bg]").offset().top
		})
	});
	//sound control button
	$("body").on("click", ".soundcontrol", function (e) {
		e.preventDefault();
		const audioObj = $("#audio");
		const audio = audioObj[0];
		const button = $(e.target);


		if (button.hasClass("fa-volume-off")) {
			audio.pause();
			button.removeClass("fa-volume-off").addClass("fa-volume-up");
		} else {
			audio.play();
			button.addClass("fa-volume-off").removeClass("fa-volume-up");

		}


	});

});