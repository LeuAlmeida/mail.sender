// import Login from "views/Login.js";
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Senders from "views/Senders.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Mailer from "views/Mailer.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/mailer/create",
    name: "Criar Ação",
    icon: "tim-icons icon-email-85    ",
    component: Mailer,
    layout: "/admin"
  },
  {
    path: "/senders",
    name: "Remetentes",
    icon: "tim-icons icon-book-bookmark",
    component: Senders,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
];
export default routes;
