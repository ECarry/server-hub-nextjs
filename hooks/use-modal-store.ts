import { Collection, Infrastructure, Manufacturer, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createCollection"
  | "editCollection"
  | "deleteCollection"
  | "requestContent"
  | "settings"
  | "deleteUser"
  | "createManufacturer"
  | "createInfrastructure"
  | "createSeries";

interface ModalData {
  collection?: Collection;
  user?: User;
  manufacturers?: Manufacturer[];
  infrastructures?: Infrastructure[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
