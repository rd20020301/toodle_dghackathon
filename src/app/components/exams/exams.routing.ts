import { Routes } from '@angular/router';

//Authentication Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { InfoComponent } from './info/info.component';
import { InviteComponent } from './invite/invite.component';
import { PassComponent } from './pass/pass.component';
import { JournalComponent } from './journal/journal.component';

export const ExamsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'detail/:id/:mode',
        component: InfoComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'detail/:id',
        component: InfoComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'journal',
        component: JournalComponent,
        data: {
          title: 'Journal'
        }
      },
      {
        path: 'journal/:id',
        component: JournalComponent,
        data: {
          title: 'Journal'
        }
      },
      {
        path: 'invite/:id',
        component: InviteComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: 'pass/:id',
        component: PassComponent,
        data: {
          title: 'Pass exam'
        }
      },
    ]
  }
];

