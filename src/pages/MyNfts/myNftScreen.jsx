import React, { useEffect, useState } from "react";
import RIGHT_ARROW from "../../images/right_arrow.svg";
// import NftCard from "../../components/presentational/Card/Card";
import { Row, Col, Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import useWindowSize from "../../helpers/hooks";
import { openNotification } from "../../components/Smart/Notification";
import LoadingCard from "../../components/presentational/LoadingCard/LoadingCard";
import {
  buyNFT,
  fetchListedNFTS,
  fetchMyNfts,
  fetchNFTMetaData,
  listNft,
} from "../../services/web3Services";
import {
  formateIpfsImageUrl,
  truncate,
  truncateTitle,
} from "../../helpers/utils";
import { useSelector } from "react-redux";
import { Card } from "antd";
import "./myNftScreen.scss";
const { Meta } = Card;

const NftCard = ({ data, listed, wallet }) => {
  const displayTitle = (data, listed) => {
    return listed
      ? truncateTitle(listed?.rawMetadata.name ?? "Test Title")
      : truncateTitle(data?.metadata.name ?? "Test Title");
  };

  const displayDescription = (data, listed) => {
    return listed
      ? truncateTitle(listed?.rawMetadata.description ?? "test description")
      : truncateTitle(data?.metadata.description ?? "test description");
  };
  return (
    <div className="imageCard">
      <Card
        hoverable
        cover={
          <span className="coverWrapper">
            <span className="coverImage">
              <img
                alt="example"
                src={formateIpfsImageUrl(
                  String(
                    listed ? listed.rawMetadata.image : data?.metadata.image
                  )
                )}
              />
            </span>

            <span
              className="footer"
              style={{
                background: `url(${formateIpfsImageUrl(
                  String(
                    listed ? listed.rawMetadata.image : data?.metadata.image
                  )
                )}) no-repeat`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></span>
            {/* {showTopPick && <span className="tag">TOP PICK</span>} */}
          </span>
        }
      >
        <Link to={`#`}>
          <Meta
            title={displayTitle(data, listed)}
            description={
              <div className="dFlex">{displayDescription(data, listed)}</div>
            }
          />
        </Link>
        <div className="">
          {listed ? (
            <Button
              type="primary"
              onClick={() =>
                buyNFT(listed?.contract.address, listed?.tokenId, 0.01)
              }
            >
              Buy NFT
            </Button>
          ) : (
            <Button
              type="warning"
              onClick={() =>
                listNft(data?.id.tokenId, data?.contract.address, wallet, 0.01)
              }
            >
              List NFT
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

const MyNftScreen = () => {
  const web3 = useSelector((state) => state.web3);
  // console.log('web3---->', web3.wallet)
  const [myNfts, setMyNfts] = useState([]);
  const [listedNfts, setListedNfts] = useState([]);
  const [listedAddresses, setListedAddresses] = useState([]);
  const arr = [0, 1, 2, 3];
  const arr2 = [0, 1, 2, 3];
  const [browserWidth] = useWindowSize();
  const [loading, setLoading] = useState(false);

  const fetchListedNFTSFromContract = async () => {
    setLoading(true);
    const nfts = await fetchListedNFTS();
    setListedAddresses(nfts);
    console.log('selsected nfts--->', nfts)
    
    setLoading(false);
  };
  const myNFTS = async () => {
    try {
      setLoading(true);
      const res = await fetchMyNfts(web3?.wallet);
      setMyNfts(res?.ownedNfts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      openNotification("Oops Error in getting my nfts", error);
    }
  };
  useEffect(() => {
    myNFTS();
    fetchListedNFTSFromContract();
  }, [web3.wallet]);

  useEffect(()=> {
    let listed = [];
    listedAddresses?.length > 0 &&
      listedAddresses
        .filter((item) => item[3] === true)
        .map(async (el) => {
          console.log('el---->', el[1], el[2], el[3])
          const metadata = await fetchNFTMetaData(el[1], el[2]);
          // console.log("metadata", metadata);
          listed.push(metadata);
        });
    console.log('listed arr--->', listed)
    setListedNfts(listed);
  }, [listedAddresses])

  console.log("listed nfts---->", listedNfts);
  // console.log("my nfts---->", myNfts, listedNfts);
  return (
    <div className="TopHits main_page_width">
      {/* My NFTS */}
      <div className="heading">
        <span className="topHits">My NFTS</span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {loading
            ? arr?.map((item, index) => {
                return (
                  <Col className="gutter-row" span={6} key={index}>
                    <LoadingCard />
                  </Col>
                );
              })
            : myNfts.length > 0 &&
              myNfts.map((item, index) => {
                return (
                  <Col className="gutter-row" span={6} key={index}>
                    <NftCard
                      data={item}
                      showFollowIcon={false}
                      wallet={web3.wallet}
                    />
                  </Col>
                );
              })}
        </Row>
      </div>

      {/* Listed NFTS */}
      <div className="heading">
        <span className="topHits">Listed NFTS</span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {loading
            ? arr2?.map((item, index) => {
                return (
                  <Col className="gutter-row" span={6} key={index}>
                    <LoadingCard />
                  </Col>
                );
              })
            : listedNfts.length > 0 &&
              listedNfts.map((item, index) => {
                return (
                  <Col className="gutter-row" span={6} key={index}>
                    <NftCard
                      listed={item}
                      showFollowIcon={false}
                      wallet={web3.wallet}
                    />
                  </Col>
                );
              })}
        </Row>
      </div>
      {browserWidth < 821 && (
        <Carousel dotPosition={"bottom"}>
          {loading ? (
            <LoadingCard />
          ) : (
            myNfts.length > 0 &&
            myNfts.map((item, index) => (
              <div key={index}>
                <NftCard
                  data={item}
                  showFollowIcon={false}
                  wallet={web3.wallet}
                />
              </div>
            ))
          )}
        </Carousel>
      )}

      {browserWidth < 821 && (
        <Carousel dotPosition={"bottom"}>
          {loading ? (
            <LoadingCard />
          ) : (
            listedNfts.length > 0 &&
            listedNfts.map((item, index) => (
              <div key={index}>
                <NftCard
                  listed={item}
                  showFollowIcon={false}
                  wallet={web3.wallet}
                />
              </div>
            ))
          )}
        </Carousel>
      )}
    </div>
  );
};

export default MyNftScreen;
