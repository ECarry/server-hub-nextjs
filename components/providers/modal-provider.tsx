"use client";

import { useEffect, useState } from "react";
import { CreateCollectionModal } from "../modals/create-collection-modal";
import { EditCollectionModal } from "../modals/edit-collection-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateCollectionModal />
      <EditCollectionModal />
    </>
  );
};
