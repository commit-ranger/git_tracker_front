


CREATE TABLE repositories(
    repo_id SERIAL PRIMARY KEY,
    creator_id numeric DEFAULT 1,
    awllowed_user TEXT DEFAULT [],
    account_admin TEXT DEFAULT [],
    can_modify TEXT DEFAULT [{},{}],
    repo_about TEXT DEFAULT {
        creator_name: "enter name",
        date_created: "1/1/2000",
        description: "enter description here"
        },
    repo_active BOOLEAN DEFAULT true
    sections numeric DEFAULT 3
)

CREATE TABLE files(
    file_id SERIAL PRIMARY KEY,
    <!-- repository_id  -->
    filename VARCHAR(255) DEFAULT "Filename",
    checked_status numeric,
    
    

    notes TEXT DEFAULT "enter notes here",

)

<!-- seed data  -->

{
    allowed_users: [2585,58675,1145,65845],
    account_admin: [1234],
    can_modify:[{
        position:1,
        color:blue,
        can_interact:[58675],
        is active:true
    },
    {
        position:2,
        color:blue,
        can_interact:[2234],
        is active:true
    }],
    repo_about {
        creator_name: "peter petigru",
        date_created: "1/1/2024",
        description: "This repo is the first and is a test"
    },
    repo_active:true,
    sections:2
}