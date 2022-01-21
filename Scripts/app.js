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

        // Step 1. get an entry point reference (insertion point / deletion point)
        let DocumentBody = document.body;
        let MainContent = document.getElementsByTagName("main")[0];
        
        // Step 2. create an element(s) to insert (p = <p></p>)
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

        // Step 3. configure the new element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the Main Paragraph";
        Article.setAttribute("class", "container");

        // Step 4. Add / Insert the new element
        // MainContent.appendChild(NewParagraph);
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

        // to insert before
        // target a location (element) to inset before
        // TargetElement.before(elementToInsert);

        // To delete
        //Article.remove();


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

    function DisplayContactPage()
    {
        console.log("Contact Page");
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