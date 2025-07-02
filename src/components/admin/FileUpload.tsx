/**
 * Komponen untuk upload file dengan drag & drop
 */
import { useState, useRef } from 'react';
import { Upload, X, Image, File } from 'lucide-react';
import { Button } from '../ui/button';

interface FileUploadProps {
  onFilesUpload: (files: File[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  currentFiles?: string[];
  onRemoveFile?: (index: number) => void;
}

export default function FileUpload({ 
  onFilesUpload, 
  acceptedTypes = "image/*",
  maxFiles = 5,
  maxSize = 10,
  currentFiles = [],
  onRemoveFile
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };
  
  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      // Check file type
      if (acceptedTypes !== "*" && !file.type.match(acceptedTypes)) {
        alert(`File ${file.name} tidak didukung. Hanya file ${acceptedTypes} yang diizinkan.`);
        return false;
      }
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} terlalu besar. Maksimal ${maxSize}MB.`);
        return false;
      }
      
      return true;
    });
    
    if (uploadedFiles.length + validFiles.length > maxFiles) {
      alert(`Maksimal ${maxFiles} file yang diizinkan.`);
      return;
    }
    
    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onFilesUpload(newFiles);
  };
  
  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUpload(newFiles);
  };
  
  const removeCurrentFile = (index: number) => {
    if (onRemoveFile) {
      onRemoveFile(index);
    }
  };
  
  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drag & drop file di sini, atau klik untuk browse
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Maksimal {maxFiles} file dengan ukuran {maxSize}MB per file
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Pilih File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleChange}
          className="hidden"
        />
      </div>
      
      {/* Current Files Preview */}
      {currentFiles.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">File Saat Ini:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={file}
                    alt={`File ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeCurrentFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">File Baru:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                  {getFilePreview(file) ? (
                    <img
                      src={getFilePreview(file)!}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <File className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
