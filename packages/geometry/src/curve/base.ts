const DefaultStep = 0.05

export default abstract class AbstractCurve<IConfig> {
  dataPoints: number[]

  protected step: number

  private interpolationPoints: number[]

  protected config: IConfig

  constructor(points: number[], config: IConfig, step?: number) {
    this.config = config
    this.dataPoints = points
    this.interpolationPoints = []
    this.step = step ?? DefaultStep
  }

  setStep(step: number) {
    this.step = step
  }

  getStep() {
    return this.step
  }

  setConfig(config: Partial<IConfig>) {
    this.config = Object.assign(this.config, config)
  }

  getConfig() {
    return this.config
  }

  getInterpolation(forceUpdate = true) {
    if (forceUpdate) {
      this.validate()
      this.interpolationPoints = this.interpolate()
    }
    return this.interpolationPoints
  }

  abstract validate(): void

  abstract interpolate(): number[]
}
