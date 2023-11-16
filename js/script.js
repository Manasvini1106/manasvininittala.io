window.addEventListener('load', () => {
	document.querySelector('.main').classList.remove('hidden');
	document.querySelector('.home-section').classList.add('active');
	/* ------- Page Loader ------ */
	document.querySelector('.page-loader').classList.add('fade-out');
	setTimeout(() => {
		document.querySelector('.page-loader').style.display = 'none';
	}, 600);
});

/* ------------- Toggle Navbar ------------ */
const navToggler = document.querySelector('.nav-toggler');
navToggler.addEventListener('click', () => {
	hideSection();
	toggleNavbar();
	document.body.classList.toggle('hide-scrolling');
});
function hideSection() {
	document.querySelector('section.active').classList.toggle('fade-out');
}
function toggleNavbar() {
	document.querySelector('.header').classList.toggle('active');
}

/* ---------------- Active Section ---------------------- */
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('link-item') && e.target.hash !== '') {
		// activate the overlay to prevent multiple clicks
		document.querySelector('.overlay').classList.add('active');
		navToggler.classList.add('hide');
		if (e.target.classList.contains('nav-item')) {
			toggleNavbar();
		} else {
			hideSection();
			document.body.classList.add('hide-scrolling');
		}
		setTimeout(() => {
			document
				.querySelector('section.active')
				.classList.remove('active', 'fade-out');
			document.querySelector(e.target.hash).classList.add('active');
			window.scrollTo(0, 0);
			document.body.classList.remove('hide-scrolling');
			navToggler.classList.remove('hide');
			document.querySelector('.overlay').classList.remove('active');
		}, 500);
	}
});

/* -------------- About Tabs ---------------- */
const tabsContainer = document.querySelector('.about-tabs'),
	aboutSection = document.querySelector('.about-section');

tabsContainer.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('tab-item') &&
		!e.target.classList.contains('active')
	) {
		tabsContainer.querySelector('.active').classList.remove('active');
		e.target.classList.add('active');
		const target = e.target.getAttribute('data-target');
		aboutSection
			.querySelector('.tab-content.active')
			.classList.remove('active');
		aboutSection.querySelector(target).classList.add('active');
	}
});

/* ----------------- Portfolio Item Details Popup ------------------ */
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('view-project-btn')) {
		togglePortfolioPopup();
		document.querySelector('.portfolio-popup').scrollTo(0, 0);
		portfolioItemDetails(e.target.parentElement);
	}
});
function togglePortfolioPopup() {
	document.querySelector('.portfolio-popup').classList.toggle('open');
	document.body.classList.toggle('hide-scrolling');
	document.querySelector('.main').classList.toggle('fade-out');
}
document
	.querySelector('.pp-close')
	.addEventListener('click', togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('pp-inner')) {
		togglePortfolioPopup();
	}
});

function portfolioItemDetails(portfolioItem) {
	document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector(
		'.portfolio-item-thumbnail img'
	).src;

	document.querySelector('.pp-header h3').innerHTML =
		portfolioItem.querySelector('.portfolio-item-title').innerHTML;

	document.querySelector('.pp-body').innerHTML = portfolioItem.querySelector(
		'.portfolio-item-details'
	).innerHTML;
}

/* ----------------- Read More ------------------ */
function myFunction() {
	var dots = document.getElementById('dots');
	var moreText = document.getElementById('more');
	var btnText = document.getElementById('myBtn');

	if (dots.style.display === 'none') {
		dots.style.display = 'inline';
		btnText.innerHTML = 'Read more';
		moreText.style.display = 'none';
	} else {
		dots.style.display = 'none';
		btnText.innerHTML = 'Read less';
		moreText.style.display = 'inline';
	}
}

/* ----------------- Skills Section ------------------ */
(function () {
	var SkillsBar = function (bars) {
		this.bars = document.querySelectorAll(bars);
		if (this.bars.length > 0) {
			this.init();
		}
	};

	SkillsBar.prototype = {
		init: function () {
			var self = this;
			self.index = -1;
			self.timer = setTimeout(function () {
				self.action();
			}, 500);
		},
		select: function (n) {
			var self = this,
				bar = self.bars[n];

			if (bar) {
				var width = bar.parentNode.dataset.percent;

				bar.style.width = width;
				bar.parentNode.classList.add('complete');
			}
		},
		action: function () {
			var self = this;
			self.index++;
			if (self.index == self.bars.length) {
				clearTimeout(self.timer);
			} else {
				self.select(self.index);
			}

			setTimeout(function () {
				self.action();
			}, 500);
		},
	};

	window.SkillsBar = SkillsBar;
})();

(function () {
	document.addEventListener('DOMContentLoaded', function () {
		var skills = new SkillsBar('.skillbar-bar');
	});
})();
