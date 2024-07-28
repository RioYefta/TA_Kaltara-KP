export const generateTeknisiColumnDefs = () => {
    return [
      { checkboxSelection: true, headerCheckboxSelection: true },
      { field: "id", filter: true },
      { field: "nama", filter: true },
      { field: "crew", filter: true },
      { field: "sektor", filter: true },
    ];
  };
  