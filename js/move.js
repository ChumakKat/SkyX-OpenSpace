
    // JS 
  // import { gsap } from 'gsap'

// After update OptimizedHTML5
let cx, cy, mouseX, mouseY, posX, posY, clientX, clientY, dx, dy, tiltx, tilty, request, radius, degree

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS

const body = document.querySelector('.intro')

	cx = window.innerWidth / 2
	cy = window.innerHeight / 2

	body.addEventListener('mousemove', e => {

		clientX = e.pageX
		clientY = e.pageY

		request = requestAnimationFrame(updateMe)

		mouseCoords(e)
		cursor.classList.remove('hidden')
		follower.classList.remove('hidden')

	})

	function updateMe() {

		dx     = clientX - cx
		dy     = clientY - cy
		tiltx  = dy / cy
		tilty  = dx / cx
		radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
		degree = radius * 24
		gsap.to('.main', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })

	}
	
	gsap.to('.btn__wrap', { zoom: .98 })
	gsap.to('.fon-btn', { opacity: 1, duration: .1 })
	gsap.to('.fon-one', { opacity: 1, left: 0, top: 0, duration: .25, delay: .25 })
	gsap.to('.fon-two', { opacity: 1, left: 0, top: 0, duration: .25, delay: .25 })
	
	
});

   
