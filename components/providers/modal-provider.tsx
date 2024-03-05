"use client";

import { useEffect, useState } from "react";
import { CreateCollectionModal } from "@/components/modals/create-collection-modal";
import { EditCollectionModal } from "@/components/modals/edit-collection-modal";
import DeleteCollectionModal from "@/components/modals/delete-collection-modal";
import { RequestContentModal } from "@/components/modals/request-content-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

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
      <DeleteCollectionModal />
      <RequestContentModal />
      <SettingsModal />
    </>
  );
};
