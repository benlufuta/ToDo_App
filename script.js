// Get a reference to the button element with id 'addButton'
let addBtn = document.querySelector('#addButton');

// Get a reference to the input element with id 'inputBox'
let inputVal = document.querySelector('#inputBox');

// Get a reference to the unordered list element with id 'listAllItems'
let list = document.querySelector('#listAllItems');

// Function to handle adding an item to the list
function addFunction(event) {

    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if the input value is not empty
    if (inputVal.value.trim() !== "") {

        // Create a new list item element
        let item = document.createElement('li');
        
        // Set the text content of the list item to the trimmed input value
        item.textContent = inputVal.value.trim();

        // Append the list item to the unordered list
        list.appendChild(item);

        // Create an image element
        let img = document.createElement('img');
        // Add a class name to the image element
        img.classList.add('item-image');
        // Set the src attribute of the image element to the URL of the image you want to display
        img.src = 'images/deleteIcon.png'; 
        // Append the image element to the list item
        item.appendChild(img);

        img.addEventListener('click', function() {
            // Remove the parent <li> element when image is clicked
            item.remove();
            saveData();
        });

        //When clicked on, an element of the list is assigned
        //the classname "complete", which results
        //in a line-through being added and the color changing
        //to indicate that the task has been completed. 
        item.addEventListener('click', function() {
            
            if (item.classList.contains('completed')) {

                item.classList.remove('completed');

            } else {

                item.classList.add('completed');

            }
        });

        // Clear the input box after adding to the list
        inputVal.value = '';
        saveData();
        
    } else {

        // Display an alert if the input value is empty
        alert('Invalid Entry. Please type something in the box.');
    }
}
// Add event listener to the button, invoking addFunction when clicked
addBtn.addEventListener('click', addFunction);

// Save data to LocalStorage
function saveData() {
    // Store the HTML content of the list in localStorage
    localStorage.setItem('data', list.innerHTML);
}

// Retrieve data and restore the list from LocalStorage
function restoreData() {
    // Retrieve the HTML content of the list from localStorage
    list.innerHTML = localStorage.getItem('data');
    // Reapply event listeners to list items
    let items = document.querySelectorAll('#listAllItems li');
    items.forEach(item => {
        // Add event listener to delete button
        item.querySelector('img').addEventListener('click', function() {
            // Remove the parent <li> element when image is clicked
            item.remove();
            // Save the updated list to localStorage
            saveData();
        });
        // Add event listener to toggle 'completed' class
        item.addEventListener('click', function() {
            // Toggle the 'completed' class of the clicked <li> element
            item.classList.toggle('completed');
            // Save the updated list to localStorage
            saveData();
        });
    });
}

// Call restoreData function when the page is loaded
document.addEventListener("DOMContentLoaded", restoreData);