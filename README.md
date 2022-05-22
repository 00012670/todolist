## To do list

# Description

The web application is designed to create a to-do list. You can enter any sentence in the input field by clicking the "+" button. To create a new page with a different category of notes, you can type in the search box "<http://localhost:3000/anyword> ." Alternatively, you can delete the text by simply pressing the checkbox.

#The user interface allows you to:

##### 1- CREATE a page of any category,

##### 1- CREATE note,

##### 2- REMOVE note



# Instructions on how to run the app locally

Before starting project, first you should install npm packages.

```bash
npm install
```

Then, to start project run following command

```bash
node app.js
```

If you have a nodemon package, run the next command

```bash
nodemon
```

Open <http://localhost:3000> to view it in the browser.\


You have to install MongoDB on your computer to run the (to-do list) web application.

If you can't install MongoDB, you can use hosted link, which is stated below.

The link is as follows https://hidden-forest-18849.herokuapp.com/



## Application dependencies’ list

"body-parser": "^1.20.0",

"ejs": "^3.1.8",

"express": "^4.18.1",

"lodash": "^4.17.21",

"mongoose": "^6.3.4"



## Architecture of the project

1.  public
    /css
    -   styles.css
2.  views
    /include
    -   footer.ejs
    -   header.ejs
    -   about.ejs
    -   list.ejs
3.  app.js
4.  date.js
5.  package.json


## 🔗 Links

Github repo link --> https://github.com/00012670/todolist.git\
Hosted link --> https://hidden-forest-18849.herokuapp.com

## License

[ISC](https://choosealicense.com/licenses/ISC/)
