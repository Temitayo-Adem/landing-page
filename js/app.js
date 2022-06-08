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
// Global variables that represent the unordered list element, a collection of the section elements, the height of the window, the pageHeader where the navbar resides, and a variable (isScrolling) used for timeouts respectively.
const navArea = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
let lastActiveSection = document.querySelector('.your-active-class');
const height = window.innerHeight;
const pageHeader = document.querySelector('.page__header');
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Function to remove the pageHeader from view when user is
// not at top of screen and not scrolling

function navSlide(e) {
    // Check whether the user is at the top of the document.
    // If so, display the navbar. If not, hide the navbar.
    if (document.body.scrollTop === 0) {
        pageHeader.style = "top: 0";
    } else {
        pageHeader.style = "top: -50px";
    }
}
function checker(){
    /* If user is scrolling, stop the setTimeout navSlide function and make sure the navbar is displayed
    */ 
    clearTimeout(isScrolling)
    pageHeader.style = "top: 0";
    // When user is finished scrolling call the navSlide function
    isScrolling = setTimeout(navSlide,2000, false);
}
/* Event listener that calls the checker function 
on scroll event*/ 
document.addEventListener('scroll',checker);

// Helper function used to initialize the sectScroll function
function turnOnSectScroll() {
    /* This function specifically targets the dynamically generated list items and adds/calls the event listener that
    creates a smooth scroll.
    */
    const menuLinks = document.getElementsByClassName('menu__link');
    for (let menuLink of menuLinks) {
        menuLink.addEventListener('click',sectScroll);
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function navBuilder() {
    // Creating a document fragment that I will append each list item to
    const docFrag = document.createDocumentFragment();
    /* Iterating through each section element in order to dynamically add list items (section names) to the navbar.
    */
    for (const section of sections) {
        /* Using the dataset/id property to get the name of the href link and the name of the section*/
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
    // Iterate through html collection of sections
    for (let section of sections){
        // Determine the position of each section
        // Check if the section is in vertical view
        let sectionPosition = section.getBoundingClientRect();
        if ((sectionPosition.top >= 0 && sectionPosition.bottom <= height) || (sectionPosition.top >= -(.20 * sectionPosition.height)) &&  (sectionPosition.top <= (.8 * sectionPosition.height))) {
            // If the section is in view, remove active class from previous active section.
            // Add the active class to the section in view.
            lastActiveSection.classList.remove('your-active-class');
            section.classList.add('your-active-class');
            lastActiveSection = section;


        }

    }


}
// Scroll to anchor ID using scrollTO event
function sectScroll(event) {
    // Prevent the default on-click property (jump-skip)
    event.preventDefault();
    // Get the href link and find the element with that Id
    const link = event.target.getAttribute('href');
    //  If the user did not click on the link element then do nothing.    
    if (link === null) {
        return 
    }
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

setTimeout(turnOnSectScroll,200);
// Set sections as active
setInterval(activate,100);



