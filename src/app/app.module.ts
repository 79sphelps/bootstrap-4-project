import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Event Module
import { EventModule } from "./pages/event/event.module";

// Admin Module
import { AdminModule } from "./pages/admin/admin.module";

// Routing Module
import { AppRoutingModule } from "./app-routing.module";

// Auth Modules
import { AuthModule } from "./auth/auth.module";

// Core Modules
import { CoreModule } from "./core/core.module";

// Components
import { AppComponent } from "./app.component";
import { ServicesComponent } from "./services/services.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { AboutComponent } from "./about/about.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./pages/home/home.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { CustomServicesComponent } from "./pages/custom-services/custom-services.component";

import { PaginationComponent } from "./pagination/pagination.component";

// Services
import { PaginationService } from "./pagination/pagination.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ServicesComponent,
    GalleryComponent,
    AboutComponent,
    ContactUsComponent,
    CarouselComponent,
    NavbarComponent,
    HomeComponent,
    CallbackComponent,
    CustomServicesComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    EventModule,
    AdminModule
  ],
  providers: [Title, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
