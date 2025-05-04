export const paths = {
    home : {
        path: '/',
        getHref: () => '/',
    },
    gestion : {
        path: '/gestion',
        getHref: () => '/gestion',
    },
    products : {
        path: '/product',
        getHref: () => '/product',
    },
    customers : {
        path: '/customers',
        getHref: () => '/customers'
    },
    categories : {
        path: '/categories',
        getHref: () => '/categories'
    },
    inventory : {
        path: '/inventory',
        getHref: () => '/inventory'
    },
    orders : {
        path: '/orders',
        getHref: () => '/orders'
    },
    example : {
        path: '/example',
        getHref: () => '/example'
    }
} as const;