let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    const reminderToEdit = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }
    console.log(reminderToEdit)
    let searchResult = database.cindy.reminders.find(function (reminder) {
      if (reminderToEdit.id == reminder.id) {
        reminder.title = reminderToEdit.title
        reminder.description = reminderToEdit.description
        reminder.completed = reminderToEdit.completed
        return true
      }
    })
    res.redirect("/reminders")
    // Done
  },

  delete: (req, res) => {
    // Implement this code
    const reminderID = req.params.id
    let index = 0
    let searchResult = database.cindy.reminders.find(function (reminder) {
      if (reminderID == reminder.id) {
        database.cindy.reminders.splice(index, 1)
        return true
      }
      index += 1
    })
    res.redirect("/reminders");
    // Done!
  },
};

module.exports = remindersController;
