import { useRef, useState } from 'react'
import { Card } from 'primereact/card'
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useUserPictureUpload } from '../graphQL/mutation/useUserPictureUpload';
import { Button } from 'primereact/button';
import axios from 'axios';

interface UploadType{
  userId:string;
}

const ImageUpload = ({ userId }:UploadType) => {
    const toast = useRef<any>(null);
    const [image,setImage] = useState<any>(null);
    //const [  upload ] = useUserPictureUpload();
    const inputRef = useRef<any>(null);

    // const onUpload = () => {
    //     toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    // }

    const onChange = ( e : any) => {
      //debugger
      let files = e.target.files[0];
        setImage(files);
    }

    // const myUploader = (event:any) => {
    //   debugger;
    //   let file = event.files;

    //   // upload({
    //   //   variables:{
    //   //     input:{
    //   //       id: "0",
    //   //       file: [file]
    //   //     }
    //   //   }
    //   // }).then((res)=>{
    //   //   console.log('upload success')
    //   // }).catch(err=> console.log(err));

    //   event.options.clear();
    // }
    const callUploadAPI = () => {
      const url = "https://localhost:5006/api/utility/UploadPhoto";
      const formData = new FormData();
      formData.append('image',image);
      formData.append('userId',userId);

      axios.post(url,formData)
      .then((res)=>{
          console.log(res);

          setImage(null);

          resetFileInput();
      })
      .catch(err => console.log(err));
    }

    const resetFileInput = () => {
      // 👇️ reset input value
      inputRef.current.value = null;
    };
  
    return (
      <>
        <Toast ref={toast}></Toast>
  
        <Card title="Image Upload">
          <div className='grid'>
            <div className='col-4'>
            {/* <FileUpload name="image" 
              url="https://localhost:5006/api/utility/UploadPhoto"
              onUpload={onUpload} 
              multiple accept="image/*" 
              maxFileSize={1000000}
              emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} 
              customUpload 
              uploadHandler={myUploader}
              /> */}
              <input ref={inputRef} type="file" required onChange={onChange} />
            </div>
            <div className='col-4'>
              <Button label="Upload" icon="pi pi-upload" iconPos="left" onClick={callUploadAPI}/>
            </div>
            <div className='col-4'>
              <Button label="Reset" icon="pi pi-refresh" iconPos="left" onClick={resetFileInput}/>
            </div>
          </div>
        </Card>
      </>
    )
}

export default ImageUpload