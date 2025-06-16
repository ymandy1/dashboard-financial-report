import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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



  mostrarSidebar = false;

  fecharSidebar() {
    this.mostrarSidebar = false;
  }
}
