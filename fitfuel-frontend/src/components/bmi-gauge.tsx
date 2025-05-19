import { GaugeComponent } from 'react-gauge-component';

interface BMIGaugeProps {
  bmi: number;
  size?: number;
}

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal"
  if (bmi < 30) return "Overweight"
  if (bmi < 35) return "Obese"
  return "Extremely Obese"
};

export function BMIGauge({ bmi, size }: BMIGaugeProps) {
  return (
    <div style={{ width: size, height: size  /2 }}>
      <GaugeComponent
        style={{ width: '100%', height: '100%' }}
        type="semicircle"
        arc={{
          width: 0.5,
          padding: 0.01,
          cornerRadius: 1,
          subArcs: [
            {
              limit: 18.4,
              color: '#657cff',
              showTick: true,
              tooltip: {
                text: 'Underweight'
              }
            },
            {
              limit: 24.9,
              color: '#49ab60',
              showTick: true,
              tooltip: {
                text: 'Normal'
              }
            },
            {
              limit: 29.9,
              color: '#ffb505',
              showTick: true,
              tooltip: {
                text: 'Overweight'
              }
            },
            {
              limit: 34.9,
              color: '#ff8500',
              tooltip: {
                text: 'Obese'
              }
            },
            {
              limit: 40,
              color: '#fd545b',
              tooltip: {
                text: 'Extremely Obese'
              }
            },
          ]
        }}
        pointer={{
          color: '#345243',
          length: 0.30,
          width: 15,
          elastic: true,
        }}
        labels={{
          valueLabel: { 
            matchColorWithArc: true,
            formatTextValue: value => value.toFixed(2),
            style: { fontSize: 14 }
          },
          tickLabels: {
            type: 'inner',
            ticks: [
              { value: 18.4 },
              { value: 24.9 },
              { value: 29.9 },
              { value: 34.9 }
            ],
            defaultTickValueConfig: {
              formatTextValue: (bmiIndex: number) => bmiIndex.toString(),
              style: { fontSize: 10 }
            },
            defaultTickLineConfig: {
            },
            hideMinMax: true,
          }
        }}
        value={bmi}
        minValue={15}
        maxValue={40}
      />
      <div className="text-center">
        <span className="text-sm font-medium">{getBMICategory(bmi)}</span>
      </div>
    </div>
  );
}