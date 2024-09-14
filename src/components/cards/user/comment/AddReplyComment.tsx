"use client";
import React, { useState } from "react";
import axiosInstance from "@/configs/axiosInstance";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

interface replyProps {
    commentId:string
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdate:React.Dispatch<React.SetStateAction<boolean>>
}
 const AddReplyComment:React.FC<replyProps> = ({setTrigger,commentId}) =>{
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
const [reply,setReply] = useState('');

const handleReply = async (onClose)=>{
    try{
        const userToken = localStorage.getItem('userToken');
const result = await axiosInstance.post('/reply-comment',{reply,commentId},{
    headers:{
        Authorization:userToken
    }
})
if(result){
    console.log(result.data.message);
    alert('replied success');
    setTrigger(prev=>!prev)
}
    }catch(err){
        console.error('Error occured in user reply comment in client side',err)
    }
    onClose();
}
  return (
    <>
      <span
        onClick={onOpen}
        className="text-[10px] text-white/50 cursor-pointer "
      >
        Reply comment
      </span>
      <Modal
        className="bg-midBlack"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <Input value={reply} onChange={(e)=>setReply(e.target.value)} variant="bordered" style={{border:'none'}} autoFocus  placeholder="Reply to the comment" />
              </ModalBody>
              <ModalFooter>
                <Button  color="secondary" onPress={()=>handleReply(onClose)}>
                 Reply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddReplyComment;
