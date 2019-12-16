import Dashboard from './views/Dashboard';
import UploadFile from './views/Files/Upload';
import Senders from './views/Senders';
// import Typography from './views/Typography';
import CreateMailer from './views/Mailer/Create';
import MailerList from './views/Mailer';
import Account from './views/Account';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/lists/create',
    name: 'Importar lista',
    icon: 'tim-icons icon-bullet-list-67',
    component: UploadFile,
    layout: '/admin',
  },
  // {
  //   path: '/lists',
  //   name: 'Visualizar listas',
  //   icon: 'tim-icons icon-bullet-list-67',
  //   component: UploadFile,
  //   layout: '/admin',
  // },
  {
    path: '/mailer/create',
    name: 'Criar Ação',
    icon: 'tim-icons icon-delivery-fast',
    component: CreateMailer,
    layout: '/admin',
  },

  {
    path: '/mailer/list',
    name: 'Ações Enviadas',
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
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: 'tim-icons icon-align-center',
  //   component: Typography,
  //   layout: '/admin',
  // },
  {
    path: '/account',
    name: 'Editar minha conta',
    component: Account,
    layout: '/admin',
    redirect: true,
  },
];
export default routes;
