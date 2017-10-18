
// this is the front-end .js file for transitions & slides


// --------- main slideshow code ---------

var slideIndex = 0;

var slides = document.getElementsByClassName("mySlides");
console.log("this is how many slides you have: " + slides.length);
for (i=0; i<slides.length; i++) {
	slides[i].style.display = "none";
	console.log(slideIndex);
}

$(".mySlides").hide();

function displayFirstSlide() {
	setTimeout(function(){
		slides[0].style.display = "block";
	}, 500);
}

// end of main slideshow code



// --------- loader code ---------

var loaderImagesArray = [ 	'images/loader-start-01.png',
							'images/loader-1.png',
							'images/loader-2.png', 
							'images/loader-3.png',
							'images/loader-4.png'
						];

function loaderFunction(){
	setTimeout(function(){
		$("#loader-container").fadeIn(1000);
	}, 1000);

	//I need to clean this up lol... 
	for (count=0; count<5; count++){
		setTimeout(function(){
			$("#loader-images").attr('src', loaderImagesArray[0]);
		}, 2000);

		setTimeout(function(){
			$("#loader-images").attr('src', loaderImagesArray[1]);
		}, 2500);

		setTimeout(function(){
			$("#loader-images").attr('src', loaderImagesArray[2]);
		}, 3000);

		setTimeout(function(){
			$("#loader-images").attr('src', loaderImagesArray[3]);
		}, 3500);
		setTimeout(function(){
			$("#loader-images").attr('src', loaderImagesArray[4]);
		}, 4000);
		setTimeout(function(){
			$("#loader-images").attr('src', loaderImagesArray[0]);
		}, 4500);

	}
	setTimeout(function(){
		$("#loader-container").fadeOut(1000);
	}, 4700);
}



// --------- slide 0 code ---------

$("#button-0").on('click', function(){
	slides[0].style.display = "none";
	slides[1].style.display = "block";
});



// --------- slide 1 code ---------

$("#uploadImage").on('click', function(){
	slides[1].style.display = "none";
	$(slides[2]).fadeIn(500);
	loaderFunction();
	function resultsTimer() {
		$("#loader").hide();
		$("#results").fadeIn(100);
	}
	setTimeout(resultsTimer, 5500);
});



// --------- slide 2 code ---------

$("#next-button-2").on('click',function(){
	$(slides[2]).fadeOut(500);
	$(slides[3]).fadeIn(500);
});



// --------- slide 3 code ---------

$("#prev-button-3").on('click', function(){
	$(slides[3]).fadeOut(500);
	$(slides[2]).fadeIn(500);
})

$("#next-button-3").on('click', function(){
	$(slides[3]).fadeOut(500);
	$(slides[4]).fadeIn(500, function(){
		// slides[4].style.webkitAnimationName = 'slide';
		// slides[4].style.webkitAnimationDuration = '1s';
	});
})

$("#photo-info-button").on('click', function() {
	$("#photo-info").fadeIn(300);
	$("#photo-info-back-button").parent().fadeIn( "slow", function(){});
});

$("#photo-info-back-button").on('click', function(){
	$("#photo-info-back-button").parent().slideUp( "slow", function() {
		$(this).fadeOut(300);
	});
	setTimeout(function(){
		$("#photo-info").fadeOut(300);
	}, 600);
});



// --------- slide 4 code ---------

$("#prev-button-4").on('click', function(){
	$(slides[4]).fadeOut(500);
	$(slides[3]).fadeIn(500);
});

$("#next-button-4").on('click', function(){
	$(slides[4]).fadeOut(500);
	$(slides[5]).fadeIn(500);
});



// --------- slide 5 code ---------

$("#prev-button-5").on('click', function(){
	$(slides[5]).fadeOut(500);
	$(slides[4]).fadeIn(500);
});








