import { Routes } from '@angular/router';

//Authentication Components
import { PupilsComponent } from './pupils/pupils.component';
import { TeacherComponent } from './teachers/teacher.component';
import { InfoComponent } from './info/info.component';

export const UsersRoutes: Routes = [
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
        component: TeacherComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'detail/:mode',
        component: InfoComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'detail/:mode/:id',
        component: InfoComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'detail/:mode/:id/:school',
        component: InfoComponent,
        data: {
          title: 'Detail'
        }
      },
      {
        path: 'pupils',
        component: PupilsComponent,
        data: {
          title: 'Create'
        }
      },  
      {
        path: 'pupils/:id',
        component: PupilsComponent,
        data: {
          title: 'Detail'
        }
      },          
    ]
  }
];

