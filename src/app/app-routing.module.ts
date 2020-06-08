import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent} from './home/home.component'

const routes: Routes = [
    {path : '', component: HomeComponent},
    { path: 'help', component: HelpComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo:''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
