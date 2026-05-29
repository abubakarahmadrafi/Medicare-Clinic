// =============================================
//   MEDICARE CLINIC - MAIN JAVASCRIPT FILE
// =============================================


// =============================================
// FEATURE 1: NAVBAR SCROLL EFFECT
// When user scrolls down 50px, navbar turns white
// When back at top, navbar goes back to blue
// =============================================

window.addEventListener('scroll', function () {

    // Find the navbar element using its id
    var navbar = document.getElementById('mainNavbar');

    // window.scrollY tells us how many pixels user has scrolled down
    if (window.scrollY > 50) {

        // Add white background class (defined in style.css)
        navbar.classList.add('navbar-scrolled');

        // Remove the blue background class
        navbar.classList.remove('bg-primary');

    } else {

        // User is back at top - restore blue background
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('bg-primary');
    }
});


// =============================================
// FEATURE 2: STATS COUNTER ANIMATION
// Numbers count up from 0 to target value
// Only works on home page where these ids exist
// =============================================

// This function counts a number up from 0 to target
function animateCounter(elementId, target, suffix) {

    // Find the element by its id
    var element = document.getElementById(elementId);

    // If element not found (we are not on home page), stop
    if (!element) return;

    var current = 0;
    var increment = target / 60; // Divide target into 60 small steps

    // setInterval runs the code inside every 30 milliseconds
    var timer = setInterval(function () {

        current += increment; // Add increment each step

        // Once we reach the target, stop the counter
        if (current >= target) {
            current = target;
            clearInterval(timer); // Stop setInterval
        }

        // Math.floor removes decimal points (e.g. 10.5 becomes 10)
        // textContent updates what is shown on screen
        element.textContent = Math.floor(current) + suffix;

    }, 30);
}

// Run all 3 counters when the page finishes loading
window.onload = function () {
    animateCounter('patients', 500, '+'); // Counts to 500+
    animateCounter('doctors',  20,  '+'); // Counts to 20+
    animateCounter('years',    10,  '+'); // Counts to 10+
};


// =============================================
// FEATURE 3: DOCTOR FILTER BY SPECIALTY
// Clicking a button shows only matching doctors
// Other doctor cards are hidden
// =============================================

// Get all elements that have class filter-btn
var filterButtons = document.querySelectorAll('.filter-btn');

// Loop through each filter button and attach a click event
filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {

        // Step 1: Remove active class from ALL buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        // Step 2: Add active class to the button that was clicked
        this.classList.add('active');

        // Step 3: Read data-filter value from clicked button
        // e.g. "cardiologist" or "dentist" or "all"
        var filter = this.getAttribute('data-filter');

        // Step 4: Get all direct child divs inside doctorsContainer
        var doctorCards = document.querySelectorAll('#doctorsContainer > div');

        // Step 5: Loop through every doctor card
        doctorCards.forEach(function (card) {

            // Read the data-specialty attribute from this card
            var specialty = card.getAttribute('data-specialty');

            // If filter is "all" OR specialty matches the filter
            if (filter === 'all' || specialty === filter) {
                card.style.display = 'block'; // Show this card
            } else {
                card.style.display = 'none'; // Hide this card
            }
        });
    });
});


// =============================================
// FEATURE 4: DOCTOR SEARCH BAR
// Filters doctor cards in real time as user types
// =============================================

// Find the search input field by its id
var searchInput = document.getElementById('searchInput');

// Only run this code if searchInput exists on the page
if (searchInput) {

    // keyup fires every time user releases a keyboard key
    searchInput.addEventListener('keyup', function () {

        // Get what user typed, convert to lowercase for comparison
        var searchText = this.value.toLowerCase();

        // Get all doctor cards
        var doctorCards = document.querySelectorAll('#doctorsContainer > div');

        doctorCards.forEach(function (card) {

            // Read data-name attribute from the card (already lowercase in HTML)
            var doctorName = card.getAttribute('data-name');

            // includes() checks if searchText exists inside doctorName
            if (doctorName.includes(searchText)) {
                card.style.display = 'block'; // Show matching card
            } else {
                card.style.display = 'none'; // Hide non-matching card
            }
        });
    });
}


// =============================================
// FEATURE 5: SERVICES READ MORE TOGGLE
// Shows or hides extra text on service cards
// Button text changes between Read More / Read Less
// =============================================

function toggleReadMore(extraId, button) {

    // Find the hidden div by its id (e.g. "extra1")
    var extraInfo = document.getElementById(extraId);

    // Check if the div is currently hidden
    if (extraInfo.style.display === 'none' || extraInfo.style.display === '') {

        // Show the extra info
        extraInfo.style.display = 'block';

        // Change button text to Read Less
        button.textContent = 'Read Less';

        // Change button style from outline to solid
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');

    } else {

        // Hide the extra info again
        extraInfo.style.display = 'none';

        // Change button text back to Read More
        button.textContent = 'Read More';

        // Change button style back to outline
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
    }
}


// =============================================
// FEATURE 6: APPOINTMENT FORM VALIDATION
// Checks all fields when submit button is clicked
// Shows red error messages for invalid fields
// Shows green success message if all fields valid
// =============================================

function validateForm(event) {

    // Stops the browser from reloading the page on submit
    event.preventDefault();

    // Get the value from each field and trim() removes extra spaces
    var name   = document.getElementById('fullName').value.trim();
    var email  = document.getElementById('email').value.trim();
    var phone  = document.getElementById('phone').value.trim();
    var doctor = document.getElementById('doctor').value;
    var date   = document.getElementById('apptDate').value;
    var time   = document.getElementById('apptTime').value;

    // This variable tracks if everything is valid
    // We set it to false as soon as any field fails
    var isValid = true;

    // --- CHECK NAME ---
    if (name === '') {
        // Show error message by changing display to block
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        // Hide error message
        document.getElementById('nameError').style.display = 'none';
    }

    // --- CHECK EMAIL ---
    // Email must contain @ and a dot
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // --- CHECK PHONE ---
    // Phone must be exactly 11 characters and all digits
    if (phone === '' || phone.length !== 11 || isNaN(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }

    // --- CHECK DOCTOR ---
    // Value is empty string if user did not select anything
    if (doctor === '') {
        document.getElementById('doctorError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('doctorError').style.display = 'none';
    }

    // --- CHECK DATE ---
    if (date === '') {
        document.getElementById('dateError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('dateError').style.display = 'none';
    }

    // --- CHECK TIME ---
    if (time === '') {
        document.getElementById('timeError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('timeError').style.display = 'none';
    }

    // --- ALL FIELDS VALID ---
    if (isValid) {
        // Hide the form
        document.getElementById('appointmentForm').style.display = 'none';
        // Show the green success message
        document.getElementById('successMsg').style.display = 'block';
    }
}


// =============================================
// FEATURE 7: CONTACT FORM VALIDATION
// Same idea as appointment form but only 3 fields
// =============================================

function sendMessage(event) {

    // Stop page from reloading
    event.preventDefault();

    var name    = document.getElementById('contactName').value.trim();
    var email   = document.getElementById('contactEmail').value.trim();
    var message = document.getElementById('contactMessage').value.trim();

    var isValid = true;

    // Check name
    if (name === '') {
        document.getElementById('contactNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('contactNameError').style.display = 'none';
    }

    // Check email
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        document.getElementById('contactEmailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('contactEmailError').style.display = 'none';
    }

    // Check message
    if (message === '') {
        document.getElementById('contactMessageError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('contactMessageError').style.display = 'none';
    }

    // If all valid - hide form and show success message
    if (isValid) {
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('contactSuccessMsg').style.display = 'block';
    }
}