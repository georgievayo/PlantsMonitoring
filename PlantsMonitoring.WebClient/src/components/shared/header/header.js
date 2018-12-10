import React from 'react';

export const Header = ({ title, button, showAddSection }) => {
    return ([
        <nav key="nav" className="navbar navbar-expand-lg fixed-top navbar-transparent  bg-primary  navbar-absolute">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-toggle">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <a className="navbar-brand" href="#pablo">{title}</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                </button>
                {button &&
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link" id="new-device-btn" onClick={showAddSection}>
                                    <i className="now-ui-icons ui-1_simple-add"></i>
                                    {button}
                                </button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>,
        <div key="panel-header" className="panel-header panel-header-sm">
        </div>
    ]);
}