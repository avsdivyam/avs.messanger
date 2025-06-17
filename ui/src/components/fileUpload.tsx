interface FileUploaderProps {
  onChange: (file: File) => void;
  accept?: string;
}

export function FileUploader({ onChange, accept }: FileUploaderProps) {
  return (
    <input
      type="file"
      accept={accept}
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          onChange(e.target.files[0]);
        }
      }}
    />
  );
}
