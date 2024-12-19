import React from 'react';
import { Shield, Lock, RefreshCw, Database, Facebook, Key } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: 'Advanced Anonymization',
      description: 'Multiple techniques to protect sensitive data while maintaining data utility'
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: 'Secure Vault',
      description: 'Encrypted storage for your sensitive data mappings and transformations'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-green-600" />,
      title: 'Data Recovery',
      description: 'Recover original data using our advanced reconstruction algorithms'
    },
    {
      icon: <Database className="w-6 h-6 text-red-600" />,
      title: 'Data Management',
      description: 'Comprehensive database for storing and managing processed data'
    },
    {
      icon: <Facebook className="w-6 h-6 text-blue-600" />,
      title: 'FB Integration',
      description: 'Direct integration with Facebook Graph API for data processing'
    },
    {
      icon: <Key className="w-6 h-6 text-yellow-600" />,
      title: 'Access Control',
      description: 'Fine-grained access control for team collaboration'
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};