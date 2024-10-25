<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://firebase-auth-cvpf.onrender.com">
    <img src="public/favicon.png" alt="Logo" width="100">
  </a>

  <h3 align="center">Firebase Auth with JWT</h3>

  <p align="center">
    Secure backend authentication system using Firebase for user management and JWT for token-based access control, built with Node.js and Express.
 <br />
    <a href="https://firebase-auth-cvpf.onrender.com"><strong>Check the website »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="public/ss.png" alt="Logo" width="90%" height="90%">
<br />
<br />
<p>
Secure backend authentication system using Firebase for user management and JWT for token-based access control, built with Node.js and Express
</p>
<br />
<br />

### Built With

- [![EJS][EJS]][JWT]
- [![Node][Node.js]][Node-url]
- [![Express][Express]][Express-url]
- [![Firebase][Firebase]][Firebase-url]
- [![JWT][JWT]][JWT]

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get your Firebase configuration at Firebase Console.
2. Clone the repo
   ```sh
   git clone https://github.com/VhalennnG/firebase_jwt_auth.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your Firebase configuration in config.js:
   ```js
   const firebaseServiceAccount = {
     type: process.env.FIREBASE_TYPE,
     project_id: process.env.FIREBASE_PROJECT_ID,
     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
     client_email: process.env.FIREBASE_CLIENT_EMAIL,
     client_id: process.env.FIREBASE_CLIENT_ID,
     auth_uri: process.env.FIREBASE_AUTH_URI,
     token_uri: process.env.FIREBASE_TOKEN_URI,
     auth_provider_x509_cert_url:
       process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
     universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
   };
   ```

<!-- CONTACT -->

## Contact

Vhalen_G - [vhalentinog@gmail.com](mailto:vhalentinog@gmail.com)

Project Link: [Firebase Auth with JWT](https://github.com/VhalennnG/firebase_jwt_auth)

## Other Credits

[Fivera](https://codepen.io/fivera/details/kQJzxP)

[Ivan Grozdic](https://codepen.io/ig_design/details/KKVQpVP)

[anhat.dev](https://codepen.io/nhatanh17/details/VwwVmLK)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-ss]: public/ss.png
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en
[Express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[EJS]: https://img.shields.io/badge/ejs-8C8C8C?style=for-the-badge&logo=ejs&logoColor=white
[EJS-url]: https://ejs.co/
[Firebase]: https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
[JWT]: https://img.shields.io/badge/JWT-990000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[JWT-url]: https://jwt.io/
