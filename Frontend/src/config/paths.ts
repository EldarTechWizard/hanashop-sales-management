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
    salesReport : {
        path: '/sales_report',
        getHref: () => '/sales_report'
    },
    inventoryReport : {
        path: '/inventory_report',
        getHref: () => '/inventory_report'
    },
    example : {
        path: '/example',
        getHref: () => '/example'
    }
} as const;