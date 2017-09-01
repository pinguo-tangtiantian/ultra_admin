import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './app.js';
import Menu from './components/menu/menu-list.js';
import Home from './route/home.js';
import CommonCouponConf from './route/commonCouponConf.js';
import ModifyCoupon from './route/modifyCoupon.js';

ReactDOM.render( 
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='common_coupon_conf' component={CommonCouponConf} />
                <Route path='modifyCoupon' component={ModifyCoupon} />
            </Route>
        </Router>
    
    , document.getElementById('root'));
registerServiceWorker();