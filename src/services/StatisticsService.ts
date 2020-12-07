// Import specific functions only when finished developments
import * as simple from "simple-statistics"

class StatisticsService {
  constructor() {

  }

  getMin(data: any) {
    return simple.min(data)
  }
  getMax(data: any) {
    return simple.max(data)
  }
  getMean(data: any) {
    return simple.mean(data)
  }
}

export default StatisticsService
