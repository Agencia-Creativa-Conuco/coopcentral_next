/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar todas las optimizaciones CSS que puedan causar problemas
  experimental: {
    optimizeCss: false,
    optimizeServerReact: false,
  },

  // Deshabilitar minificación CSS temporalmente
  swcMinify: false,

  // Configuración básica de webpack
  webpack: (config, { dev, isServer }) => {
    // No aplicar optimizaciones CSS en modo desarrollo
    if (dev || isServer) {
      return config;
    }

    return config;
  },
};

module.exports = nextConfig;
