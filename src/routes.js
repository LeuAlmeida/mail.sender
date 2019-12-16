import Dashboard from './views/Dashboard';
import UploadFile from './views/Files/Upload';
import FilesList from './views/Files/List';
import Senders from './views/Senders';
import CreateSender from './views/Senders/Create';
import EditSender from './views/Senders/Edit';
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
    icon: 'tim-icons icon-upload',
    component: UploadFile,
    layout: '/admin',
  },
  {
    path: '/lists/index',
    name: 'Visualizar listas',
    icon: 'tim-icons icon-bullet-list-67',
    component: FilesList,
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
    name: 'Ações Enviadas',
    icon: 'tim-icons icon-email-85',
    component: MailerList,
    layout: '/admin',
  },
  {
    path: '/senders/list',
    name: 'Remetentes',
    icon: 'tim-icons icon-book-bookmark',
    component: Senders,
    layout: '/admin',
  },
  {
    path: '/account',
    name: 'Editar minha conta',
    component: Account,
    layout: '/admin',
    redirect: true,
  },
  {
    path: '/senders/create',
    name: 'Cadastrar remetente',
    component: CreateSender,
    layout: '/admin',
    redirect: true,
  },
  {
    path: '/senders/edit',
    name: 'Editar remetente',
    component: EditSender,
    layout: '/admin',
    redirect: true,
  },
];
export default routes;
