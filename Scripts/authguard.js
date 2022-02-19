"use strict";
((function(){
    
    // Check if user is logged in - if not redirect
    if(!sessionStorage.getItem("user"))
    {
        location.href = "login.html";
    }

}))();