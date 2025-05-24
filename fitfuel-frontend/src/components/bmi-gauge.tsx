import { GaugeComponent } from "react-gauge-component"
import { getBMICategory } from "../utils/bmi-utils"

interface BMIGaugeProps {
  bmi: number
  size: number
}

export function BMIGauge({ bmi, size }: BMIGaugeProps) {
  return (
    <div style={{ width: size, height: size / 2 }}>
      <GaugeComponent
        style={{ width: "100%", height: "100%" }}
        type="radial"
        arc={{
          width: 0.5,
          padding: 0.01,
          cornerRadius: 1,
          subArcs: [
            {
              limit: 18.4,
              color: "#657cff",
              showTick: true,
              tooltip: {
                text: "Underweight",
              },
            },
            {
              limit: 24.9,
              color: "#49ab60",
              showTick: true,
              tooltip: {
                text: "Normal",
              },
            },
            {
              limit: 29.9,
              color: "#ffb505",
              showTick: true,
              tooltip: {
                text: "Overweight",
              },
            },
            {
              limit: 34.9,
              color: "#ff8500",
              tooltip: {
                text: "Obese",
              },
            },
            {
              limit: 40,
              color: "#fd545b",
              tooltip: {
                text: "Extremely Obese",
              },
            },
          ],
        }}
        pointer={{
          color: "#345243",
          length: 0.3,
          width: 15,
          elastic: true,
        }}
        labels={{
          valueLabel: {
            matchColorWithArc: true,
            formatTextValue: (value) => value.toFixed(2),
            style: { fontSize: 16 },
          },
          tickLabels: {
            type: "inner",
            ticks: [{ value: 18.4 }, { value: 24.9 }, { value: 29.9 }, { value: 34.9 }],
            defaultTickValueConfig: {
              formatTextValue: (bmiIndex: number) => bmiIndex.toString(),
              style: { fontSize: 14 },
            },
            defaultTickLineConfig: {},
            hideMinMax: true,
          },
        }}
        value={bmi}
        minValue={15}
        maxValue={40}
      />
      <div className="text-center pt-4">
        <span className="font-xl">{getBMICategory(bmi)}</span>
      </div>
    </div>
  )
}
