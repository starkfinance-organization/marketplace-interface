import pages from "@/pages";
import { route } from "./config";

const publicRoutes = [
  { path: route.home, element: pages.HomePage },
  { path: route.collection, element: pages.CollectionPage },
  { path: route.collectionDetail, element: pages.CollectionDetail },
  { path: route.nftDetail, element: pages.NFTDetailPage },
  { path: route.nftEvent, element: pages.NFTEventPage },
  { path: route.account, element: pages.AccountPage },
  { path: route.activity, element: pages.ActivityPage },
  { path: route.topVolume, element: pages.TopVolumePage },
];

export { publicRoutes };
