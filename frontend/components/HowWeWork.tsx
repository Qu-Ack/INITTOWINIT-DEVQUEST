import React from "react";

const HowWeWork = () => {
  return (
    <div
      id="how-we-work"
      className="bg-gray-50 min-h-screen py-10 px-6 flex flex-col justify-center items-center"
    >
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          How <span className="text-lime-600">We Work</span>
        </h1>
        <p className="text-lg text-gray-600">
          At our platform, we combine modern technology with the ancient wisdom
          of Ayurveda to deliver personalized health insights and remedies.
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="max-w-5xl mx-auto mt-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-lime-600 rounded-full mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Upload Your Face & Nails
            </h3>
            <p className="text-gray-600 text-center">
              Start by uploading a clear image or video of your face and nails.
              This helps us analyze your skin texture, nail conditions, and
              overall health indicators.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-lime-600 rounded-full mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Analyze Characteristics
            </h3>
            <p className="text-gray-600 text-center">
              Using advanced image processing and Ayurvedic principles, we
              extract nail and skin characteristics, such as texture, color, and
              patterns.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-lime-600 rounded-full mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Detect Symptoms
            </h3>
            <p className="text-gray-600 text-center">
              We identify potential symptoms of health conditions based on your
              skin and nail analysis, connecting them to Ayurvedic knowledge for
              deeper insights.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-lime-600 rounded-full mx-auto mb-4">
              <span className="text-2xl font-bold">4</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Suggest Remedies
            </h3>
            <p className="text-gray-600 text-center">
              Based on the analysis, we offer tailored Ayurvedic remedies to
              support your health, including herbal treatments and dietary
              suggestions.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-lime-600 rounded-full mx-auto mb-4">
              <span className="text-2xl font-bold">5</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Lifestyle Recommendations
            </h3>
            <p className="text-gray-600 text-center">
              Get personalized lifestyle recommendations, including daily
              routines, exercises, and relaxation techniques, to improve your
              overall well-being.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-lime-600 rounded-full mx-auto mb-4">
              <span className="text-2xl font-bold">6</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Your Wellness Journey
            </h3>
            <p className="text-gray-600 text-center">
              Follow our guidance to take charge of your health. Track progress
              and optimize your lifestyle for long-term wellness with our
              support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
