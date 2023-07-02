import { decodeToken } from "react-jwt";

const Menu = [
  {
    path: 'dashboard/services',
    icon: 'bi bi-stack',
    title: 'Servicios',
  },
  // { 
  //   path: !(localStorage.getItem("access_token") == null) ?  'user/'+decodeToken(localStorage.getItem("access_token")).role +"/profile" : 'dashboard/services',
  //   icon: 'bi bi-person-circle',
  //   title: 'Perfil',
  // },
  {
    path: 'vacancies/search',
    icon: 'bi bi-briefcase-fill',
    title: 'Vacantes',
  },
  {
    path: 'vacancies/search',
    icon: 'bi bi-mortarboard-fill',
    title: 'Prácticas',
  },
  {
    path: 'vacancies/search',
    icon: 'bi bi-pen-fill',
    title: 'Capacitaciones',
  },
  {
    path: 'vacancies/search',
    icon: 'bi bi-terminal-fill',
    title: 'Bootcamps',
  },
];

export default Menu;
