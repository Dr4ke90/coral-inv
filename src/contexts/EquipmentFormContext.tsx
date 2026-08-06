"use client";
import { createContext, useContext, ReactNode, useMemo } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { EQUIPMENT_INITIAL_STATE } from "@/states/equipmentInitialState";
import { EquipmentType } from "@/types/equipment.type";

interface EquipmentFormContextType {
  methods: UseFormReturn<EquipmentType>;
}

const EquipmentFormContext = createContext<
  EquipmentFormContextType | undefined
>(undefined);

export const EquipmentFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useForm<EquipmentType>({
    defaultValues: EQUIPMENT_INITIAL_STATE,
  });

  const values = useMemo(() => ({ methods }), [methods]);

  return (
    <EquipmentFormContext.Provider value={values}>
      <FormProvider {...methods}>{children}</FormProvider>
    </EquipmentFormContext.Provider>
  );
};

export const useEquipmentFormContext = () => {
  const context = useContext(EquipmentFormContext);
  if (!context) {
    throw new Error(
      "useEquipmentFormContext must be used within an EquipmentFormProvider",
    );
  }
  return context;
};
