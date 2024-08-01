export const generateTeknisiColumnDefs = (onCellValueChanged) => {
  return [
    { checkboxSelection: true, headerCheckboxSelection: true },
    { field: "id", filter: true },
    { field: "nama", filter: true, editable: true, onCellValueChanged },
    { field: "crew", filter: true },
    { field: "sektor", filter: true },
  ];
};
