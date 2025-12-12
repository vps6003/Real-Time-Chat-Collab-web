import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// // Remove Effects from SSR providers
// const { providers, ...rest } = appConfig;
// const filteredProviders = providers.filter(
//   // Remove provideEffects(appEffects)
//   (p) => !String(p?.toString()).includes('provideEffects')
// );

// const serverConfig: ApplicationConfig = {
//   providers: [provideServerRendering(withRoutes(serverRoutes))],
// };

// export const config = mergeApplicationConfig(
//   {
//     ...appConfig,
//     providers: filteredProviders,
//   },
//   serverConfig
// );
export const config = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
});
