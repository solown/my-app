// Module de redirection vers chacun des components en fonction du path appelé 
import { Routes, RouterModule } from '@angular/router';
//Import des components pour leur appel par le module
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent} from './home/home.component'
// Lien entre le chemin et le composant, "**" signifie une redirection de tous ce qui n'est pas connue vers le Home
const routes: Routes = [
    {path : '', component: HomeComponent},
    { path: 'help', component: HelpComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo:''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
