import { useRef } from 'react'
import { Card } from 'primereact/card'
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

const ImageUpload = () => {
    const toast = useRef<any>(null);

    const onUpload = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
  
    return (
      <>
        <Toast ref={toast}></Toast>
  
        <Card title="Image Upload">
          <div className='grid'>
            <div className='col-12'>
            <FileUpload name="image[]" 
              url="https://primefaces.org/primereact/showcase/upload.php"
              onUpload={onUpload} 
              multiple accept="image/*" 
              maxFileSize={1000000}
              emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            </div>
          </div>
        </Card>
      </>
    )
}

export default ImageUpload