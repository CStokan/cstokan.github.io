(function (core) {

    class User
    {
        // getters and setters
        get DisplayName()
        {
            return this.m_displayName;
        }
        set DisplayName(name)
        {
            this.m_displayName = name;
        }

        get EmailAddress()
        {
            return this.m_emailAddress;
        }

        set EmailAddress(email_address)
        {
            this.m_emailAddress = email_address;
        }

        get Username()
        {
            return this.m_username;
        }

        set Username(username)
        {
            this.m_username = username;
        }

        get Password()
        {
            return this.m_password;
        }

        set Password(password)
        {
            this.m_password = password;
        }

        set FirstName(first_name)
        {
            this.m_firstName = first_name;
        }

        get FirstName()
        {
            return this.m_firstName;
        }

        set LastName(last_name)
        {
            this.m_lastName = last_name;
        }

        get LastName()
        {
            return this.m_lastName;
        }


        // Constructor
        constructor(firstName = "", lastName = "", emailAddres = "", userName = "", password = "")
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddres;
            this.Username = userName;
            this.Password = password;
        }


        // method overrides
        toString()
        {
            return `Display Name    : ${this.FirstName}  ${this.LastName}\nEmail Address : ${this.EmailAddress} \nUsername : ${this.Username}`;
        }

        // Utiility methods

        // Returns a JSON object
        toJSON()
        {
            return{
                "FirstName": this.FirstName,
                "LastName": this.LastName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username,
                "Password": this.Password
            }
        }

        fromJSON(data)
        {
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        // Serialize method
        // Return a string of object or a null
        serialize()
        {
            if(this.FirstName !== "" && this.FirstName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.FirstName}, ${this.LastName},${this.EmailAddress},${this.Username}`;
            }
            else
            {
                // Throw an error in console
                console.error("One or more properties of the User is empty");
                return null;
            }
        }

        // Deserialize method
        // Adds object to property array
        deserialize(data)
        {
            let propertyArray = data.split(",");

            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
        }


    }

    core.User = User;



})(core || (core={}));