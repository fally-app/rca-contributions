const mongoose = require("mongoose");
const { Story, Person } = require("../model/test");
exports.create = (req, res) => {
  const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: "Ian Fleming",
    age: 50,
  });

  author.save(function (err) {
    if (err) return handleError(err);

    const story1 = new Story({
      title: "Casino Royale",
      author: author._id, // assign the _id from the person
    });

    story1.save(function (err) {
      if (err) return handleError(err);
      // thats it!
    });
  });

  res.send({ messge: "Creating date" });
};
exports.getData = (req, res) => {
  Story.findOne({ title: "Casino Royale" })
    .populate("author")
    .exec(function (err, story) {
      if (err) return handleError(err);
      console.log("The author is %s", story.author.name);
      // prints "The author is Ian Fleming"
    });
};
