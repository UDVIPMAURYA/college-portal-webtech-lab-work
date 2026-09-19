// seed-data.js — Inserts sample student records into the students
// collection. Safe to re-run: clears existing data first so it
// never creates duplicates.

db.students.deleteMany({});

db.students.insertMany([
    { name: "Udvip Maurya", department: "CSE", age: 21, city: "Lucknow", marks: 78 },
    { name: "Ravi Kumar", department: "CSE", age: 22, city: "Kanpur", marks: 85 },
    { name: "Priya Singh", department: "IT", age: 20, city: "Lucknow", marks: 91 },
    { name: "Anjali Verma", department: "ECE", age: 21, city: "Varanasi", marks: 67 },
    { name: "Rahul Yadav", department: "CSE", age: 23, city: "Kanpur", marks: 73 },
    { name: "Sneha Gupta", department: "IT", age: 20, city: "Varanasi", marks: 88 },
    { name: "Amit Singh", department: "ECE", age: 22, city: "Lucknow", marks: 59 }
]);

print("Seed data inserted successfully.");