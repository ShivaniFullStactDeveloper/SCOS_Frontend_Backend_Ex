import One from "../assets/Institute_logo/one.png";
import Two from "../assets/Institute_logo/two.png";
import Three from "../assets/Institute_logo/three.png";
import Four from "../assets/Institute_logo/four.png";
import Five from "../assets/Institute_logo/five.png";
import RoleOne from "../assets/role_logos/administrator.png";
import RoleTwo from "../assets/role_logos/principal.png";
import RoleThree from "../assets/role_logos/teacher.png";

export const users = [
  //  No Institute (null case)
  {
    email: "a@scos.com",
    password: "Admin@123",
    name: "Alex Carter",
    institutes: null
  },
  //  1 Institute + 1 Role → Dashboard
  {
    email: "b@scos.com",
    password: "Admin@123",
    name: "Leo Parker",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        location: "Mumbai, Maharashtra",
        type: "School",
        logo: One,
        roles: [{
          id: 1,
          name: "Administrator",
          desc: "Full system access",
          icon: RoleOne
        }]
      }
    ]
  },
  // 1 Institute + Multiple Roles → Role Page
  {
    email: "c@scos.com",
    password: "Admin@123",
    name: "Arlo James",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        location: "Mumbai, Maharashtra",
        type: "School",
        logo: One,
        roles: [
          {
            id: 1,
            name: "Administrator",
            desc: "Full system access",
            icon: RoleOne
          },
          {
            id: 2,
            name: "Teacher",
            desc: "Class & grading",
            icon: RoleThree
          }
        ]
      }
    ]
  },
  //   Multiple Institute + Multiple Roles → Institute Page
  {
    email: "d@scos.com",
    password: "Admin@123",
    name: "Ethan Cole",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        location: "Mumbai, Maharashtra",
        type: "School",
        logo: One,
        roles: [
          {
            id: 1,
            name: "Administrator",
            desc: "Full system access",
            icon: RoleOne
          },
          {
            id: 2,
            name: "Teacher",
            desc: "Class & grading",
            icon: RoleThree
          },
          {
            id: 3,
            name: "Principal",
            desc: "Institute oversight",
            icon: RoleTwo
          },
        ]
      },
      {
        id: 2,
        name: "Earlyteh College",
        location: "Pune, Maharashtra",
        type: "College",
        logo: Two,
        roles: [
          {
            name: "Administrator",
            desc: "Full system access",
            icon: RoleOne
          },
          {
            name: "Teacher",
            desc: "Class & grading",
            icon: RoleThree
          }
        ]
      },
      {
        id: 3,
        name: "Renaissance Academy",
        location: "Bangalore, Karnataka",
        type: "Training",
        logo: Three,
        roles: [
          {
            name: "Administrator",
            desc: "Full system access",
            icon: RoleOne
          },
          {
            name: "Teacher",
            desc: "Class & grading",
            icon: RoleThree
          }
        ]
      },
      {
        id: 4,
        name: "Pune University",
        location: "Pune, Maharashtra",
        type: "University",
        logo: Four,
        roles: [
          {
            name: "Administrator",
            desc: "Full system access",
            icon: RoleOne
          },
          {
            name: "Teacher",
            desc: "Class & grading",
            icon: RoleThree
          }
        ]
      },
      {
        id: 5,
        name: "Mount Carmel School",
        location: "Nagpur, Maharashtra",
        type: "School",
        logo: Five,
        roles: [
          {
            name: "Administrator",
            desc: "Full system access",
            icon: RoleOne
          },
          {
            name: "Teacher",
            desc: "Class & grading",
            icon: RoleThree
          }
        ]
      },
      {
        id: 6,
        name: "North Park Academy",
        location: "Mumbai, Maharashtra",
        type: "School",
        logo: One,
        roles: [{
          name: "Administrator",
          desc: "Full system access",
          icon: RoleOne
        },]
      },
    ]
  },

  //   Multiple Institute + Single Role → Institute → Dashboard
  {
    email: "e@scos.com",
    password: "Admin@123",
    name: "Max Turner",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        location: "Mumbai, Maharashtra",
        type: "School",
        logo: One,
        roles: [{
          name: "Administrator",
          desc: "Full system access",
          icon: RoleOne
        },]
      },
      {
        id: 2,
        name: "Pune University",
        location: "Pune, Maharashtra",
        type: "University",
        logo: Four,
        roles: [{
          name: "Administrator",
          desc: "Full system access",
          icon: RoleOne
        },]
      }
    ]
  }
];