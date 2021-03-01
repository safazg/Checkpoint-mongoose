/** 1) Install & Set up mongoose */
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

/** # SCHEMAS and MODELS #
/** 2) Create a 'Person' Model */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

var Person = mongoose.model("Person", personSchema);

/** 3) Create and Save a Person */
var Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function (done) {
  var samplePerson = new Person({
    name: "Sample Person",
    age: 27,
    favoriteFoods: ["chicken", "water"],
  });

  samplePerson.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create many people using `Model.create()`, using the function argument
// 'arrayOfPeople'.
var arrayOfPeople = [
  { name: "Safa", age: 25, favoriteFoods: ["SeaFood"] },
  { name: "Linda", age: 26, favoriteFoods: ["Lasagna"] },
  { name: "Eya", age: 27, favoriteFoods: ["IceCream"] },
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

/** 5) Use `Model.find()` */
//Find all the people having a given name, using Model.find() -> [Person]//
var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

/** 6) Use `Model.findOne()` */
// Find just one person which has a certain food in her favorites,
var findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 7) Use `Model.findById()` */
// method for it. Find the (only!!) person having a certain Id,
// using `Model.findById() -> Person`.
// Use the function argument 'personId' as search key.

var findPersonById = function (personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 8) Classic Update : Find, Edit then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      console.error(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) {
        console.error(err);
      }
      done(null, data);
    });
  });
};

/** 9) New Update : Use `findOneAndUpdate()` */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) {
        console.error(err);
      }
      done(null, data);
    }
  );
};

/** 10) Delete one Person */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.error(err);
    }
    done(null, data);
  });
};

/** 11) Delete many People */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.error(err);
    }
    done(null, data);
  });
};

/** 12) Chain Query helpers */
//Find people who like burrito. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec()//
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        console.error(err);
      }
      done(null, data);
    });
};
