import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Маршрут с параметром нельзя пререндерить без списка значений —
    // рендерим на сервере по запросу.
    path: 'tags/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'article/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
