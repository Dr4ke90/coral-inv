import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ReadOnlyInput from "@/components/ui/ReadOnlyInput";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import { useEmployees } from "@/hooks/employees/useEmployees";
import ReadOnlyDate from "@/components/ui/ReadOnlyDate";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useUsers } from "@/hooks/users/useUsers";
import ControlledStringAutocomplete from "../ui/ControlledStringAutocomplete";
import { useProjects } from "@/hooks/projects/useProjects";

const ModalHeaderForm = () => {
  const { control, getValues, watch } = useFormContext();
  const { data: employees } = useEmployees();
  const { data: users } = useUsers();
  const { data: projects } = useProjects();
  const location = usePathname();

  const currentId = watch("id");

  const filteredEmployees = useMemo(() => {
    return employees?.filter((e) => e.id !== "E0000");
  }, [employees]);

  const handoverPerson = users?.find(
    (u) => u.id === getValues("handoverPersonId"),
  )?.name;

  const createdBy = users?.find((u) => u.id === getValues("createdBy"))?.name;

  return (
    <Box component="form" sx={{ p: 2 }} className="w-full">
      <Box className="flex gap-10">
        {location === "/retur" && (
          <ControlledAutocomplete
            name="handoverPersonId"
            label="Predat de:"
            options={filteredEmployees}
            requiredText="Selectarea unui predator este obligatorie"
            control={control}
            optionLabel="name"
            className="w-full"
          />
        )}

        {location === "/predare" && (
          <ReadOnlyInput
            value={handoverPerson!}
            className="w-full"
            label="Predat de:"
          />
        )}

        {location === "/intrari" && (
          <ControlledStringAutocomplete
            name="type"
            control={control}
            label="Tip intrare:"
            options={["Factura", "Chitanta", "Aviz", "Bon fiscal"]}
            requiredText="Selectarea tipului de intrare este obligatorie"
            className="w-full"
          />
        )}

        {location === "/necesar" && (
          <>
            <ControlledAutocomplete
              control={control}
              name="projectId"
              label="Proiect:"
              options={
                projects?.filter((p) => p.status.toLowerCase() === "activ")!
              }
              requiredText="Selectarea unui proiect este obligatorie"
              className="w-full"
              optionLabel="name"
            />

            <ReadOnlyInput
              value={createdBy!}
              className="w-full"
              label="Creat de:"
            />
          </>
        )}

        <ReadOnlyInput value={currentId} className="w-full" label="ID:" />

        <ReadOnlyDate
          value={getValues("createdAt")}
          className="w-full"
          label="Data:"
        />
      </Box>
    </Box>
  );
};

export default ModalHeaderForm;
