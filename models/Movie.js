const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  actors: [
    {
      name: {
        type: String,
      },
    },
  ],
  rating: {
    type: Number,
  },
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
