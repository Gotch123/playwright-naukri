// Run once: node testdata/generateTestData.js
import * as XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wb = XLSX.utils.book_new();

// Sheet 1 — LoginData (TC-01 to TC-04)
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ['username', 'password', 'expectedResult'],
  ['validuser@mail.com', 'ValidPass1', 'success'],
  ['validuser@mail.com', 'WrongPass', 'failure'],
  ['', '', 'failure'],
]), 'LoginData');

// Sheet 2 — SearchData (TC-05 to TC-09)
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ['keyword', 'location', 'expectedResult'],
  ['Software Engineer', 'Bangalore', 'results'],
  ['Data Analyst', 'Mumbai', 'results'],
  ['QA Engineer', '', 'results'],
  ['asdfgh123xyz', '', 'no_results'],
]), 'SearchData');

// Sheet 3 — ProfileData (TC-13 to TC-15)
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ['username', 'password', 'headline', 'resumeFile'],
  ['user1@mail.com', 'Pass123', 'QA Engineer | Playwright | JS', 'Manisha_Resume.pdf'],
  ['user2@mail.com', 'Pass456', 'Senior QA | Selenium | Java', 'Manisha_Kumari_Resume.pdf'],
]), 'ProfileData');

// Sheet 4 — AlertData (TC-16 to TC-17)
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ['keyword', 'email', 'action'],
  ['QA Automation', 'user1@mail.com', 'create'],
  ['Data Science', 'user1@mail.com', 'create'],
]), 'AlertData');

// Sheet 5 — SavedJobsData (TC-18 to TC-19)
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ['keyword', 'action'],
  ['Business Analyst', 'save'],
  ['Product Manager', 'save'],
]), 'SavedJobsData');

const out = path.join(__dirname, 'testdata.xlsx');
XLSX.writeFile(wb, out);
console.log('✅ testdata.xlsx created at:', out);