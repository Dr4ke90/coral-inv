"use client";

import Modal from "@/components/ui/Modal";
import CreateRequirementModal from "@/components/modals/CreateRqSheetModal";
import { MainRequirementTable } from "@/components/tables/MainRequirmentTable";

const RequirementPage = () => {
  return (
    <Modal>
      <MainRequirementTable />

      <CreateRequirementModal />
    </Modal>
  );
};

export default RequirementPage;
