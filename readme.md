# Website for UI Design Resources

A website to explore and download great UI design kits & templates for awesome projects

Visit website: [http://ui-design.leminect.com](http://ui-design.leminect.com)

Some pages:

![Website mockup](https://drive.google.com/uc?export=view&id=1SCM1eeFa0WpJ36KqMgOX-4NK_y-9sxDE)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install for running the server

```
Node.js
```

### Installing & getting started

Clone this project and open with Visual Studio Code(preferred) or any text editor

```
git clone https://github.com/dou-d/UI-Design-Resources-Website.git
```

Install the required Node.js dependencies

```
npm install
```

Start the node.js server (currently at port 8000)

```
node server.js
```

Before releasing, change contact us email address in views/partials/navbar.ejs

```
Change: "email@address.com" to your actual email address
```

Change the example website URL in config/data.json

```
Change all: "https://YOUR-WEBSITE.com" to your actual website URL
```

And add more design resources. Use 600x450 px (4:3 aspect ratio) image for thumbnail and image with 1200 px width for design image(in download page).

Initially, you will find "People also viewed" section empty as there is only one design resource in each category ("People also viewed" section contains 3 randomly selected resources form same category). So, you need to add more design resources for each category.

## Built With

* [Node.js](https://nodejs.org/en/) - For programming this server
* [EJS](https://ejs.co/) - Template engine
* [npm](https://www.npmjs.com/) - Package Manager

## Contributing

All the helpful pull requests will be accepted.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details