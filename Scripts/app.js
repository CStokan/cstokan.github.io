// Authors: Cooper Stokan and Onur Ozkanca
// Date: February 27th, 2022
// Assignment: Lab 2 - jQuery & Form Validation


// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{

    /**
     * This function uses AJAX to open a connection to the server and returns
     * the data payload to the callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {function} callback
     */
    function AjaxRequest(method, url, callback)
    {
        // AJAX STEPS for and AJAX request
        // Step 1 - instantiate an XHR object
        let XHR = new XMLHttpRequest();

        // Step 2 - Add an event listener for ready state
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                if(typeof callback === "function")
                {
                    callback(XHR.responseText);
                }
                else
                {
                    console.error("ERROR: callback not a function")
                }
            }
        });

        // Step 3 - Open a connection to the server
        XHR.open(method, url);

        // Step 4 - Send the request to the server
        XHR.send();

    }



    /**
     * This function loads the header.html content into the page
     *
     * @param {string} html_data
     */
    function LoadHeader(html_data)
    {
        // Inject navbar into the header
        $("header").html(html_data);
        // Update active link in navbar
        $(`li>a:contains(${document.title})`).addClass("active"); 



        // Check if user is logged in
        checkLogin();
    }
    
    function DisplayHomePage()
    {
        console.log("Home Page");
            
        // 1) Fattest Memory Footprint
        // Trying to create the about us button above with jQuery
        // jQuery way - get all elements with an id of AboutUsButton and for each element add a "click" event
        $("#AboutUsButton").on("click", function(){
            location.href = "about.html";
        });

        // jQuery editing
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);



    }
    
    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayAboutPage()
    {
        console.log("About Page");
    }


    /**
     * This function adds a Contact object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This function is used to validate the fields of the contact form
     * 
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID,regular_expression, error_message, message_box)
    {
        // Hide the alert message for invalid data
        let messageArea = $(message_box).hide()
        
        // Field Id sent
        $("#" + fieldID).on("blur", function()
        {
            // Declare value of full name
            let text_value = $(this).val();
            // tests if full name is valid
            if(!regular_expression.test(text_value))
            {
                $(this).trigger("focus").trigger("select");
                // Set alert box to danger mode
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                // Does pass tast - resets the alert box
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        // Call the validation functions
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name.\n This must include at least a Capitalized First Name and Last Name.", "#messageArea");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555", "#messageArea");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.", "#messageArea");
        
    }

    /**
     * Form validation for the register user
     * 
     *@returns {void}
     */
    function RegisterFormValidation()
    {
        // Call the validation functions
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.", "#ErrorMessage");

        ValidateField("firstName", /^[a-z ,.'-]{2,}$/i, "Please enter a valid First Name", "#ErrorMessage");

        ValidateField("lastName", /^[a-z ,.'-]{2,}$/i, "Please enter a valid Last Name", "#ErrorMessage");

        ValidateField("password", /^[a-zA-Z0-9!.@#$%^&*]{6,}$/, "Please enter a valid password.  Example: 6 or more characters.", "#ErrorMessage"); 
        ValidateField("confirmPassword", /^[a-zA-Z0-9!.@#$%^&*]{6,}$/, "Please enter a valid password.  Example: 6 or more characters.", "#ErrorMessage");    
        
    }

    function DisplayContactPage()
    {
        console.log("Contact Page");

        // Call validation function
        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            // event.preventDefault(); // right now for testing only
            if(subscribeCheckbox.checked)
            {
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {


        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage); // Returns a list of keys from local storage

            let index = 1;

            // for every key in the keys string array
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data value 
               
                let contact = new core.Contact(); // Creates an empty contact
                contact.deserialize(contactData)

                

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>`;

                index++;
            }

            contactList.innerHTML = data;

            // Add contact button on click to take us to edit.html
            $("#addButton").on("click", ()=>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                // confirm is a yes no alert/message box
                if(confirm("Are you sure?"))
                {
                    // The value is the value up in the button aka key
                    localStorage.removeItem($(this).val())
                }
                // refresh the contact list page
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                // adds the this.val to the hash 
                location.href = "edit.html#" + $(this).val();
            });
        }
    }



    function DisplayEditPage()
    {
        console.log("Edit Page");

        // Call validation
        ContactFormValidation();

        // Start the page after the hashtag
        let page = location.hash.substring(1);

        // see the key on log
        console.log(page);

        switch(page)
        {
            case "add":
                {
                    // Change H1 from edit to add
                    $("main>h1").text("Add Contact");
                    // Change edit button to add 
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        // Prevent default to stop the form from working
                        event.preventDefault();
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        location.href = "contact-list.html";
                    });


                }
                break;
            default:
                {
                    // Gets contact information from local storage
                    let contact = new core.Contact();

                    // Get the contact from the page/key
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // Page is the key
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // get changes from the page
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
    
                        // Prevent default to stop the form from normal behaviour
                        localStorage.setItem(page, contact.serialize());
                        location.href = "contact-list.html";
                    });
                    
                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                    
                }
                break;
        }
        
    }

    // Displays user login page
    function DisplayLoginPage()
    {
        console.log("Login Page");

        // insert div message area
        $("<div><div>").insertAfter("#whereToInsert").attr('id', "messageArea");

        let messageArea =  $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;
            // create an empty user object
            let newUser = new core.User();
            

            // uses jQuery shortcut to load the users.json file
            $.get("./Data/users.json", function(data)
            {
                // for every user in the users.json file
                for (const user of data.users) 
                {
                    // check if the username and password entered in the form matches this user
                    if(username.value == user.Username && password.value == user.Password)
                    {
                        // get the user data from the file and assign to our empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                 // if username and password matches - success.. the perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    // hide any error message
                    messageArea.removeAttr("class").hide();

                    // redirect the user to the secure area of our site - contact-list.html
                    location.href = "contact-list.html";
                }
                // else if bad credentials were entered...
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information").show();
                    console.log(messageArea);
                }
            });
        });

        $("#cancelButton").on("click", function()
        {
            // clear the login form
            document.forms[0].reset();

            // return to the home page
            location.href = "index.html";
        });
    }

    /**
     * This function takes the logged in user and puts there name into the navbar
     *
     */
    function userNameNavBar()
    {
        // Added functionality to display users login name
        let userData = sessionStorage.getItem('user'); // get localStorage data value 
        let userArray = userData.split(",");
        console.log($(`
        <li class="nav-item" id="login">
            <a class="nav-link" href="#"><i class="fas fa-user"></i> ${userArray[0]}</a>
        </li>`).insertBefore("#login"));
    }


    function checkLogin()
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            ); 
            
            userNameNavBar();

            // logout if logged in
            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // redirect back to login
                location.href = "login.html";

            });
        }
    }

    /**
     * Displays the register page
     * @return {void}
     */
    function DisplayRegisterPage()
    {
        console.log("Register Page");
        
        // Prevent default
        $("#registerForm").attr("onsubmit", "event.preventDefault()");

        // Insert div into the html
        $("<div><div>").insertAfter("#whereToInsert").attr('id', "ErrorMessage");

        // Let message area valid
        let messageArea =  $("#ErrorMessage");
        messageArea.hide();
        
        // Call register form validation
        RegisterFormValidation();
        

        // logout if logged in
        $("#submitButton").on("click", function()
        {
            // Get the values
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let emailAddress = $("#emailAddress").val();
            let password = $("#password").val();
            let confirmPassword = $("#confirmPassword").val();
            // Makes sure the values have been entered
            if (firstName === "" || lastName === "" || emailAddress === "")
            {
                // Set alert box to danger mode
                messageArea.addClass("alert alert-danger").text("None of the fields can be empty.").show();
            }
            else if(password === confirmPassword && password !== "" && confirmPassword !== "") // Success
            {
                // hide any errors
                messageArea.hide();
                // Make an instance of user
                let newUser = new core.User();
                newUser.FirstName = firstName;
                newUser.LastName = lastName;
                newUser.EmailAddress = emailAddress;
                newUser.Username = firstName + lastName;
                newUser.Password = password;

                // console log the user
                console.log(newUser.toString());
                // clear the login form
                document.forms[0].reset();
            }else // if the passwords do not match
            {
                // Set alert box to danger mode
                messageArea.addClass("alert alert-danger").text("The passwords have to match and cannot be empty.").show();
            }
        });
        
    }

    // Named function option
    function Start()
    {
        console.log("Welcome to my App!");

        // Adds header to all files
        AjaxRequest("GET", "header.html", LoadHeader);

        

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }


    // Anonymous function
    //let Start = function()
    //{
    //    console.log("App Started!");
    //}

    // Git commands/help
    // git init (initializes and creates a hidden .git folder)
    // git add . (add everything "." to the staging area)
    // git commit -m "initial commit" ("-m" sends the quoted message to the commit)
    // GitHub (Cloud service)
    // We make a remote repo and connect our local files into the cloud repo
    // establish remote
    // git remote add origin "path to remote"
    // push (upload)
    // pull (downnload)
    // git push -U origin main

    // Calls the function when the window loads using an event listener
    window.addEventListener("load", Start);
    
})();