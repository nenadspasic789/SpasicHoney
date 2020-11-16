export const StorageConfig = {
    photo: {
        destination: '../storage/photos/',
        maxAge: 1000 * 60 * 60 *24 * 7, // 7 dana
        urlPrefix: '/assets/photos',
        maxSize: 20 * 1024 *1024,
        resize: {
            thumb: {
                width: 120,
                height: 120,
                directory: 'thumb/'
            },
            small: {
                width: 320,
                height: 240,
                directory: 'small/'
            }
        }
    }

};