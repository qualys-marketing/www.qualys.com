"use strict";/* global Vimeo */ /*
 * Play video when user clicks poster image
 */(function(){"use strict";function a(){var a=document.querySelector("iframe"),d=new Vimeo.Player(a);b.classList.add("hidden"),c.classList.add("hidden"),d.play()}var b=document.querySelector(".poster"),c=document.querySelector(".play-icon");b.addEventListener("click",a),c.addEventListener("click",a)})();
//# sourceMappingURL=customer-testimonial.js.map