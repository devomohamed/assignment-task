import { Injectable } from '@angular/core';
import * as AOS from 'aos';

@Injectable({
  providedIn: 'root',
})
export class AosService {
  init() {
    AOS.init({
      duration: 800, // Animation duration
      easing: 'ease-in-out', // Easing type
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
      offset: 100, // Offset (in px) from the original trigger point
    });
  }

  refresh() {
    AOS.refresh();
  }
}
