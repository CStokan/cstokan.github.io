// Project:       Lab 1 - WEBD6201
// Name:          Cooper Stokan & Onur Ozcanka
// Date Complete: February 4th, 2022
//
// This is lab is where we show off the fundamentals of 
// Javascript that we have learnt in these past few weeks

// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function()
{
    
    function DisplayHomePage() 
    {
        console.log("Home Page");
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function() 
        {
            location.href = "about.html";

        });

        // Step 1. get an entry point(s) (insertion point / deletion point) reference 
        let DocumentBody = document.body;
        let MainContent = document.getElementsByTagName("main")[0];

        // Step 2. create an element(s) to insert
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class ="mt-3">If you would like to learn more about us, you can click the link above.</p>`;

        // Step 3. configure the new element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.innerHTML = "<h3>Welcome User!</h3></br>This website is to showcase our JavaScript fundamentals we have learnt in the past few weeks.";
        Article.setAttribute("class", "container");

        // Step 4. Add / Insert the new element
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);



    }
    
    function DisplayProductsPage()
    {
        console.log("Projects Page");

        // Step 1. get an entry point reference (insertion point / deletion point)
        let DocumentBody = document.body;
        let MainContent = document.getElementsByTagName("main")[0];
        // Change products to project
        document.getElementById("header1").innerHTML = "Some of Our Favourite Projects</br></br>";
        // Injecting text into project page
        document.getElementsByClassName("featurette-heading")[0].innerHTML = `This Project <span class="text-muted">Working with Javascript</span>`
        document.getElementsByClassName("lead")[0].innerHTML = "The website you are looking at currently is one of my favourites I've worked on so far.  Working with Javascript is something I've been looking forward to doing since I started out at Durham College.  This project has made me very excited for the rest of the course.  I enjoy the intuitiveness of the language and also the real time editing that can be so easily done with lite-server."
        // Injecting text into project page
        document.getElementsByClassName("featurette-heading")[1].innerHTML = `My First Project <span class="text-muted">Hello World! - Using Python</span>`
        document.getElementsByClassName("lead")[1].innerHTML = "This project will always hold a place near and dear to me, this is the first few lines of code I had ever written.  Since then I was hooked, learning about programming and continuing to do so has had a monumental shift in how I live my life.  I always like to look back at this file and be proud of how far I've come in such little time."
        // Injecting text into project page
        document.getElementsByClassName("featurette-heading")[2].innerHTML = `Drawing Pyramids <span class="text-muted"> Using Python</span>`
        document.getElementsByClassName("lead")[2].innerHTML = "This project is one of my favourites because who wouldn't want to create some cool-looking pyramids. It asks the user how big they want their pyramids to be and, the pyramid you wanted is there."

    }


    function DisplayServicesPage()
    {
        console.log("Services Page");
        // Step 1. get an entry point reference (insertion point / deletion point)
        let DocumentBody = document.body;
        let MainContent = document.getElementsByTagName("main")[0];

        // Inject text
        document.getElementsByClassName("fs-5 text-muted")[0].innerHTML = `Here at WEBD6201 Lab 1 we offer many services, including but not limited to website hosting, QR codes for restaraunt with menus and, website building and management.`;
        document.getElementsByClassName("list-unstyled mt-3 mb-4")[0].innerHTML = `We can offer to host your website for free!  All you need to do is signup below to get started!`;
        document.getElementsByClassName("my-0 fw-normal")[0].innerHTML = `Free Website Hosting`;
        
        document.getElementsByClassName("list-unstyled mt-3 mb-4")[1].innerHTML = `We can take your restaraunt to the next level by implementing menus through a scan of a QR code, we will handle the graphics and all.`;
        document.getElementsByClassName("my-0 fw-normal")[1].innerHTML = `QR Codes and Menus for Restaraunts`;
        document.getElementsByClassName("card-title pricing-card-title")[1].innerHTML = `$350<small class="text-muted fw-light">/once</small>`;
        
        document.getElementsByClassName("list-unstyled mt-3 mb-4")[2].innerHTML = `At the Enterprise level, we can do anything you want when it comes to website building and managing.  Prices are negotiated and service is excellent for all enterprise members.`;
        document.getElementsByClassName("my-0 fw-normal")[2].innerHTML = `A customized  and managed website`;
        document.getElementsByClassName("card-title pricing-card-title")[2].innerHTML = `Contact Us<small class="text-muted fw-light"> For a quote</small>`;

    }

    function DisplayAboutPage()
    {

        console.log("About Page");


         // Step 1. get an entry point(s) (insertion point / deletion point) reference 
         let DocumentBody = document.body;
         let OnurParagraph = document.getElementById("Onur");
         let CooperParagraph = document.getElementById("Cooper");


        let OnurDetails = document.createElement("OnurDetails");
        let OnurDetalsContext = `<h2>Onur Ozkanca</h2>
        <p>Graduated from Durham College in 2022, Onur is an experienced programmer with a focus on delivering the best possible product to our customers.</p>`;

        let CooperDetails = document.createElement("CooperDetails");
        let CooperDetailsContext =`<h2>Cooper Stokan</h2>
        <p>Graduated from Durham College in 2022, Cooper is an experienced programmer who has a passion for cyber security.</p>`;

        OnurDetails.innerHTML = OnurDetalsContext;
        CooperDetails.innerHTML = CooperDetailsContext;

        OnurParagraph.appendChild(OnurDetails);
        CooperParagraph.appendChild(CooperDetails);
    }

    function DisplayContactPage()
    {
        console.log("Contact Page");

        // Form variable
        let contactSubmit = document.getElementById("contactForm");

        contactSubmit.addEventListener("submit", function(event)
        {
            // Redirects the user to the home page
            console.log(`Full Name: ${fullName.value}\nContact Number: ${contactNumber.value}\nEmail Address: ${emailAddress.value}`);
            setTimeout(function(){ location.href = "index.html"; }, 3000);
        });
    }
    
    // This function will create a new nav link and change the name of products to projects
    function ManipulateNavBar()
    {
        // Changing nav bar
        // Create new li to insert
        let NewNavLink = document.createElement("li");
        NewNavLink.setAttribute("class", "nav-item");
        // Add innerhtml for the li element
        let NavBarToAdd = `<a class="nav-link" href="#"><i class="fas fa-user-friends"></i> Human Resources</a>`
        NewNavLink.innerHTML = NavBarToAdd
        // Find navbar and then insert iinbetweeen about us and contact us
        let NavBar = document.getElementsByClassName("navbar-nav ms-auto mb-2 mb-lg-0")[0];
        console.log(NavBar);
        NavBar.insertBefore(NewNavLink, NavBar.childNodes[9]);

        // Changing Navbar from products to projects
        let ProjectNavBarLink = document.getElementsByClassName("nav-link")[1];
        ProjectNavBarLink.innerHTML = `<i class="fas fa-project-diagram"></i> Projects`;
        
        // Insert fixed bottom navbar fixed bottom navbar
        BottomNavBar = document.createElement("nav");
        BottomNavBar.setAttribute("class", "navbar fixed-bottom py-0 navbar-dark bg-dark");
        BottomNavBar.innerHTML = `<a class="navbar-brand text-muted">©Copyright Cooper & Onur Lab 1 2022</a>`;
        document.body.appendChild(BottomNavBar);
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
        }

    }


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
    // Call change navbar function
    window.addEventListener("load", ManipulateNavBar);
    
})();