export const paths = {
    home : {
        path: '/',
        getHref: () => '/',
    },
    example : {
        path: '/example',
        getHref: () => '/example'
    }
} as const;