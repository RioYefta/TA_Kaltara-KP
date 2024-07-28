export const processTeknisiData = (data, searchInput) => {
    if (!searchInput) return data;

    const lowerCaseSearchInput = searchInput.toLowerCase();
    return data.filter(item =>
        item.nama.toLowerCase().includes(lowerCaseSearchInput) ||
        item.crew.toLowerCase().includes(lowerCaseSearchInput) ||
        item.sektor.toLowerCase().includes(lowerCaseSearchInput)
    );
};
