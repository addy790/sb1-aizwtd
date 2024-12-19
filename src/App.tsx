import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { DataProcessor } from './components/DataProcessor';
import { Features } from './components/Features';
import { DataVisualization } from './components/DataVisualization';
import { ComplianceChecker } from './components/ComplianceChecker';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      <main>
        <div className="bg-gradient-to-b from-purple-800 to-indigo-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Next-Gen Data Anonymization Platform
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Protect sensitive data with advanced anonymization techniques while maintaining data utility.
              Perfect for compliance with GDPR, CCPA, and other privacy regulations.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 space-y-8">
          <DataProcessor />
          <DataVisualization />
          <ComplianceChecker />
          <Features />
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 DataShield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;