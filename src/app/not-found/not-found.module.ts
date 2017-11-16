import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "./not-found.component";
import { LayoutModule } from "../layout/layout.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
