using Microsoft.AspNetCore.Mvc;
using PortfolioTrackerApi.Models;
using PortfolioTrackerApi.Services;

namespace PortfolioTrackerApi.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class InvestmentController : ControllerBase
{
    private readonly IInvestmentService _investmentService;

    public InvestmentController(IInvestmentService investmentService)
    {
        _investmentService = investmentService;
    }

    [HttpPost("stock")]
    public async Task<IActionResult> AddStock([FromBody] StockInvestment stock)
    {
        stock.Type = "Stock";

        if (stock.TransactionType == "Buy")
        {
            if (stock.PurchaseDate == null || stock.PurchasePrice == null)
                return BadRequest("Missing purchase info for Buy transaction.");
        }
        else if (stock.TransactionType == "Sell")
        {
            if (stock.RedemptionDate == null || stock.SellPrice == null)
                return BadRequest("Missing sell info for Sell transaction.");
        }
        else
        {
            return BadRequest("TransactionType must be 'Buy' or 'Sell'.");
        }

        await _investmentService.AddInvestmentAsync(stock);
        return Ok("Stock investment saved.");
    }

    [HttpPost("bond")]
    public async Task<IActionResult> AddBond([FromBody] BondInvestment bond)
    {
        bond.Type = "Bond";
        await _investmentService.AddInvestmentAsync(bond);
        return Ok("Bond investment saved.");
    }

    [HttpPost("mutualfund")]
    public async Task<IActionResult> AddMutualFund([FromBody] MutualFundInvestment mf)
    {
        mf.Type = "MutualFund";
        await _investmentService.AddInvestmentAsync(mf);
        return Ok("Mutual fund investment saved.");
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUser(int userId)
    {
        var investments = await _investmentService.GetInvestmentsByUserAsync(userId);
        return Ok(investments);
    }
}

}
