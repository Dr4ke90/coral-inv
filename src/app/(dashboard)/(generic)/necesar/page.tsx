"use client";

import Modal from "@/shared/components/ui/Modal";
import CreateRequirementModal from "@/features/requirement/components/CreateRqSheetModal";
import { MainRequirementTable } from "@/features/requirement";

const RequirementPage = () => {
  return (
    <Modal>
      <MainRequirementTable />

      <CreateRequirementModal />
    </Modal>
  );
};

export default RequirementPage;
