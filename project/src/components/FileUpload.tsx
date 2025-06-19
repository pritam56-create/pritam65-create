import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

interface FileUploadProps {
  onFileUpload: (file: File, content: string) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authState, canUpload, updateUploadCount } = useAuth();
  const { settings } = useSettings();

  const handleFileSelect = async (file: File) => {
    setUploadError(null);

    // Check file type
    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed');
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    // Check upload limit
    if (!canUpload()) {
      setUploadError('Upload limit reached (10 files per 24 hours)');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(file, content);
        updateUploadCount();
      };
      reader.readAsText(file);
    } catch (error) {
      setUploadError('Failed to read file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const remainingUploads = authState.user ? 10 - authState.user.uploadCount : 0;

  return (
    <div className="relative">
      <motion.div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          isDragging
            ? settings.theme === 'dark'
              ? 'border-violet-500 bg-violet-900/20'
              : 'border-blue-500 bg-blue-50'
            : settings.theme === 'dark'
              ? 'border-gray-700 hover:border-gray-600'
              : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <Upload className={`w-12 h-12 mx-auto mb-4 ${
          settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`} />

        <h3 className={`text-lg font-semibold mb-2 ${
          settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Upload PDF File
        </h3>

        <p className={`text-sm mb-4 ${
          settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Drag and drop a PDF file here, or click to select
        </p>

        <div className={`text-xs ${
          settings.theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <p>• Only PDF files allowed</p>
          <p>• Maximum file size: 10MB</p>
          <p>• Remaining uploads today: {remainingUploads}/10</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {uploadError && (
          <motion.div
            className={`mt-4 p-3 rounded-lg border flex items-center space-x-2 ${
              settings.theme === 'dark'
                ? 'bg-red-900/20 border-red-700 text-red-400'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{uploadError}</span>
            <button
              onClick={() => setUploadError(null)}
              className="ml-auto p-1 rounded hover:bg-red-800/20"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};