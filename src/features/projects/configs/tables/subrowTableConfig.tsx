export const subrowTableConfig = {
  initialState: {
    showGlobalFilter: false,
  },
  enableGlobalFilter: false,
  enableBottomToolbar: false,
  enableRowSelection: false,
  enableRowActions: false,
  enableRowPinning: false,
  enableEditing: false,
  enableExpanding: false,
  enableExpandAll: false,
  enableTopToolbar: false,

  muiTableContainerProps: {
    sx: {
      width: "100%",
      overflowY: "auto",
      padding: "0 10px 0 10px",
    },
  },
};
