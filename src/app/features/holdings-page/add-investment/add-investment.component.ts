import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Investment } from '../../../core/models/investment';
import { Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-investment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-investment.component.html',
  styleUrls: ['./add-investment.component.css'],
})
export class AddInvestmentComponent {
 
}