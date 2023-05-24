import React, {
    Fragment, useEffect
  } from 'react';
  import { Link } from 'react-router-dom';
  import _ from 'lodash';
  import './breadCrumb.scss';
  
  const BreadCrumb = ({ match }) => {
    const [crumbs, setCrumbs] = React.useState([<Fragment key={123}> </Fragment>]);
    const getCrumbs = () => {
      const paths = match.path.split('/');
      const _crumbs = [];
      const size = Object.keys(match.params).length;
      const pathsLength = paths.length - size;
      let i = 2;
      let appendPath = '/admin';
      for (; i < pathsLength - 1; i++) {
        appendPath += `/${paths[i]}`;
        _crumbs.push(
          <Fragment key={i}>
            <p className="mx-2">-</p>
            <Link to={appendPath} className="breadcrumb-item in-Active font-title">
              <p className="breadcrumb-item in-Active">{_.startCase(_.toLower(paths[i].replace('-', ' ')))}</p>
            </Link>
          </Fragment>
        );
      }
      _crumbs.push(
        <Fragment key={i}>
          <p className="mx-2">-</p>
          <p className="breadcrumb-item active-breadCrumb">{_.startCase(_.toLower(paths[i].replace('-', ' ')))}</p>
        </Fragment>
      );
      setCrumbs(_crumbs);
    };
  
    useEffect(() => {
      getCrumbs();
    }, []);
  
    return (
      <div className="mt-3 ml-2 flex items-center">
        <div className="home-icon-color mb-3">
          <i className="fas fa-home" />
        </div>
        {crumbs}
      </div>
    );
  };
  
  export default BreadCrumb;
  