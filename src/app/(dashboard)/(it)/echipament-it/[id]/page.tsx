"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  AssignmentInd,
  Description,
  Inventory2,
  Notes as NotesIcon,
  Save,
} from "@mui/icons-material";

import Loader from "@/components/ui/Loader";
import ControlledTextField from "@/components/ui/ControlledTextField";

import { DetailsTable } from "@/components/tables/DetailsTable";
import { useHandoversMainColumnsConfig } from "@/configs/columns/main/handoverColumnsConfig";

import { useEquipment } from "@/hooks/it_equipment/useEquipment";
import { useUpdateEquipment } from "@/hooks/it_equipment/useUpdateEquipment";
import { useHandoverSheets } from "@/hooks/handovers/useHandoverSheets";
import { useReturnSheets } from "@/hooks/returns/useReturnSheets";

import type { EquipmentType } from "@/types/equipment.type";

type EquipmentEditForm = {
  type: string;
  brand: string;
  model: string;
  series: string;
  price: number | null;
  config: string;
  notes: string;
};

type DetailItemProps = {
  label: string;
  value?: string | number | null;
  children?: ReactNode;
};

const FORM_DEFAULT_VALUES: EquipmentEditForm = {
  type: "",
  brand: "",
  model: "",
  series: "",
  price: 0,
  config: "",
  notes: "",
};

const getEquipmentFormValues = (
  equipment: EquipmentType,
): EquipmentEditForm => ({
  type: equipment.type ?? "",
  brand: equipment.brand ?? "",
  model: equipment.model ?? "",
  series: equipment.series ?? "",
  price: equipment.price ?? 0,
  config: equipment.config ?? "",

  // Protecție pentru documentele vechi unde notes putea fi array.
  notes: typeof equipment.notes === "string" ? equipment.notes : "",
});

const DetailItem = ({ label, value, children }: DetailItemProps) => {
  const displayedValue =
    value === undefined || value === null || value === "" ? "—" : String(value);

  return (
    <Box className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <Typography
        component="dt"
        className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {label}
      </Typography>

      {children !== undefined ? (
        <Box component="dd" className="m-0">
          {children}
        </Box>
      ) : (
        <Typography
          component="dd"
          className="m-0 flex min-h-10 items-center break-words text-sm font-medium text-slate-900"
        >
          {displayedValue}
        </Typography>
      )}
    </Box>
  );
};

const EquipmentDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const equipmentId = decodeURIComponent(params.id);

  const columns = useHandoversMainColumnsConfig();

  const { mutateAsync: mutateEquipment } = useUpdateEquipment();

  const { data, isLoading, isError } = useEquipment();

  const { data: handoverSheets } = useHandoverSheets();

  const { data: returns } = useReturnSheets();

  const equipment = useMemo(() => {
    return data?.find((item) => item.id === equipmentId);
  }, [data, equipmentId]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<EquipmentEditForm>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: "onChange",
  });

  /*
   * Echipamentul este încărcat asincron.
   * Când apare, completăm formularul cu datele lui.
   */
  useEffect(() => {
    if (!equipment) {
      return;
    }

    reset(getEquipmentFormValues(equipment), {
      /*
       * Nu pierdem valorile modificate dacă query-ul
       * este reîncărcat cât timp utilizatorul editează.
       */
      keepDirtyValues: true,
    });
  }, [equipment, reset]);

  const handleSaveEquipment = handleSubmit(async (values) => {
    if (!equipment) {
      return;
    }

    const updatedEquipment = await mutateEquipment({
      id: equipment.id,
      payload: {
        type: values.type,
        brand: values.brand,
        model: values.model,
        series: values.series,
        price: values.price,
        config: values.config,
        notes: values.notes,
      },
    });

    /*
     * Valorile salvate devin noile valori inițiale.
     * Astfel, isDirty revine la false.
     */
    if (updatedEquipment) {
      reset(getEquipmentFormValues(updatedEquipment));

      return;
    }

    reset(values);
  });

  if (isLoading) {
    return (
      <Box className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <Loader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="p-6">
        <Alert severity="error">
          Nu am putut încărca datele echipamentului.
        </Alert>
      </Box>
    );
  }

  if (!equipment) {
    return (
      <Box className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-4 p-6">
        <Alert severity="warning">
          Echipamentul cu ID-ul <strong>{equipmentId}</strong> nu a fost găsit.
        </Alert>

        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
          Înapoi
        </Button>
      </Box>
    );
  }

  const pvPool = [...(handoverSheets ?? []), ...(returns ?? [])];

  const pvRefIds = new Set(equipment.pvRef ?? []);

  const filteredPvPool = pvPool.filter((item) => pvRefIds.has(item.id));

  return (
    <Box className="min-h-[calc(100vh-80px)] bg-slate-100 p-4 md:p-6">
      <Box className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <Box className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Box className="flex items-center gap-3">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => router.back()}
            >
              Înapoi
            </Button>

            <Box>
              <Typography
                component="h1"
                className="text-3xl font-bold text-slate-900"
              >
                {equipment.id}
              </Typography>

              <Typography className="text-sm text-slate-500">
                Detalii echipament IT
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-2 self-start md:self-auto">
            <Button
              variant="contained"
              startIcon={<Save />}
              disabled={!isDirty || isSubmitting}
              onClick={handleSaveEquipment}
            >
              {isSubmitting ? "Se salvează..." : "Salvează"}
            </Button>

            <Chip
              label={equipment.status || "Status nespecificat"}
              color={equipment.status === "Nou" ? "success" : "default"}
              variant="outlined"
            />
          </Box>
        </Box>

        <Paper
          elevation={0}
          className="overflow-hidden rounded-xl border border-slate-200"
        >
          {/* Identificare */}
          <Box className="p-2 md:p-6">
            <Box className="mb-2 flex items-center gap-2">
              <Inventory2 className="text-blue-600" />

              <Typography
                component="h2"
                className="text-lg font-bold text-slate-800"
              >
                Identificare
              </Typography>
            </Box>

            <Box
              component="dl"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
              {/* Doar afișare */}
              <DetailItem label="Cod echipament" value={equipment.id} />

              <DetailItem label="Categorie" value={equipment.category} />

              <DetailItem
                label="Creat la data"
                value={
                  equipment.createdAt
                    ? dayjs(equipment.createdAt).format("DD / MM / YYYY")
                    : "—"
                }
              />

              <DetailItem label="Creat de" value={equipment.creatorName} />

              <DetailItem
                label="Ultima actualizare"
                value={
                  equipment.updatedAt
                    ? dayjs(equipment.updatedAt).format("DD / MM / YYYY")
                    : "—"
                }
              />

              <DetailItem label="Tip echipament" value={equipment.type} />

              {/* Editabile */}

              <DetailItem label="Brand">
                <ControlledTextField
                  name="brand"
                  control={control}
                  required
                  requiredText="Brandul este obligatoriu"
                  className="w-full"
                />
              </DetailItem>

              <DetailItem label="Model">
                <ControlledTextField
                  name="model"
                  control={control}
                  required
                  requiredText="Modelul este obligatoriu"
                  className="w-full"
                />
              </DetailItem>

              <DetailItem label="Serie">
                <ControlledTextField
                  name="series"
                  control={control}
                  required
                  requiredText="Seria este obligatorie"
                  className="w-full"
                />
              </DetailItem>

              <DetailItem label="Preț">
                <ControlledTextField
                  name="price"
                  control={control}
                  required
                  requiredText="Prețul este obligatoriu"
                  className="w-full"
                />
              </DetailItem>

              <Box className="sm:col-span-2 lg:col-span-5">
                <DetailItem label="Configurație">
                  <ControlledTextField
                    name="config"
                    control={control}
                    required
                    requiredText="Configurația este obligatorie"
                    className="w-full"
                  />
                </DetailItem>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Alocare */}
          <Box className="p-2 md:p-6">
            <Box className="mb-2 flex items-center gap-2">
              <AssignmentInd className="text-blue-600" />

              <Typography
                component="h2"
                className="text-lg font-bold text-slate-800"
              >
                Alocare
              </Typography>
            </Box>

            <Box
              component="dl"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <DetailItem label="Responsabil" value={equipment.custodianName} />

              <DetailItem label="Proiect" value={equipment.projectName} />
            </Box>
          </Box>

          <Divider />

          {/* Documente și inventar */}
          <Box className="p-2 md:p-6">
            <Box className="mb-2 flex items-center gap-2">
              <Description className="text-blue-600" />

              <Typography
                component="h2"
                className="text-lg font-bold text-slate-800"
              >
                Documente și inventar
              </Typography>
            </Box>

            <Box
              component="dl"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              <DetailItem
                label="Referință intrare"
                value={equipment.refInvoice}
              />

              <DetailItem
                label="Fișă necesar"
                value={equipment.requirementId}
              />
            </Box>
          </Box>

          <Divider />

          {/* Procese verbale */}
          <Box className="p-2 md:p-6">
            <Box className="mb-2 flex items-center gap-2">
              <Description className="text-blue-600" />

              <Typography
                component="h2"
                className="text-lg font-bold text-slate-800"
              >
                Mișcări
              </Typography>
            </Box>

            <DetailsTable columns={columns} data={filteredPvPool} />
          </Box>

          <Divider />

          {/* Notițe */}
          <Box className="p-2 md:p-6">
            <Box className="mb-2 flex items-center gap-2">
              <NotesIcon className="text-blue-600" />

              <Typography
                component="h2"
                className="text-lg font-bold text-slate-800"
              >
                Notițe
              </Typography>
            </Box>

            <ControlledTextField
              name="notes"
              control={control}
              label="Notițe echipament"
              className="w-full"
              multiline
              minRows={5}
            />
          </Box>

          <Divider />

          {/* Loguri */}
          <Box className="p-2 md:p-6">
            <Box className="mb-2 flex items-center gap-2">
              <Description className="text-blue-600" />

              <Typography
                component="h2"
                className="text-lg font-bold text-slate-800"
              >
                Loguri
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EquipmentDetailsPage;
