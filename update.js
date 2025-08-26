import fs from "node:fs";

async function downloadImages(id) {
  const imgPaths = [
    `images/student/collection/${id}.webp`,
    `images/student/icon/${id}.webp`,
    `images/student/lobby/${id}.webp`,
    `images/student/portrait/${id}.webp`,
  ];

  for (const p of imgPaths) {
    if (!fs.existsSync(p)) {
      console.log(`attempting ${p}`);
      const data = await (await fetch(`https://schaledb.com/${p}`)).bytes();
      fs.writeFileSync(p, data);
    }
  }
}

const students = await (
  await fetch("https://schaledb.com/data/en/students.min.json")
).json();
for (const key of Object.keys(students)) {
  const student = students[key];
  await downloadImages(student.Id);
}
fs.writeFileSync("data/jp/students.json", JSON.stringify(students, null, 4));
fs.writeFileSync("data/jp/students.min.json", JSON.stringify(students));
