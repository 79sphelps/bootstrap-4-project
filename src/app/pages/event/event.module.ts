// src/app/pages/event/event.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from "./../../core/core.module";
import { RouterModule } from "@angular/router";
import { EVENT_ROUTES } from "./event.routes";
import { EventComponent } from "./event.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";

@NgModule({
  imports: [CommonModule, CoreModule, RouterModule.forChild(EVENT_ROUTES)],
  declarations: [EventComponent, EventDetailComponent]
})
export class EventModule {}
