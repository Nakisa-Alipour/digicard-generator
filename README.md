# DIGICARD-GENERATOR

Welcome to Digicard Generator, a powerful tool for creating and managing your digital business cards. This full stack application allows you to effortlessly generate professional digital business cards and manage your work profiles, all in one place.


![Untitled video](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/bdc6b9fb-c907-4bb9-92b4-eacfa84ee474)


## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technical Features](#technical-features)
- [Screenshots of the application](#screenshots-of-the-application)
- [Contributing](#contributing)
- [Link to deployed application](#Link-to-deployed-application) 

## User Story

```md
AS AN employee meeting new people
I WANT to have a digital business card with QR code
SO THAT my business card information will be accessible and be able to be downloaded in contact list of devices.

## Acceptance Criteria

```md
Accessing Home Page:

Given: I am on the "Home" page.
When: I go to the "Home" page.
Then: I should see a page with a login and signup options in the header.
Logging In:

Given: I am on the header's "Home" page.
When: I click on the login option.
Then: The "Login" page should appear, allowing me to enter my registered email and password.
Signing Up:

Given: I am on the header's "Home" page.
When: I click on the signup option.
Then: The "Signup" page should appear, prompting me to enter my username, email, and password.
Viewing Work Profile:

Given: I am logged in.
When: I click on the "View My Profile" link in the header.
Then: I should be directed to my "Work Profile" page.
Managing Work Profiles:

Given: I am on my "Work Profile" page and have previously created work profile(s).
When: I visit my "Work Profile" page.
Then: I should see a list of my work profiles, each with options to delete or update. Additionally, I should be able to create new work profiles by completing the work information form.
Business Card Preview:

Given: I am on my "Work Profile" page.
When: I click on the "Business Card Preview" link for a specific work profile or when I create a new work profile.
Then: The "Card Preview" page should be displayed, illustrating the related business card with a captivating flip action. The front side should showcase my full name, while the back side presents the entered work information. Furthermore, a downloadable QR code associated with the work information should be created and attached to the back of the business card.
Card Download Options:

Given: I am on the "Card Preview & Download" page.
When: I click on the "Card Preview & Download" link.
Then: I should see a business card displaying my full name and work information, along with a QR code. The page should offer distinct buttons to download the QR code or the business card.
QR Code Scanning:

Given: A QR code associated with my work information has been scanned.
When: The QR code is scanned by a device.
Then: The user's work information should be displayed, and it should be possible to save this information to the contact list on the device.
```

[🔼back to table of contents ](#table-of-contents)


## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory:` cd react-portfolio`
3. Install the dependencies: ` npm install `


[🔼back to table of contents ](#table-of-contents)


## Usage

To start the development server, run the following command: ` npm run develop `
Open your browser and visit http://localhost:3000 to view the portfolio.


[🔼back to table of contents ](#table-of-contents)


## Features

- User Authentication:
Register and log in securely to access your work profiles.

- Work Profile Management:
Create, view, update, and delete work profiles.

- Business Card Preview:
Preview business cards with a flip animation.
Download the business card and associated QR code.

- QR Code Integration:
Generate a QR code containing your work information.
Allow others to scan and save your contact information easily.

[🔼back to table of contents ](#table-of-contents)


## Technical Features

 * Application uses React for the front end.

  * Application has a GraphQL API with a Node.js and Express.js server, and uses queries and mutations for retrieving, adding, updating, and deleting data.

  * Application uses MongoDB and the Mongoose ODM for the database and protects sensitive API key information on the server.

  * Application includes user authentication using JWT.

[🔼back to table of contents ](#table-of-contents)


## Screenshots of the application

- Home page:
  

  
![Homepage-screenshot](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/e29ba49a-0607-4dd1-9273-887f227da2f0)



- Login page:

  

![Login-Screenshot](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/df1c06a0-8d30-419a-9ddd-974f423c34e0)



- Signup page:
  


![signup-Screenshot](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/dbb7b875-375e-4200-b626-6ceded3c51c5)



- Work profile page:



![WorkProfile-Screenshot](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/f86c434f-59f1-4700-9352-91b66b2dbf05)



- Update work profile page:



![UpdateWorkProfile-Screenshot](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/6a0feb9a-708a-46a3-996f-3fb1a33a1429)



- Preview and downlaod card page:



![DownloadCard-Screenshot](https://github.com/Nakisa-Alipour/digicard-generator/assets/124220654/a1ffc17c-0f4f-4c63-8541-251f5305dd84)




[🔼back to table of contents ](#table-of-contents)


## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Commit your changes with descriptive commit messages
5. Push your changes to your forked repository
6. Submit a pull request explaining your changes


[🔼back to table of contents ](#table-of-contents)


## Link to the application:
- Github repository: https://github.com/Nakisa-Alipour/digicard-generator


  

[🔼back to table of contents ](#table-of-contents)


