import { Component, inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  constructor(public renderer: Renderer2) {}

  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  removeBorder(searchEl) {
    searchEl.style.border = 'none';
    const style = this.renderer.createElement('style');
    style.textContent = `
      #${searchEl.id}::placeholder {
        color: #757575;
      }
    `;
    this.renderer.appendChild(document.head, style);
  }

  OnSearchClicked(searchEl: HTMLInputElement) {
    if (searchEl.value != '') {
      this.router.navigate(['Courses'], {
        relativeTo: this.activeRoute,
        queryParams: { search: searchEl.value },
      });
    } else {
      searchEl.style.border = '2px solid red';
      const style = this.renderer.createElement('style');
      style.textContent = `
      #search-input::placeholder {
        color: red;
      }
    `;
      this.renderer.appendChild(document.head, style);
    }
  }
}
