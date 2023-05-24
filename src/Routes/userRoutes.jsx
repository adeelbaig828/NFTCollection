import CollectionDetails from '../pages/CollectionDetails/CollectionDetails';
import CollectionView from '../pages/CollectionView/CollectionView';
import CreateCollection from '../pages/CreateCollection/CreateCollection';
import CreateCollectionUploadImage from '../pages/CreateCollection/CreateCollectionUploadImage';
import CreateNft from '../pages/CreateNft/CreateNft';
import CreateNftForm from '../pages/CreateNft/CreateNftForm';
import UploadNft from '../pages/CreateNft/UploadNft';
import EditCollection from '../pages/EditCollection/EditCollection';
import EditCollectionImage from '../pages/EditCollection/EditCollectionImage';
import ExplorePage from '../pages/ExplorePage/ExplorePage';
import MyCollections from '../pages/FilterCollections/MyCollections';
import HomePage from '../pages/HomePage';
import MyNfts from '../pages/MyNfts';
import NftDetail from '../pages/NftDetail/NftDetail';
import OtherUserProfile from '../pages/Profile/OtherUserProfile/OtherUserProfile';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Profile/Settings';

export const userRoutes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/myNfts',
    component: MyNfts,
  },
  {
    path: '/explore',
    component: ExplorePage,
  },
  {
    path: '/collectionDetails',
    component: CollectionDetails,
  },
  {
    path: '/createNft/:id',
    component: UploadNft,
  },
  {
    path: '/createCollection',
    component: CreateCollection,
  },
  {
    path: '/createCollectionUploadImage',
    component: CreateCollectionUploadImage,
  },
  {
    path: '/nftDetail/:id',
    component: NftDetail,
  },
  {
    path: '/collectionView/:id',
    component: CollectionView,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/myCollections',
    component: MyCollections,
  },
  {
    path: '/creatorDetails/:id',
    component: OtherUserProfile,
  },
  {
    path: '/edit-collection/:id',
    component: EditCollection,
  },
  {
    path: '/edit-collection-images/:id',
    component: EditCollectionImage,
  },
  {
    path: '/create-nft-form',
    component: CreateNft,
  },
];
