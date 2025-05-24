export const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    if (bmi < 35) return "Obese"
    return "Extremely Obese"
  }
  
  export const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return "#657cff"
    if (bmi < 25) return "#49ab60"
    if (bmi < 30) return "#ffb505"
    if (bmi < 35) return "#ff8500"
    return "#fd545b"
  }
  
  export const calculateBMI = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2)
  }
  