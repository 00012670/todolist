const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB")


//Mongoose Schema
const itemSchema = {
  name: String
};

//Mongoose Model
const Item = mongoose.model(
  "Item", itemSchema
);

//Mongoose Document
const item1 = new Item({
  name: "Welocme to your todolist!"
});

const item2 = new Item({
  name: "<-- Hit this to delete an item."
});

const item3 = new Item({
  name: "Hit the + button to add a new item."
});


//Putting all to the array
const defaultItems = [item1, item2, item3];


const listSchema = {
  name: String,
  items: [itemSchema]
};


const List = mongoose.model("List", listSchema)



app.get("/", function(req, res) {

  //Mongoose find()
  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      //Mongoose insertMany
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to database");
        }
      });

      res.redirect("/");

    } else {
      res.render("list", {
        listTitle: "Note Taking App",
        newListItems: foundItems
      });
    }
  });
});



app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);


  List.findOne({
    name: customListName
  }, function(err, foundLists) {
    if (!err) {
      if (!foundLists) {

        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an exissting list
        res.render("list", {
          listTitle: foundLists.name,
          newListItems: foundLists.items
        })
      }
    }
  });
});



app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Note Taking App") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});



//Delete item
app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Note Taking App") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Deleted successfully checked item");
        res.redirect("/")
      }
    });
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, function(err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }
});



app.listen(3000, function() {
  console.log("Server running on port 3000")
});
