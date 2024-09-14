"use client";
import "@/styles/globals.css";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function EditProductForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
     <button   onClick={onOpen} type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>

      <Modal
        className="bg-midBlack"
        backdrop="opaque"
        isOpen={isOpen}
        size="3xl"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Product Details
              </ModalHeader>
              <ModalBody>
                <form action="post">
                  <div className="flex flex-col  items-center gap-4">
                    <div className="flex-1">
                      <input
                        placeholder="Title"
                        className="bg-lightBlack text-white rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        placeholder="Price"
                        className="bg-lightBlack  rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        placeholder="Category"
                        className="bg-lightBlack rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        placeholder="Condition"
                        className="bg-lightBlack  rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        placeholder="Location"
                        className="bg-lightBlack rounded-full border-none w-[500px]"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        placeholder="Image"
                        className="bg-lightBlack  rounded-xl border-none w-[500px] h-24"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Description"
                        className="bg-lightBlack  rounded-xl border-none w-[500px]"
                        name=""
                        id=""
                      ></textarea>
                    </div>

                    {/* <div className="flex-1">
                      {" "}
                      <button
                        type="button"
                        className="mt-3 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                      Publish
                      </button>
                    </div> */}
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
