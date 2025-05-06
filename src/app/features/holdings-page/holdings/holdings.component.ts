import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; // Import the AuthService
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInvestmentComponent } from '../add-investment/add-investment.component';
import { InvestmentModalComponent } from '../investment-modal/investment-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-holdings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddInvestmentComponent,
    ReactiveFormsModule,
    FormsModule,
    InvestmentModalComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.css'],
})
export class HoldingsComponent implements OnInit {
  investments: any[] = [];

  totalInvestmentValue = 0;
  totalInvestmentCost = 0;
  totalGainLoss = 0;
  totalGainLossPercentage = 0;
  perDayGainLoss = 10;
  loading = true;
  error = '';
  showInvestmentModal = false;
  editMode = false;
  selectedType = 'stock';
  selectedInvestment = null;
  showDeleteConfirm = false;
  investmentToDelete: any = null;
  userId: number = 0; // Initialize userId
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('User ID:', this.userId);
    this.userId = Number(localStorage.getItem('userId'));
    this.loadInvestments();
  }

  loadInvestments(): void {
    this.http
      .get<any[]>(`http://localhost:5154/api/Investment/user/${this.userId}`)
      .subscribe({
        next: (data) => {
          console.log('Fetched investments:', data); // Debugging line to check data
          // this.investments = data.filter(
          //   (inv) => inv.userId === this.userId && inv.transactionType === 'buy'
          // );
          this.investments = data;

          console.log('Filtered investments:', this.investments); // Log filtered investments
          this.calculateTotals();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching investments:', err); // Log the error
          this.error = 'Failed to load investments';
          this.loading = false;
        },
      });
  }

  calculateTotals(): void {
    this.totalInvestmentCost = 0;
    this.totalInvestmentValue = 0;

    for (const inv of this.investments) {
      if (inv.type === 'stock') {
        const cost = inv.purchasePrice * inv.numberOfShares;
        this.totalInvestmentCost += cost;
        const currentPrice = inv.purchasePrice * 1.05; // Dummy current price +5%
        this.totalInvestmentValue += currentPrice * inv.numberOfShares;
      } else if (inv.type === 'mutualFund') {
        const units =
          inv.amountType === 'Rupees' ? inv.amount / inv.price : inv.amount;
        const currentPrice = inv.price * 1.05;
        this.totalInvestmentCost += units * inv.price;
        this.totalInvestmentValue += units * currentPrice;
      } else if (inv.type === 'goldBond') {
        console.log('Gold Bond:', inv); // Debugging line to check data
        const cost = inv.units * inv.price; // Initial cost of investment
        const currentPrice = inv.price * 1.05; // Assuming 5% appreciation in current value
        this.totalInvestmentCost += cost;
        this.totalInvestmentValue += inv.units * currentPrice;
      } else if (inv.type === 'bond') {
        this.totalInvestmentCost += inv.investmentAmount;
        this.totalInvestmentValue += inv.investmentAmount * 1.02; // Assume 2% appreciation
      }
    }

    this.totalGainLoss = this.totalInvestmentValue - this.totalInvestmentCost;
    this.totalGainLossPercentage =
      (this.totalGainLoss / this.totalInvestmentCost) * 100;
  }

  refreshPrices(): void {
    this.loadInvestments(); // Simulate a refresh
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToHoldings(): void {
    this.router.navigate(['/holdings']);
  }

  goToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  openAddInvestmentModal() {
    this.editMode = false;
    this.selectedType = 'stock';
    this.selectedInvestment = null;
    this.showInvestmentModal = true;
  }

  openEditInvestmentModal(inv: any) {
    this.editMode = true;
    this.selectedType = inv.type;
    this.selectedInvestment = { ...inv };
    this.showInvestmentModal = true;
  }

  closeInvestmentModal() {
    this.showInvestmentModal = false;
  }

  handleInvestmentSave(event: any) {
    const payload = {
      ...event,
      transactionType: event.transactionType || 'Buy', // Ensure valid transactionType
      userId: this.userId, // Include userId
    };

    if (this.editMode) {
      this.http
        .put(`http://localhost:5154/api/Investment/${event.id}`, payload)
        .subscribe({
          next: () => this.loadInvestments(),
          error: (err) => console.error('Error updating investment:', err),
        });
    } else {
      this.http
        .post(`http://localhost:5154/api/Investment/stock`, payload)
        .subscribe({
          next: () => this.loadInvestments(),
          error: (err) => console.error('Error adding investment:', err),
        });
    }
    this.closeInvestmentModal();
    console.log('Payload being sent:', payload);
  }

  confirmDelete(inv: any) {
    this.investmentToDelete = inv;
    this.showDeleteConfirm = true;
  }

  deleteInvestment() {
    // this.investmentService.deleteInvestment(this.investmentToDelete.id).subscribe(() => this.loadInvestments());
    this.showDeleteConfirm = false;
    this.loadInvestments(); // Refresh after delete
  }
}
