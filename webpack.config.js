const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path'); // Bu sətir düzəldildi

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Xətanı verən modulları bizim boş stub-a yönləndiririk.
    config.resolve.alias = {
        ...config.resolve.alias,
        // 1. react-native-maps-in səhv verən xüsusi faylını əvəz edirik
        'react-native-maps/lib/MapMarkerNativeComponent.js': path.join(
            __dirname,
            'stubs/MapMarkerNativeComponent.web.js'
        ),
        // 2. Xətanın ilkin mənbəyi olan nativ modulu əvəz edirik (ehtiyat üçün)
        'react-native/Libraries/Utilities/codegenNativeCommands': path.join(
            __dirname,
            'stubs/MapMarkerNativeComponent.web.js'
        ),
    };

    return config;
};