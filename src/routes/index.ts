import { FC, lazy } from 'react';
import { PathRouteProps } from 'react-router-dom';

export enum Pages {
  Main,
  NotFound,
  Bookmarks
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

const routes: Routes = {
  [Pages.Main]: {
    component: lazy(() => import('@/pages/FilmsList/FilmsList')),
    path: '/',
  },
  [Pages.Bookmarks]: {
    component: lazy(() => import('@/pages/Bookmarks/Bookmarks')),
    path: '/bookmarks',
  },
  [Pages.NotFound]: {
    component: lazy(() => import('@/pages/NotFound/NotFound')),
    path: '*',
  },
};

export default routes;
