// aggregation-queries.js — Demonstrates MongoDB's aggregation
// framework: grouping, filtering, sorting, and averaging on the
// students collection.

print("\n--- Total students per department ---");
printjson(
    db.students.aggregate([
        { $group: { _id: "$department", totalStudents: { $sum: 1 } } }
    ]).toArray()
);

print("\n--- Average marks per department ---");
printjson(
    db.students.aggregate([
        { $group: { _id: "$department", averageMarks: { $avg: "$marks" } } }
    ]).toArray()
);

print("\n--- Average age of students in each city ---");
printjson(
    db.students.aggregate([
        { $group: { _id: "$city", averageAge: { $avg: "$age" } } }
    ]).toArray()
);

print("\n--- Highest marks per department ---");
printjson(
    db.students.aggregate([
        { $group: { _id: "$department", maxMarks: { $max: "$marks" } } }
    ]).toArray()
);

print("\n--- CSE students sorted by marks (highest first) ---");
printjson(
    db.students.aggregate([
        { $match: { department: "CSE" } },
        { $sort: { marks: -1 } }
    ]).toArray()
);