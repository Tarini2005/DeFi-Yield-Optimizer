import { calculateImpermanentLoss } from '../../src/services/calculationService';

describe('Impermanent Loss Calculator', () => {
  test('should calculate zero impermanent loss when price does not change', () => {
    const result = calculateImpermanentLoss(1, 2000, 0);
    
    expect(result.impermanentLossPercent).toBeCloseTo(0, 2);
    expect(result.holdValue).toBeCloseTo(result.lpValue, 2);
  });
  
  test('should calculate correct impermanent loss for 50% price increase', () => {
    const result = calculateImpermanentLoss(1, 2000, 0.5);
    
    expect(result.impermanentLossPercent).toBeCloseTo(2.02, 1);
    expect(result.holdValue).toBeGreaterThan(result.lpValue);
  });
  
  test('should calculate correct impermanent loss for 50% price decrease', () => {
    const result = calculateImpermanentLoss(1, 2000, -0.5);

    expect(result.impermanentLossPercent).toBeCloseTo(2.02, 1);
    expect(result.holdValue).toBeGreaterThan(result.lpValue);
  });
  
  test('should calculate severe impermanent loss for extreme price changes', () => {
    const result = calculateImpermanentLoss(1, 2000, 4);
    

    expect(result.impermanentLossPercent).toBeGreaterThan(5);
  });
  
  test('should handle different token amounts correctly', () => {
    const result1 = calculateImpermanentLoss(1, 2000, 0.5);
    const result2 = calculateImpermanentLoss(2, 4000, 0.5);
    
    expect(result1.impermanentLossPercent).toBeCloseTo(result2.impermanentLossPercent, 5);
  });
  
  test('should return correct token amounts after price change', () => {
    const token1Amount = 1;
    const token2Amount = 2000;
    const priceChangeRatio = 0.5; 
    
    const result = calculateImpermanentLoss(token1Amount, token2Amount, priceChangeRatio);
    
    const initialK = token1Amount * token2Amount;
    const newK = result.token1NewAmount * result.token2NewAmount;
    
    expect(newK).toBeCloseTo(initialK, 5);
    
    const initialPrice = token2Amount / token1Amount;
    const newPrice = initialPrice * (1 + priceChangeRatio);
    expect(result.newPrice).toBeCloseTo(newPrice, 5);
  });
});
