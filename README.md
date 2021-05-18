<!-- ABOUT THE PROJECT -->
## TOUCHAT

A chat application that allows video conferencing.


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Requirements

Installing Node.js

* Using macOs:
  ```sh
  $ curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/
  ```
  
* Using Homebrew:
  ```sh
  $ brew install node
  ```


You will need to download the following dependencies

* npm
  ```sh
  $ npm install http
  $ npm install socket.io
  $ npm install express-handlebars
  $ npm install body-parser
  ```



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ahmedwab/touchat/
   ```
2. Run the server.js program
   ```sh
    node server.js
   ```








<!-- CONTRIBUTING -->
## Contributing

Contributing is greatly encouraged.

1. Fork the Project
2. Create your Feature Branch 
3. Commit your Changes 
4. Push to the Branch 
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Ahmed Abdelfattah - [@ahmedwab](https://linkedin.com/in/ahmedwab) - linkedin

