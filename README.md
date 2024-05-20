# ET-Technical-Task

Small web application based on the technical task for the ElifTech online school enrollment.

Live Demo: [Event Organizer](https://et-technical-task-frontend.onrender.com/)

## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install dependencies and start the app.

---

### Terminal 1:
```bash
cd backend
npm install
npm start
```
(use `npm run dev` if you want server to refresh automatically upon code changes)

---

### Terminal 2:
```bash
cd frontend
npm install
npm run dev
```

---

## Notes
- To sort in the different order select the same sorting parameter for the second time.
- Registration Form validations:
  
  | Field | Requirement |
  | ------ | ------ |
  | Name | >5 symbols |
  | Email | >5 symbols + valid email matching regex |
  | Age | 18y.o + |
  | Referral source | (optional) |
  
- Sorting of Events based on Creators and Titles gives the same result due to the same way of creating names for this fields (fieldName + index)
- The search is based on the JS `includes()` method, hence the complete match between search value and resulting user name or email is not required.
