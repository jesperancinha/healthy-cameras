import {defineConfig} from "cypress";

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        includeShadowDom: true,
        video: false,
        screenshotOnRunFailure: false,
        baseUrl: "http://localhost:8080",
        env: {
            'grafanaHost': 'grafana',
            'prometheusHost': 'prometheus',
            'graphiteHost': 'graphite',
            'nginxHost': 'nginx:8090'
        }
    },
    chromeWebSecurity: false
});
