const angle = 20;
const rotateCard = window;

const lerp = (start, end, amount) => {
	return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
	const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
	return Math.min(Math.max(newValue, -newMax), newMax);
};

// Card Rotation for Profile
window.addEventListener("DOMContentLoaded", (event) => {
	const cards = document.querySelectorAll(".card");
	cards.forEach((e) => {
		e.addEventListener("mousemove", (event) => {
			const rect = e.getBoundingClientRect();
			const centerX = (rect.left + rect.right) / 2;
			const centerY = (rect.top + rect.bottom) / 2;
			const posX = event.pageX - centerX;
			const posY = event.pageY - centerY;
			const x = remap(posX, rect.width / 2, angle);
			const y = remap(posY, rect.height / 2, angle);
			e.dataset.rotateX = x;
			e.dataset.rotateY = -y;
		});

		e.addEventListener("mouseout", (event) => {
			e.dataset.rotateX = 0;
			e.dataset.rotateY = 0;
		});
	});

	const update = () => {
		cards.forEach((e) => {
			let currentX = parseFloat(e.style.getPropertyValue('--rotateY').slice(0, -1));
			let currentY = parseFloat(e.style.getPropertyValue('--rotateX').slice(0, -1));
			if (isNaN(currentX)) currentX = 0;
			if (isNaN(currentY)) currentY = 0;
			const x = lerp(currentX, e.dataset.rotateX, 0.05);
			const y = lerp(currentY, e.dataset.rotateY, 0.05);
			e.style.setProperty("--rotateY", x + "deg");
			e.style.setProperty("--rotateX", y + "deg");
		})
	}
	setInterval(update, 1000 / 60)
});


// Header Parallax Effect
window.addEventListener('load', function () {
	const header = document.querySelector('.header');
	const imageMax = document.querySelector('.image-max');

	if (header && imageMax) {
		header.style.height = imageMax.clientHeight + 'px';
	}
});

window.addEventListener('load', function () {
	const header = document.querySelector('.header');
	const imageMax = document.querySelector('.image-max');
	const background = document.querySelector('.background');

	if (header && imageMax) {
		header.style.height = imageMax.clientHeight + 'px';
	}

	window.addEventListener('scroll', () => {
		const scrollY = window.scrollY;
		const translateY = scrollY / 2;

		imageMax.style.transform = `translateY(${translateY}px)`;
		background.style.transform = `translateY(${translateY}px)`;
	});

	header.style.height = `${imageMax.offsetHeight}px`;
});


// Discography Slider, with autoplay  
var swiper = new Swiper('.blog-slider', {
	spaceBetween: 30,
	effect: 'fade',
	loop: true,
	mousewheel: {
		invert: false,
	},
	pagination: {
		el: '.blog-slider__pagination',
		clickable: true,
	},
	autoplay: {
		delay: 5000, //Zeit in ms
	},
	on: {
		slideChange: function () {
			$('.blog-slider__item').removeClass('active');
			$('.swiper-slide-active').closest('.blog-slider__item').addClass('active');
		}
	}
});



//Headerscroll
document.querySelectorAll('.dark-header a').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const targetElement = document.querySelector(this.getAttribute('href'));
		const offset = 100; // Der zusätzliche Offset von 100 Pixeln

		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - offset,
				behavior: 'smooth'
			});
		}
	});
});
