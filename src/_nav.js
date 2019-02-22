export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
      // badge: {
      //   variant: 'info',
      //   text: 'NEW'
      // }
    },
    {
      title: true,
      name: 'Manager',
      wrapper: { // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-user'
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'icon-shield'
    },
    {
      name: 'Most reportees',
      url: '/reports/most',
      icon: 'icon-dislike'
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell'
    },
    {
      title: true,
      name: 'Summary',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Payments',
      url: '/payments',
      icon: 'icon-credit-card'
    },
    {
      name: 'Conversations',
      url: '/conversations',
      icon: 'icon-bubbles'
    }
  ]
}
