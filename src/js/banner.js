(function(){
	const bannerClose = document.querySelector(".js-banner-close");
	const banner = document.querySelector(".js-banner");
	bannerClose.addEventListener("click", closeBanner);
	function closeBanner(e){
		e.preventDefault();
		banner.style.display = "none";
	}
})();