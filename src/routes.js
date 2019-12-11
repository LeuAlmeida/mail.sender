import Dashboard from './views/Dashboard';
import Senders from './views/Senders';
import Typography from './views/Typography';
import CreateMailer from './views/Mailer/Create';
import MailerList from './views/Mailer';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/mailer/create',
    name: 'Criar Ação',
    icon: 'tim-icons icon-delivery-fast',
    component: CreateMailer,
    layout: '/admin',
  },
  {
    path: '/mailer/list',
    name: 'Listar Ações',
    icon: 'tim-icons icon-email-85',
    component: MailerList,
    layout: '/admin',
  },
  {
    path: '/senders',
    name: 'Remetentes',
    icon: 'tim-icons icon-book-bookmark',
    component: Senders,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'tim-icons icon-align-center',
    component: Typography,
    layout: '/admin',
  },
];
export default routes;
