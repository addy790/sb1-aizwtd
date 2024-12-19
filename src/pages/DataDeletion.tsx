import React, { useEffect, useState } from 'react';
import { Shield, Trash2, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { FacebookDataService } from '../services/facebook/FacebookDataService';

export const DataDeletion: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const [message, setMessage] = useState('Processing your data deletion request...');

  useEffect(() => {
    const userId = searchParams.get('id');
    const confirmDeletion = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not provided');
        }
        const service = FacebookDataService.getInstance();
        await service.deleteUserData(userId);
        setStatus('completed');
        setMessage('Your data has been successfully deleted.');
      } catch (error) {
        console.error('Data deletion error:', error);
        setStatus('error');
        setMessage('Failed to process data deletion request.');
      }
    };

    confirmDeletion();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            {status === 'processing' && <Shield className="w-16 h-16 text-blue-500 animate-pulse" />}
            {status === 'completed' && <Trash2 className="w-16 h-16 text-green-500" />}
            {status === 'error' && <AlertCircle className="w-16 h-16 text-red-500" />}
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-4">
            Data Deletion Request
          </h1>
          
          <p className="text-center text-gray-600 mb-6">
            {message}
          </p>

          <div className={`text-sm ${
            status === 'completed' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 
            'text-blue-600'
          } text-center`}>
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
}