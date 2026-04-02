#### Live Demo (Netlify)

 You can access the live application here:

Link:   https://meek-tanuki-c6de34.netlify.app/

##  Login Credentials & Test Scenarios

Use the following credentials to test different flows of the application:

| Email                           | Scenario                             |
| ------------------------------- | ------------------------------------ |
| [a@scos.com](mailto:a@scos.com) | No Institute                         |
| [b@scos.com](mailto:b@scos.com) | 1 Institute & 1 Role                 |
| [c@scos.com](mailto:c@scos.com) | 1 Institute & Multiple Roles         |
| [d@scos.com](mailto:d@scos.com) | Multiple Institutes & Multiple Roles |
| [e@scos.com](mailto:e@scos.com) | Multiple Institutes & Single Role    |

###  Password (for all users)

Admin@123

##  Expected Flow per Case

##   Invalid Credentials Handling
If user enters:
Wrong email
Wrong password

### Then system will show:
"Invalid credentials"

### [a@scos.com](mailto:a@scos.com) (No Institute)

* After login → No institute found state
* UI should handle empty case properly

---

### [b@scos.com](mailto:b@scos.com) (1 Institute & 1 Role)

* Login → Directly goes to Dashboard
* No role selection page

---

### [c@scos.com](mailto:c@scos.com) (1 Institute & Multiple Roles)

* Login → Redirect to Role Page
* Select role → Dashboard

---

### [d@scos.com](mailto:d@scos.com) (Multiple Institutes & Multiple Roles)

* Login → Institute selection page
* Select institute → Role page
* Select role → Dashboard

---

### [e@scos.com](mailto:e@scos.com) (Multiple Institutes & Single Role)

* Login → Institute selection page
* Select institute → Direct Dashboard

---

## Notes

* All flows are handled using **conditional navigation logic**
* Data is stored using **localStorage**
* No backend is used (static simulation)

---
