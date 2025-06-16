import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})

export class MainLayoutComponent implements OnInit {

  userName?: string;

  ngOnInit(): void {
    this.userName = localStorage.getItem("nome")!!
    console.log(this.userName)
  }

  constructor(private router: Router) { }

  mostrarSidebar = false;

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

  fecharSidebar() {
    this.mostrarSidebar = false;
  }
}
