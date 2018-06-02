import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material'

@NgModule({
    imports: [ MatButtonModule, MatIconModule, MatListModule, MatInputModule ],
    exports: [ MatButtonModule, MatIconModule, MatListModule, MatInputModule ]
})
export class MaterialLoaderModule { }
