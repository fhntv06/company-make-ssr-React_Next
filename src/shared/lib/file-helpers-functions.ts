import { ChangeEvent } from 'react';

interface FileType {
  name: string;
  file: string;
}

export function convertFileToSend(item: File): Promise<FileType> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    const fileNameStatic = item.name.split('.');
    let fileName = '';
    fileNameStatic.forEach((i, index) => {
      if (index !== fileNameStatic.length - 1) {
        fileName += i;
      }
    });

    reader.onload = () => {
      resolve({
        name: fileName,
        file: reader.result?.toString().split(',')[1] || '',
      });
    };
    reader.readAsDataURL(item);
  });
}

export function checkIsFileValid(e: ChangeEvent<HTMLInputElement>) {
  const fileTarget = e.target.files![0];

  const fileSizeInBytes = fileTarget.size;
  const kilobytes = fileSizeInBytes / 1024;
  const megabytes = kilobytes / 1024;

  const fileType = fileTarget.type;
  const acceptableTypes = [
    'image/png',
    'image/jpeg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ];

  return megabytes <= 2 && acceptableTypes.includes(fileType);
}
