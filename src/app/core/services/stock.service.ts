import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StockService {
  private apiUrl = 'http://localhost:5154/api/Investment/stock';

  constructor(private http: HttpClient) {}

  addStock(data: any) {
    const userId = localStorage.getItem('userId'); // Fetch the user ID from localStorage
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const payload = {
        ...data,
        transactionType: data.transactionType || 'Buy', // Default to 'Buy' if not provided
        userId: userId, 
    };
    console.log('Payload:', payload);

    return this.http.post(this.apiUrl, payload);
  }

  updateStock(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteStock(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getStocks(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
