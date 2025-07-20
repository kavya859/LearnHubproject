// Script to seed 10 colorful courses
// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/courseModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/learnhub";

const demoCourses = [
  {
    title: "Full Stack Web Development",
    description: "Master HTML, CSS, JavaScript, React, Node & MongoDB.",
    image: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
    price: 4999
  },
  {
    title: "Python for Data Science",
    description: "Data analysis, visualization, NumPy, Pandas, and ML intro.",
    image: "https://img.freepik.com/free-vector/python-programming-language-learning-concept_23-2148824922.jpg",
    price: 3999
  },
  {
    title: "Java Programming Masterclass",
    description: "OOPs, Spring Boot, and backend API development in Java.",
    image: "https://img.freepik.com/free-vector/java-programming-concept_23-2148809705.jpg",
    price: 3499
  },
  {
    title: "Frontend Development with React",
    description: "Learn React.js, hooks, routing, and state management.",
    image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-react-developer_23-2149379195.jpg",
    price: 2999
  },
  {
    title: "SQL & Database Design",
    description: "Master MySQL, ER diagrams, joins, normalization, and more.",
    image: "https://img.freepik.com/free-vector/database-storage-concept-illustration_114360-5520.jpg",
    price: 1999
  },
  {
    title: "Android App Development",
    description: "Build native apps using Kotlin and Android Studio.",
    image: "https://img.freepik.com/free-vector/app-development-concept-illustration_114360-5161.jpg",
    price: 4599
  },
  {
    title: "Machine Learning A-Z",
    description: "Linear regression, clustering, SVMs and Python hands-on.",
    image: "https://img.freepik.com/free-vector/machine-learning-concept-illustration_114360-735.jpg",
    price: 5999
  },
  {
    title: "DevOps Crash Course",
    description: "CI/CD, Docker, Kubernetes, Jenkins & AWS basics.",
    image: "https://img.freepik.com/free-vector/devops-team-abstract-concept-illustration_335657-3875.jpg",
    price: 3799
  },
  {
    title: "Cybersecurity Essentials",
    description: "Learn the foundations of ethical hacking and security.",
    image: "https://img.freepik.com/free-vector/cyber-security-concept_23-2148532223.jpg",
    price: 3299
  },
  {
    title: "UI/UX Design Bootcamp",
    description: "Learn Figma, design principles, prototyping & design systems.",
    image: "https://img.freepik.com/free-vector/web-design-background_1300-79.jpg",
    price: 2899
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Course.deleteMany(); // Optional: Clear existing data
    await Course.insertMany(demoCourses);
    console.log("✅ Seed data inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed database:", err);
    process.exit(1);
  }
};

seedCourses();
