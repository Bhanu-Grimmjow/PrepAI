require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

const mongoose  = require("mongoose");
const Question  = require("../models/question.model");
const questions = require("../data/questions.json");

async function seed() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✓ Connected to MongoDB");

    await Question.deleteMany({});
    const inserted = await Question.insertMany(questions);
    console.log(`✓ Seeded ${inserted.length} questions\n`);

    const summary = {};
    inserted.forEach((q) => { summary[q.topic] = (summary[q.topic] || 0) + 1; });
    console.table(summary);

    await mongoose.disconnect();
    console.log("\n✓ Done");
}

seed().catch((err) => { console.error(err); process.exit(1); });
