"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function MedicalReport() {
  const schema = {
    outputs: {
      disease: "Calcium Deficiency",
      dosha_analysis: {
        vata: "severely imbalanced",
        pitta: "balanced",
        kapha: "balanced",
      },
      observations: [
        "Peeling nails and dry skin indicate calcium deficiency.",
        "Slow nail growth suggests systemic Vata imbalance.",
      ],
      recommendations: {
        diet: [
          "Include calcium-rich foods like milk, almonds, and leafy greens.",
          "Consume sesame seeds for bone health.",
        ],
        lifestyle: [
          "Avoid overexertion and prioritize restful sleep.",
          "Use warm mustard oil for skin hydration.",
        ],
        herbal_remedies: [
          "Ashwagandha for improving bone strength.",
          "Musta for aiding digestion and nutrient absorption.",
          "Licorice tea for reducing dryness.",
        ],
      },
    },
  };

  return (
    <div className="mx-8 my-4">
      <header className="text-4xl font-medium mb-6">Analysis Report</header>

      <section className="mb-6">
        <h2 className="text-xl font-bold">Predicted Disease</h2>
        <p>{schema.outputs.disease}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold">Dosha Analysis</h2>
        <ul>
          <li>
            <strong>Vata:</strong> {schema.outputs.dosha_analysis.vata}
          </li>
          <li>
            <strong>Pitta:</strong> {schema.outputs.dosha_analysis.pitta}
          </li>
          <li>
            <strong>Kapha:</strong> {schema.outputs.dosha_analysis.kapha}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold">Observations</h2>
        <ul>
          {schema.outputs.observations.map((observation, index) => (
            <li key={index}>{observation}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold">Recommendations</h2>
        <div>
          <h3 className="font-semibold">Diet:</h3>
          <ul>
            {schema.outputs.recommendations.diet.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Lifestyle:</h3>
          <ul>
            {schema.outputs.recommendations.lifestyle.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Herbal Remedies:</h3>
          <ul>
            {schema.outputs.recommendations.herbal_remedies.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default function Consultation() {
  const accuracy = 75; // Example accuracy value in percentage

  // Chart.js data
  const data = {
    labels: ["Accuracy", "Remaining"],
    datasets: [
      {
        data: [accuracy, 100 - accuracy],
        backgroundColor: ["#4CAF50", "#E0E0E0"], // Green for accuracy, gray for remaining
        hoverBackgroundColor: ["#45A049", "#BEBEBE"],
        borderWidth: 0,
      },
    ],
  };

  // Chart.js options
  const options = {
    cutout: "70%", // Creates a ring-like chart
    responsive: true,
    maintainAspectRatio: false, // Prevents chart from maintaining aspect ratio, making it resize with its container
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false, // Hides the legend
      },
      // Custom plugin to display percentage in the middle of the chart
      datalabels: {
        display: true,
        color: "#000",
        font: {
          size: 24,
          weight: "bold",
        },
        formatter: function (value) {
          return `${accuracy}%`; // Display the accuracy percentage
        },
        align: "center",
        anchor: "center",
      },
    },
  };

  return (
    <main className="px-12 py-8 flex flex-col flex-1 h-screen">
      <h1 className="text-6xl mb-10 border-b-2 border-gray-900 py-4">
        Consultation with Baba
      </h1>
      <div className="flex gap-10 flex-1">
        <div className="flex flex-1 flex-col gap-8">
          <section className="flex flex-1 justify-center items-center border-2 border-lime-400 border-dashed rounded-xl">
            Image container
          </section>
          <section className="rounded-xl bg-neutral-50 border-2 flex-col flex flex-1 p-6">
            <div className="text-2xl text-center mb-6">Accuracy of Baba</div>
            <div className="flex justify-center items-center w-full h-full">
              <div className="w-64 h-64">
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </section>
        </div>
        <div className="flex-1 rounded-xl bg-neutral-50 border-2">
          <MedicalReport />
        </div>
      </div>
    </main>
  );
}
