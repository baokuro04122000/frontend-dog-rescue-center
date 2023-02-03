import { UploadFile } from "antd"
import { RcFile, UploadChangeParam, UploadProps } from "antd/lib/upload"

import { useState } from "react"
import { UploadPayload } from '../interfaces/authentication'

import axios, { AxiosError } from 'axios'
import { TFunction } from "i18next";

const USER_ID = 'images-dog-rescue-center'

export const useUpload = (t: TFunction<"translation", undefined, "translation">) => {

  const [uploadLoading, setUploadLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [deleteList, setDeleteList] = useState<string[]>([])
  const [err, setErr] = useState('')
  const [progress, setProgress] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload =async ({ onSuccess, onError, file, onProgress  }: any) => {
    
    const fmData = new FormData();
    const config = {
      headers: { 
        "content-type": "multipart/form-data",
        "x-user-id": USER_ID
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    try {
      const {data} = await axios.post(
        process.env.SERVER_UPLOAD || 'http://54.255.180.132:80/upload-img',
        fmData,
        config
      );
      onSuccess(data);
      setErr('')
    } catch (err) {
      const error = err as AxiosError
      setErr(error.message)
      onError(error.message);
    }
  };

  const handleBeforeUpload = async (file: RcFile) => {
    setErr('')
    const math:string[] = ['image/jpeg','image/png','image/gif', 'image/jpg']
    setUploadLoading(true)
    if(math.indexOf(file.type) === -1){
      setErr(`${t('validation.image_format_invalid')}`)
      setUploadLoading(false)
      return false
    }
    const limitFile = file.size / 1024 /1024 < 2
    if(!limitFile){
      setUploadLoading(false)
      setErr(`${t('validation.image_size_invalid')}`)
      return false
    }
    return true
  }
  const handleOnChange = (file: UploadChangeParam) => {
    setFileList(file.fileList)
    if(file.file.status === 'done'){
      const responseImage:UploadPayload = file.file.response
      if(responseImage.url) {
        setFileList([{
          uid:responseImage.url.split('/').at(-1) as string,
          name: file.file.name,
          thumbUrl:responseImage.url
        }])
      }
      setUploadLoading(false)
      return
    } else if(file.file.status === 'error'){
      setFileList(file.fileList)
      setUploadLoading(false)
      return
    }

  }
  const handleOnRemove = (file: UploadFile) => {
    setDeleteList([file.uid, ...deleteList])
    return true
  }

  const config: UploadProps = {
    listType:"picture",
    maxCount:1,
    onChange: handleOnChange,
    customRequest:handleUpload,
    beforeUpload: handleBeforeUpload,
    onRemove:handleOnRemove,
    fileList:fileList,
  }
  return {
    fileList,
    uploadLoading:uploadLoading,
    handleUploadProps:config,
    fileListDelete:deleteList,
    progress,
    error: err
  }
}