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
      name: 'Report',
      url: '/reports',
      icon: 'icon-shield'
    },
    {
      name: 'Most reporter',
      url: '/reports/most',
      icon: 'icon-dislike'
    },
    {
      name: 'Notification',
      url: '/notification',
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
      name: 'Payment',
      url: '/summary/payment',
      icon: 'icon-credit-card'
    },
    {
      name: 'Calling',
      url: '/summary/calling',
      icon: 'icon-bubbles'
    }
  ]
}
