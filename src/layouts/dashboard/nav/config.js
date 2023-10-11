// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Trang chủ',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý người dùng',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Quản lý nguồn dữ liệu',
    path: '/dashboard/blog',
    icon: icon('ic_data-source'),
  },
  {
    title: 'Quản lý tác vụ',
    path: '/dashboard/task/index',
    icon: icon('ic_task'),
  },
  // {
  //   title: 'Quản lý người dùng',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
