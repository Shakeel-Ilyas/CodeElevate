import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  servicesService = inject(ServicesService);
  services: { title: string; image: string; description: string }[] = [];

  ngOnInit() {
    this.services = this.servicesService.services;
  }
}
