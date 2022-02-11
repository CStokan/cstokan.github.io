// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    
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
    function ValidateField(fieldID,regular_expression, error_message)
    {
        // Hide the alert message for invalid data
        let messageArea = $("#messageArea").hide()
        
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
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name.\n This must include at least a Capitalized First Name and Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
        
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
            })
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

    function DisplayLoginPage()
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }

    // Named function option
    function Start()
    {
        console.log("Welcome to my App!");

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