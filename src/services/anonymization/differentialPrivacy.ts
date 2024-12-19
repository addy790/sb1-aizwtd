export class DifferentialPrivacyService {
  private epsilon: number;

  constructor(epsilon: number = 0.1) {
    this.epsilon = epsilon;
  }

  addLaplaceNoise(value: number, sensitivity: number): number {
    const scale = sensitivity / this.epsilon;
    const u1 = Math.random();
    const u2 = Math.random();
    const noise = -scale * Math.sign(u1 - 0.5) * Math.log(1 - 2 * Math.abs(u1 - 0.5));
    return value + noise;
  }

  anonymizeDataset(data: number[]): number[] {
    const sensitivity = Math.max(...data) - Math.min(...data);
    return data.map(value => this.addLaplaceNoise(value, sensitivity));
  }
}