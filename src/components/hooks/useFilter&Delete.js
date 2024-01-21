import { useState, useEffect } from 'react';

// for deleting Data
export const useHandleDelete = (data, setData) => {

    const handleDelete = (deletedItemId) => {
      setData((prevData) => prevData.filter((item) => item._id !== deletedItemId));
    };

    return handleDelete;
};



//for filtering data
export const useFilterData = (toolData, searchQuery) => {
  const [filteredData, setFilteredData] = useState(toolData);
  useEffect(() => {

    const filterData = () => {

      const filtered = toolData?.filter((item) => {
        // Normalize search query and item properties for case-insensitive comparison
        const normalizedQuery = searchQuery.toLowerCase();
        const normalizedName = item.name.toLowerCase();
        const normalizedCategory = item.category.toLowerCase();

        // Check if either name or category includes the search query
        const nameMatch = normalizedName.includes(normalizedQuery);
        const categoryMatch = normalizedCategory.includes(normalizedQuery);

        // Return true if either name or category matches the search query
        return nameMatch || categoryMatch;
      });

      setFilteredData(filtered);
    };

    filterData();
  }, [toolData, searchQuery]);

  return filteredData;
};