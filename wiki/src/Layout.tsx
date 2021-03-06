import React from 'react';
import Navigation from './Navigation';
import logo from './images/logo.png';
import { IContentTreeNode } from './models/ContentTreeNode';
import BusyMask from './components/BusyMask';

interface ILayoutProps {
  contentTree: IContentTreeNode;
  children: JSX.Element|JSX.Element[];
  isBusy: boolean;
}

export default function Layout(props: ILayoutProps) {
  return (
    <div className="container-fluid">
      <div id="main-banner" className="row">
        <div className="col-6 p-1 pl-5">
          <img id="main-logo" src={logo} width="50px" height="50px" alt="logo"/>
          <h3 id="main-title" className="d-inline-block">Technological Wiki</h3>
        </div>
      </div>
      {props.isBusy
        ? <BusyMask/>
        : (
          <div className="row">
            <div className="col-xl-3 col-sm-5">
              <Navigation contentTree={props.contentTree}/>
            </div>
            <div className=" col-xl-9 col-sm-7 mt-3 pt-3">
              {props.children}
            </div>
          </div>
        )}

    </div>
  );
}