import React from "react";

export type InforSectionContent = {
  listingData: any;
  refetchListingData: () => void;
};

export const InforListingContext = React.createContext<InforSectionContent>({
  listingData: [],
  refetchListingData: () => {},
});

export const useInforListingContext = () => React.useContext(InforListingContext)

