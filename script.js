document.addEventListener("DOMContentLoaded", () => {
    gsap.from("header a.selected", {
        opacity: 0,
        y: -20,
        duration: 1
    });

    gsap.from("nav ul li", {
        opacity: 0,
        y: -10,
        duration: 0.8,
        stagger: 0.2
    });

    gsap.from(".intro p", {
        opacity: 0,
        y: 10,
        duration: 0.8,
        stagger: 0.3,
        delay: 0.5
    });

    gsap.to(".moving-gif", {
        x: window.innerWidth + 200, // Bewegt sich komplett nach rechts raus
        duration: 5, // Dauer der Animation in Sekunden
        repeat: -1, // Endlos wiederholen
        ease: "linear" // Gleichmäßige Bewegung
    });
    // Element auswählen und initiale Einstellungen vornehmen
    const image = document.querySelector('.divine_machinery_img');
    gsap.set(image, { transformPerspective: 500, transformOrigin: "center" });

    document.addEventListener("mousemove", (event) => {
    // Mausposition relativ zur Fenstergröße normalisieren (-0.5 bis 0.5)
    const xPercent = (event.clientX / window.innerWidth) - 0.5;
    const yPercent = (event.clientY / window.innerHeight) - 0.5;

    // Maximale Rotationswinkel definieren
    const maxRotation = 25; // Grad
    const rotationY = xPercent * maxRotation * 2; // Rotation um die Y-Achse (links/rechts)
    const rotationX = yPercent * maxRotation * 2; // Rotation um die X-Achse (oben/unten)
    const rotationZ = yPercent * 180 * 2;

    // Animation mit GSAP – hier wird die 3D-Rotation sanft animiert
    gsap.to(image, { rotationX: rotationX, rotationY: rotationY, rotationZ: rotationZ, duration: 1 });
    });


});