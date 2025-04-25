export const paths = {
    home : {
        path: '/',
        getHref: () => '/',
    },
    products : {
        path: '/product',
        getHref: () => '/product',
    },
    example : {
        path: '/example',
        getHref: () => '/example'
    }
} as const;