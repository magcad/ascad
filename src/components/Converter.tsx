import React, { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { CONSTANTS } from '../constants';
import { Scenario } from '../models/scenario';
import FileUploader from './FileUploader';
import Processes from './Processes';

type ConverterProps = {
  files: File[];
  scenario: Scenario;
}
const Converter: React.FC<ConverterProps> = ({
  files,
  scenario,
}) => {
  const [uploadedModelsIds, setUploadedModelsIds] = useState<number[] | null>(null);

  const handleFileUploadEnd = (modelIds: number[]) => {
    setUploadedModelsIds(modelIds);
  }

  return (
    <>
      <FileUploader files={files} onFileUploadEnd={handleFileUploadEnd} />
      {uploadedModelsIds !== null ?
        <Processes
          scenario={scenario}
          modelIds={uploadedModelsIds}
        /> :
        null
      }
    </>
  );
}

export default Converter;
