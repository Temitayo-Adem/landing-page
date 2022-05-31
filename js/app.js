/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// Global variables that represent the unordered list element, an array of the section elements, and the height of the window respectively.
const navArea = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
const height = window.innerHeight;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function navBuilder() {
    // Creating a document fragment that I will append each list item to
    const docFrag = document.createDocumentFragment();
    // Iterating through each section element in order to dynamically
    // add list items (section names) to the navbar.
    for (const section of sections) {
        // Using the dataset/id property in order to
        // get the name of the href link and the name of the section
        const sectName = section.dataset.nav;
        const sectId = section.id;
        const listItem = document.createElement('li');
        // Giving the list items a horizontal display/appearance
        listItem.style = "display: inline-block;";
        // Using a template literal to add innerHTML to list items
        listItem.innerHTML = `<a href='#${sectId}'>${sectName}</a>`;
        // Giving list items the css class 'menu__link' as per stylesheet
        listItem.className = 'menu__link';
        docFrag.appendChild(listItem);
    }
    navArea.appendChild(docFrag);
}




// Add class 'active' to section when near top of viewport

function activate() {
    // Iterate through each section element
    for (let section of sections){
        // Determine the position of each section
        // Check if the section is in vertical view
        let sectionPosition = section.getBoundingClientRect();
        if ((sectionPosition.top >= 0 && sectionPosition.bottom <= height) || (sectionPosition.top >= -(.20 * sectionPosition.height)) &&  (sectionPosition.top <= (.8 * sectionPosition.height))) {
            // If the section is in view, remove active class from other sections
            // Add the active class to the section in view.
            
            let winner = section;
            for (let section of sections) {
                section.classList.remove('your-active-class');
            }
            winner.classList.add('your-active-class')

        }

    }


}
// Scroll to anchor ID using scrollTO event
function sectScroll(event) {
    // Prevent the default on-click property (jump-skip)
    event.preventDefault();
    // Get the href link and find the element with that Id
    const link = event.target.getAttribute('href');
    const toSect = document.querySelector(link);
    // offsetTop returns the top position of the element relative to it's parents
    // This property is useful because all of the sections have the same parent
    // The positioning of any given 'location' is relative to the parent element (main) 
    const location = toSect.offsetTop;
    window.scrollTo({
        top: location,
        behavior: 'smooth'
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
setTimeout(navBuilder,0);
// Scroll to section on link click
navArea.addEventListener('click',sectScroll);

// Set sections as active
setInterval(activate,100);



