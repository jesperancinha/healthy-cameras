import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    includeShadowDom: true,
    env: {
      'grafanaHost': 'grafana',
      'prometheusHost': 'prometheus',
      'graphiteHost': 'graphite',
      'nginxHost': 'nginx:8090'
    }
  },
  chromeWebSecurity: false
});
