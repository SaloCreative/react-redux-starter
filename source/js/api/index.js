export const API = {
  PASSPORT: {
    service: '/passport',
    USER: 'passport/user/:id'
  },
  AGGREGATOR: {
    USER: 'workers/user/:id'
  }
};

export const ROLES = {
  STAFF_CUSTOMER: 'beta.customer',
  STAFF_MEMBER: 'beta.staff',
  ADMIN: 'beta.admin',
  GROUPS: {
    ALL: [
      'beta.customer',
      'beta.staff',
      'beta.admin'
    ],
    ABOVE_CUSTOMER: [
      'beta.staff',
      'beta.admin'
    ],
    ABOVE_STAFF: [
      'beta.admin'
    ],
    CREATOR: [
      'creator.author',
      'creator.publisher',
      'creator.translator',
      'creator.admin'
    ],
    ANALYTICS: [
      'analytics.admin'
    ],
    TILLS: [
      'tills_backend.manager',
      'tills_backend.supervisor',
      'tills_backend.user',
      'tills_backend.accounts',
      'tills_backend.admin'
    ],
    PEOPLE: [
      'people.user',
      'people.manager',
      'people.supervisor',
      'people.accounts',
      'people.payroll',
      'people.manufacturing',
      'people.admin',
      'people.studio'
    ],
    STOCK: [
      'stock.store-manager',
      'stock.accounts',
      'stock.manufacturing',
      'stock.admin'
    ]
  }
};