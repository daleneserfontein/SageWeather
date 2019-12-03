This application will do CRUD operations on a file as json objects

Run the following in a command prompt
    node app.js --help
    This will list what this application can do.  Examples
    
    node app.js list 
        --filename "filename" 
        => this will list all entries in the "filename" file
    node app.js clear 
        --filename "filename"
        => this will remove all contents from the "filename" file
    node app.js get 
        --id id 
        --filename "filename" 
        => this will get a single json entry from the file "filename" with the id "id"
    node app.js add 
        --id id 
        --body "body of the file" 
        --filename "filename" 
        => this will add a json entry to the file "filename" with the id "id" and "body" specified
    node app.js edit 
        --id id 
        --body "body of the file" 
        --filename "filename" 
        => this will edit a json entry in the file "filename" with the id "id" and change the body to "body of the file" specified
    node app.js remove 
        --id id 
        --filename "filename" 
        => this will remove the json entry in the file "filename" with the id "id"
    
        
