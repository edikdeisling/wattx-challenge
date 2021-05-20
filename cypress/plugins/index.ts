import * as Cypress from 'cypress';

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions => config;
