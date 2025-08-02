import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private document = inject(DOCUMENT);

  isMobile = signal(false);

  constructor() {
    this.checkScreenSize();
    this.document.defaultView?.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  private checkScreenSize(): void {
    const isMobileView = this.document.defaultView?.innerWidth ?? 1024;
    this.isMobile.set(isMobileView <= 767);
  }
}
