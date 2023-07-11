/** @type {import('next').NextConfig} */
const nextConfig = {
  // other configuration options...
  output: {
    // Set the export target to static
    export: {
      target: 'static'
    }
  }
}

module.exports = nextConfig
