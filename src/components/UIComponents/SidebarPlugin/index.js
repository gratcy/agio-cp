import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/dashboard'
    },
    {
      name: 'Users',
      icon: 'ti-user',
      path: '/users'
    },
    {
      name: 'Orders',
      icon: 'ti-view-list-alt',
      path: '/order'
    },
    {
      name: 'Tickers',
      icon: 'ti-money',
      path: '/ticker'
    },
    {
      name: 'Signal Performance',
      icon: 'ti-bar-chart-alt',
      path: '/signal-performance'
    },
    {
      name: 'Price Action',
      icon: 'ti-wand',
      path: '/price-action'
    },
    {
      name: 'Portofolio Checkup',
      icon: 'ti-check-box',
      path: '/portofolio-check-up'
    },
    {
      name: 'News',
      icon: 'ti-pencil',
      path: '/news'
    },
    {
      name: 'Slideshow',
      icon: 'ti-image',
      path: '/slideshow'
    },
    // {
    //   name: 'Accounts',
    //   icon: 'ti-credit-card',
    //   path: '/accounts'
    // },
    {
      name: 'Settings',
      icon: 'ti-settings',
      path: '/setting'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
