// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {
  let selectedIndex = null;
  const userForm = document.getElementById("user-form"); // Get the user form element
  const usersList = document.getElementById("users"); // Get the users list element

  // Handle form submission
  userForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get user input values from the form
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const address = document.getElementById("address").value;
    const hobbies = document.getElementById("hobbies").value;
    const country = document.getElementById("country").value;
    const dob = document.getElementById("dob").value;

    // Create an object to store user data
    const user = {
      firstName,
      lastName,
      gender,
      address,
      hobbies,
      country,
      dob,
    };

    //  If selected data is null then insert or update
    if (!selectedIndex) {
      addUserToLocalStorage(user);
    } else {
      updateUserToLocalStorage(user);
    }

    // Update the displayed user list and reset the form
    updateUserList();
    userForm.reset();
  });

  // Function to add user data to local storage
  function addUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem("users")) || []; // Get existing users or create an empty array
    users.push(user); // Add the new user data
    localStorage.setItem("users", JSON.stringify(users)); // Update local storage
  }

  // Function to update the displayed user list
  function updateUserList() {
    usersList.innerHTML = ""; // Clear the existing user list
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get stored users

    // Iterate through each user and create list items for them
    users.forEach((user, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
              <strong>${user.firstName} ${user.lastName}</strong> (${user.gender})<br>
              Address: ${user.address}<br>
              Hobbies: ${user.hobbies}<br>
              Country: ${user.country}<br>
              Date of Birth: ${user.dob}<br>
              <button class="edit-btn" data-index="${index}">Edit</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
          `;
      usersList.appendChild(listItem); //The appendChild() method appends a element as the last child of an element.
    });

    // Attach event listeners to edit and delete buttons
    attachEventListeners();
  }

  // Function to attach event listeners to edit and delete buttons
  function attachEventListeners() {
    const editButtons = document.querySelectorAll(".edit-btn"); //The querySelectorAll() method returns all elements that matches a CSS selector.
    const deleteButtons = document.querySelectorAll(".delete-btn");

    // Add click event listener to each edit button
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index"); //The getAttribute() method returns the value of an element's attribute.
        selectedIndex = index;
        editUser(index); // Call editUser function with the index
      });
    });

    // Add click event listener to each delete button
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deleteUser(index); // Call deleteUser function with the index
      });
    });
  }

  // Function to populate form fields with user data for editing
  function editUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get stored users
    const user = users[index]; // Get the user at the specified index

    if (user) {
      // Populate form fields with user data
      document.getElementById("first-name").value = user.firstName;
      document.getElementById("last-name").value = user.lastName;
      document.querySelector(`input[value="${user.gender}"]`).checked = true;
      document.getElementById("address").value = user.address;
      document.getElementById("hobbies").value = user.hobbies;
      document.getElementById("country").value = user.country;
      document.getElementById("dob").value = user.dob;

      // deleteUser(index); // Delete the user after editing
    }
  }

  // Function to delete a user from local storage and update the list
  function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get stored users
    users.splice(index, 1); // Remove the user at the specified index
    localStorage.setItem("users", JSON.stringify(users)); // Update local storage
    updateUserList(); // Update the displayed user list
  }

  // Initial call to populate the user list when the page loads
  updateUserList();

  // Function to add user data to local storage
  function updateUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem("users")) || []; // Get existing users or create an empty array
    users[selectedIndex] = user;
    localStorage.setItem("users", JSON.stringify(users)); // Update local storage
    selectedIndex = null;
  }
});
