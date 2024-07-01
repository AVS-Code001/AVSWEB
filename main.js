document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('F6Pit_0VNLi25EKoH'); // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key

    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('.section');
    var logo = document.getElementById('logo');
    var navbar = document.querySelector('.navbar');
    var landImages = ['Aaron1.jpeg', 'Aaron2.jpeg', 'Aaron3.jpeg'];
    var currentImageIndex = 0;

    // Show/hide navbar
    logo.addEventListener('click', function () {
        navbar.classList.toggle('show');
    });

    // Scroll-triggered background color change
    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        document.body.style.backgroundColor = scrollY % 2 === 0 ? '#FDF7E5' : '#E5F0FF';
    });

    // Navigation click handler
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = link.getAttribute('data-target');

            navLinks.forEach(function (nav) {
                nav.classList.remove('active');
            });
            link.classList.add('active');

            sections.forEach(function (section) {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Image rotation
    setInterval(function () {
        currentImageIndex = (currentImageIndex + 1) % landImages.length;
        document.getElementById('landImage').src = landImages[currentImageIndex];
    }, 3000);

    // Customize image size
    document.getElementById('imageWidth').addEventListener('input', function (event) {
        var newWidth = event.target.value + '%';
        document.querySelector('.land-image').style.width = newWidth;
    });

    // Fade-in animation for contact sections
    var contactSections = document.querySelectorAll('.contact-us, .discover-more');
    contactSections.forEach(function (section, index) {
        setTimeout(function () {
            section.classList.add('active');
        }, index * 300);
    });

    // Dynamic greeting based on time of day
    var greetingElement = document.getElementById('greeting');
    var now = new Date();
    var hours = now.getHours();

    if (hours < 12) {
        greetingElement.textContent = 'Good Morning!';
    } else if (hours < 18) {
        greetingElement.textContent = 'Good Afternoon!';
    } else {
        greetingElement.textContent = 'Good Evening!';
    }

    // Toggle Resume Details Functionality
    var toggleResumeButton = document.getElementById('toggleResumeButton');
    var resumeDetails = document.getElementById('resumeDetails');

    toggleResumeButton.addEventListener('click', function () {
        resumeDetails.style.display = resumeDetails.style.display === 'none' ? 'block' : 'none';
        toggleResumeButton.textContent = resumeDetails.style.display === 'none' ? 'Show Resume Details' : 'Hide Resume Details';
    });

    // EmailJS form submission
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        var templateParams = {
            to_name: "Aaron Sayson",
            from_name: document.getElementById('email').value,
            message: document.getElementById('help-with').value,
            reply_to: document.getElementById('email').value
        };

        emailjs.send('service_05me09j', 'template_74ei4ol', templateParams) // Replace 'template_74ei4ol' with your actual EmailJS template ID
            .then(function(response) {
                alert('Your message has been sent successfully!', response.status, response.text);
            }, function(error) {
                alert('Failed to send the message. Please try again.', error);
            });
    });
});
