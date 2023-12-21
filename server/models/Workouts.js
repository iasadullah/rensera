const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
