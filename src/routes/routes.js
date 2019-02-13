import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Signal from 'src/components/Dashboard/Views/SignalPerformance.vue'
import Signaladd from 'src/components/Dashboard/Views/signal/addSignal.vue'
import Login from 'src/components/Dashboard/Views/Login.vue'
import PriceAction from 'src/components/Dashboard/Views/price/PriceAction.vue'
import AddPriceAction from 'src/components/Dashboard/Views/price/AddPriceAction.vue'
import Users from 'src/components/Dashboard/Views/users/Users.vue'
import Partner from 'src/components/Dashboard/Views/partner/Partner.vue'
import AddNews from 'src/components/Dashboard/Views/news/addnews.vue'
import News from 'src/components/Dashboard/Views/news/news.vue'
import DetailNews from 'src/components/Dashboard/Views/news/detail.vue'
import AddEvent from 'src/components/Dashboard/Views/event/addevent.vue'
import Event from 'src/components/Dashboard/Views/event/event.vue'
import DetailEvent from 'src/components/Dashboard/Views/event/detail.vue'
import Ticker from 'src/components/Dashboard/Views/ticker/Ticker.vue'
import AddTicker from 'src/components/Dashboard/Views/ticker/addTicker.vue'
import Portofolio from 'src/components/Dashboard/Views/portofolio/Portofolio.vue'
import addPortofolio from 'src/components/Dashboard/Views/portofolio/addPortofolio.vue'
import Accounts from 'src/components/Dashboard/Views/account/Account.vue'
import AddAccounts from 'src/components/Dashboard/Views/account/AddAccount.vue'
import Order from 'src/components/Dashboard/Views/order/Order.vue'
import Detail from 'src/components/Dashboard/Views/order/Detail.vue'
import Setting from 'src/components/Dashboard/Views/setting/Setting.vue'
import Slideshow from 'src/components/Dashboard/Views/slideshow/Slideshow.vue'
import AddSlideshow from 'src/components/Dashboard/Views/slideshow/addslideshow.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Overview
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts
      },
      {
        path: 'setting/accounts/add',
        name: 'Add Accounts',
        component: AddAccounts
      },
      {
        path: 'setting/accounts/edit',
        name: 'Edit Accounts',
        component: AddAccounts
      },
      {
        path: 'portofolio-check-up',
        name: 'Portofolio Check up',
        component: Portofolio
      },
      {
        path: 'portofolio-check-up/add',
        name: 'Add Portofolio',
        component: addPortofolio
      },
      {
        path: 'ticker',
        name: 'Ticker',
        component: Ticker
      },
      {
        path: 'ticker/add',
        name: 'Add Ticker',
        component: AddTicker
      },
      {
        path: 'ticker/edit',
        name: 'Edit Ticker',
        component: AddTicker
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'signal-performance',
        name: 'Signal Performance',
        component: Signal
      },
      {
        path: 'signal-performance/add',
        name: 'Add Signal',
        component: Signaladd
      },
      {
        path: 'signal-performance/edit',
        name: 'edit signal',
        component: Signaladd
      },
      {
        path: 'price-action',
        name: 'price action',
        component: PriceAction
      },
      {
        path: 'price-action/add',
        name: 'Add Call Price Action',
        component: AddPriceAction
      },
      {
        path: 'price-action/edit',
        name: 'price action edit',
        component: AddPriceAction
      },
      {
        path: 'users',
        name: 'Users',
        component: Users
      },
      {
        path: 'partner',
        name: 'Partner',
        component: Partner
      },
      {
        path: 'news/add',
        name: 'Add News',
        component: AddNews
      },
      {
        path: 'news/edit',
        name: 'Edit News',
        component: AddNews
      },
      {
        path: 'news',
        name: 'News',
        component: News
      },
      {
        path: 'news/detail',
        name: 'Detail News',
        component: DetailNews
      },
      {
        path: 'event/add',
        name: 'Add Event',
        component: AddEvent
      },
      {
        path: 'event/edit',
        name: 'Edit Event',
        component: AddEvent
      },
      {
        path: 'event',
        name: 'Event',
        component: Event
      },
      {
        path: 'event/detail',
        name: 'Detail Event',
        component: DetailEvent
      },
      {
        path: 'order',
        name: 'Order',
        component: Order
      },
      {
        path: 'slideshow/add',
        name: 'Add Slideshow',
        component: AddSlideshow
      },
      {
        path: 'slideshow/edit',
        name: 'Edit Slideshow',
        component: AddSlideshow
      },
      {
        path: 'slideshow',
        name: 'Slideshow',
        component: Slideshow
      },
      {
        path: 'order/confirmation',
        name: 'Order confirmation',
        component: Detail
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
