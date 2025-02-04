import { Component, OnInit, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.addSmoothScrollListener();
  }

  addSmoothScrollListener() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      this.renderer.listen(link, 'click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href')?.substring(1); // Pega o id da âncora
        const targetElement = document.getElementById(targetId || ''); // Obtém o elemento de destino

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Para garantir que o topo da seção seja visível
          });
        }
      });
    });
  }
}
