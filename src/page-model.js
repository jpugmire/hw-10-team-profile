// create the team
function generateTeam (team) {

    // create the manager html
    const generateManager = manager => {
        return `
        <div class="card">
            <div class="card-header">
                <h2>${manager.name}</h2>
                <h3>${manager.getRole()}</h3>
            </div>
            <div class="card-body">
                ID: ${manager.getId()}<br></br>
                Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a><br></br>
                Office Number: ${manager.getOfficeNumber()}
            </div>
        </div>
        `;
    };

    // create the html for engineers
    const generateEngineer = engineer => {
        return `
        <div class="card">
            <div class="card-header">
                <h2>${engineer.getName()}</h2>
                <h3>${engineer.getRole()}</h3>
            </div>
            <div class="card-body">
                ID: ${engineer.getId()}<br></br>
                Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a><br></br>
                Github: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a>
            </div>
        </div>
        `;
    };

    // create the html for interns
    const generateIntern = intern => {
        return `
        <div class="card">
            <div class="card-header">
                <h2>${intern.getName()}</h2>
                <h3>${intern.getRole()}</h3>
            </div>
            <div class="card-body">
                ID: ${intern.getId()}<br></br>
                Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a><br></br>
                School: ${intern.getSchool()}
            </div>
        </div>
        `;
    };

    let html;

    //get mgr
    //add to html

    let manager = team.filter(employee => employee.getRole() === "Manager");
    html += generateManager(manager[0]);

    //get engineers
    let eng = team.filter(employee => employee.getRole() === "Engineer");
    let engHtml = eng.map(e => generateEngineer(e)).join("");

    //get interns
    let interns = team.filter(employee => employee.getRole() === "Intern");
    let internHtml = interns.map(e => generateIntern(e)).join("");

    let finalHtml = (html += engHtml += internHtml)
    return finalHtml;
    //team object holds employees
    //employee.getRole
    

    // html.push(team
    //     .filter(employee => employee.getRole() === "Manager")
    //     .map(manager => generateManager(manager))
    // );
    // html.push(team
    //     .filter(employee => employee.getRole() === "Engineer")
    //     .map(engineer => generateEngineer(engineer))
    //     .join("")
    // );
    // html.push(team
    //     .filter(employee => employee.getRole() === "Intern")
    //     .map(intern => generateIntern(intern))
    //     .join("")
    // );

    // return html.join("");

}

// export function to generate entire page
module.exports = team => {

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>New Team</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="page-header"><h1>New Team</h1></div>
    <div class="content-wrapper">
        ${generateTeam(team)}
    </div>
</body>
</html>
    `;
};