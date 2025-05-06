import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Input, Output } from '@angular/core';
import { StockFormComponent } from '../stock-form/stock-form.component';


@Component({
  selector: 'app-investment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, StockFormComponent],
  templateUrl: './investment-modal.component.html',
  styleUrl: './investment-modal.component.css'
})
  export class InvestmentModalComponent {
    @Input() isEditMode = false;
    @Input() data: any = null;
    @Input() selectedType: string = 'stock';
    @Output() closeModal = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();
  
    onTypeChange() {
      this.data = null; // Reset form data on type change
    }
  
    close() {
      this.closeModal.emit();
    }
  
    onSave(event: any) {
      this.save.emit(event);
      this.close();
  }
}
