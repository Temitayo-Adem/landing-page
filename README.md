# Landing Page Project

## Table of Contents

For this project I tried to keep it fairly simple. I started by adding an additional section to the HTML and linking the javascript file at the bottom of the HTML file.

Note: I did have some difficulty trying to add the active class to a section when it is in the viewport. I found it difficult to determine the perfect moment in which the element is in the viewport, and have currently settled on when the element.getBoundingClientRect.top is greater than zero and the element.getBoundingClientRec.bottom is less than the innerHeight of the window(i.e when the whole vertical aspect of the element is in view). I would like to be a bit more specific than that. Currently, if the screen is sufficiently small and the section is sufficiently large, then there will be no responsive active state. I also think there is a more efficient way to create and call the function that checks if the section is in view. Currently the time complexity is n\*\*2 and I'm calling the function every 100ms regardless of scroll.
