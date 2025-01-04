import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileChange: (files: FileList | null) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
      if (totalSize > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Total file size must not exceed 10MB",
          variant: "destructive",
        });
        return;
      }
      onFileChange(files);
      toast({
        title: "Files added",
        description: `${files.length} file(s) selected`,
      });
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        Project Files (Optional)
      </label>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-primary/10 bg-muted/50 hover:bg-muted/70 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, Images (MAX. 10MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
        </label>
      </div>
    </div>
  );
};