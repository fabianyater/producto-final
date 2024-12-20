import mongoose, { Model, Schema } from "mongoose";
import { ILogBook } from "./types";

const logBookSchema: Schema<ILogBook> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    weather: {
      temperature: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
      windSpeed: {
        type: Number,
        required: true,
      },
      weatherType: {
        type: String,
        required: true,
      },
      samplingTime: {
        type: Date,
        required: true,
      },
    },
    habitat: {
      vegetationType: {
        type: String,
        required: true,
      },
      altitude: {
        type: Number,
        required: true,
      },
      soilType: {
        type: String,
        required: false,
      },
      climate: {
        type: String,
        required: false,
      },
      notes: {
        type: String,
        required: false,
      },
    },
    images: [
      {
        url: {
          type: String,
        },
        description: {
          type: String,
        },
        takenAt: {
          type: Date,
        },
        photographer: {
          type: String,
        },
      },
    ],
    collectedSpecies: [
      {
        scientificName: {
          type: String,
          required: false,
        },
        commonName: {
          type: String,
          required: true,
        },
        family: {
          type: String,
          required: false,
        },
        sampleQuantity: {
          type: Number,
          required: true,
        },
        plantStatus: {
          type: String,
          required: true,
        },
        photos: {
          type: [String],
          required: false,
        },
        additionalObservations: {
          type: String,
          required: false,
        },
      },
    ],
    additionalObservations: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const LogBook: Model<ILogBook> = mongoose.model<ILogBook>(
  "LogBook",
  logBookSchema
);

export default LogBook;
